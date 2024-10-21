<template>
    <table
        class="dark:text-light w-full border border-l-0 border-right-0 border-t-0 dark:border-neutral-2 rounded-bl-7px rounded-br-7px overflow-x-auto"
    >
        <thead class="uppercase">
            <tr>
                <th
                    class="text-primary border-b first:border-l-0 border-l dark:border-neutral-2 p-5 font-bold"
                    v-for="(header, index) in headers"
                    :key="index"
                >
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                ref="tableRow"
                v-for="(content, index) in body"
                :key="index"
                class="text-center *:p-5 border dark:border-neutral-2 *:hover:bg-neutral-2/15 *:hover:cursor-pointer"
            >
                <td
                    id="title"
                    @dblclick="editCell(content.id, index, 0, $event)"
                    @blur="saveOnBlur(index, 0)"
                    :class="
                        'max-w-[200px] focus:outline focus:outline-warning text-start ' +
                        getColor(content.color)
                    "
                >
                    {{ content.title }}
                </td>
                <td
                    id="description"
                    @dblclick="editCell(content.id, index, 1, $event)"
                    @blur="saveOnBlur(index, 1)"
                    class="text-start max-w-[300px] focus:outline focus:outline-warning"
                >
                    {{ content.description }}
                </td>
                <td
                    id="priority"
                    @dblclick="openUpdateModal('Priority', content.id, content.priority.display)"
                    :class="
                        'max-w-[50px] focus:outline focus:outline-warning ' +
                        getColor(`${content.priority.color}`)
                    "
                >
                    {{ content.priority.display }}
                </td>

                <td
                    id="minLength"
                    @dblclick="editCell(content.id, index, 3, $event)"
                    @blur="saveOnBlur(index, 3)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ content.minLength }}
                </td>
                <td
                    id="maxLength"
                    @dblclick="editCell(content.id, index, 4, $event)"
                    @blur="saveOnBlur(index, 4)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ content.maxLength }}
                </td>
                <td
                    id="startDate"
                    @dblclick="openUpdateModal('Start', content.id, content.startDate)"
                    @blur="saveOnBlur(index, 5)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ formatDatetime(content.startDate) }}
                </td>
                <td
                    id="dueDate"
                    @dblclick="openUpdateModal('Due', content.id, content.dueDate)"
                    @blur="saveOnBlur(index, 6)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ formatDatetime(content.dueDate) }}
                </td>
                <td
                    id="criterias"
                    @dblclick="editCell(content.id, index, 7, $event)"
                    @blur="saveOnBlur(index, 7)"
                    class="focus:outline max-w-[300px] focus:outline-warning"
                >
                    <Checkbox
                        v-for="criteria in content.criterias"
                        :key="criteria.id"
                        :title="criteria.description"
                        color="primary"
                    />
                </td>
                <td
                    id="status"
                    @dblclick="openUpdateModal('Status', content.id, content.status.display)"
                    @blur="saveOnBlur(index, 8)"
                    :class="
                        'focus:outline focus:outline-warning ' + getColor(`${content.status.color}`)
                    "
                >
                    {{ content.status.display }}
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr
                class="hover:bg-light dark:hover:bg-neutral hover:cursor-pointer w-full h-12 text-center text-primary"
            >
                <td
                    :colspan="headers.length"
                    @click="onAdd"
                >
                    +
                </td>
            </tr>
        </tfoot>
    </table>
    <Modal
        :title
        :open
        @close="onClose()"
    >
        <template #body>
            <div class="w-[300px]">
                <Select
                    v-if="title === 'Priority'"
                    :items="state.priorities"
                    no-title
                    v-model:option="refValue.id"
                />
                <Select
                    v-else-if="title === 'Status'"
                    :items="state.status"
                    no-title
                    v-model:option="refValue.id"
                />
                <DatePicker
                    v-else-if="title === 'Start'"
                    no-title
                    v-model:pick="refValue.date"
                />
                <DatePicker
                    v-else-if="title === 'Due'"
                    no-title
                    v-model:pick="refValue.date"
                />
            </div>
        </template>
        <template #footer>
            <Button
                title="Update"
                @click="updateModalItem"
            />
        </template>
    </Modal>
</template>

<script setup lang="ts">
import type { TTask } from '@/types';
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';
import Modal from './Modal.vue';
import Select from './Select.vue';
import Button from './Button.vue';
import { useState } from '@/store';
import DatePicker from './DatePicker.vue';

type TTable = {
    headers: string[];
    body: TTask[];
    onAdd: () => void;
    onUpdate: () => void;
    onModalClose: () => void;
};

const props = withDefaults(defineProps<Partial<TTable>>(), {
    headers: () => [],
    body: () => [],
    onAdd: () => {},
    onUpdate: () => {},
    onModalClose: () => {},
});

const state = useState();
const tableRow = ref<HTMLTableCellElement[] | null>(null);
const cellSelected = ref<{ column: string; value: any } | null>(null);
const title = ref<string>('');
const open = ref(false);
const refValue = ref<{ id: number; date: string }>({ id: 0, date: '' });
const refId = ref(0);

function editCell(id: number, row: number, col: number, event: MouseEvent) {
    if (!tableRow.value) return;
    tableRow.value[row].focus();
    const selectedCell = tableRow.value[row].children[col];
    selectedCell.setAttribute('contenteditable', 'true');
    autoFocus(event);
    refId.value = id;
}

function autoFocus(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.contentEditable === 'true') target.focus();
}

function saveOnBlur(row: number, col: number) {
    if (!tableRow.value) return;
    const selectedCell = tableRow.value[row].children[col];
    cellSelected.value = {
        column: selectedCell.id,
        value: selectedCell.textContent,
    };
    if (props.onUpdate) props.onUpdate();
    selectedCell.setAttribute('contenteditable', 'false');
}

function formatDatetime(datetime: Date | string) {
    const date = new Date(datetime);
    return date.toLocaleDateString('vi-VN');
}

function openUpdateModal(
    columnName: 'Priority' | 'Status' | 'Start' | 'Due',
    id: number,
    currentValue?: string,
) {
    open.value = true;
    title.value = columnName;
    if (!currentValue) return;
    switch (columnName) {
        case 'Priority':
        case 'Status':
            refValue.value.id = getItemId(currentValue, columnName.toLowerCase()) ?? 0;
            break;
        case 'Start':
        case 'Due':
            refValue.value.date = new Date(currentValue).toISOString().split('T')[0];
            break;
    }

    refId.value = id;
}

function getItemId(display: string, type: string) {
    if (!display) return 0;
    switch (type) {
        case 'status':
            return state.status.find((p) => p.display === display)?.id;
        default:
            return state.priorities.find((p) => p.display === display)?.id;
    }
}

function onClose() {
    open.value = false;
}

function getColor(color: string) {
    return `bg-${color}/15 text-${color}`;
}

function getRelationItem(id: number, type: string) {
    if (!id) return 0;
    switch (type) {
        case 'status':
            return state.status.find((p) => p.id === id);
        default:
            return state.priorities.find((p) => p.id === id);
    }
}

function updateModalItem() {
    title.value = title.value.toLowerCase();
    if (title.value.startsWith('start') || title.value.startsWith('due')) {
        cellSelected.value = {
            column: title.value + 'Date',
            value: new Date(refValue.value.date),
        };
    } else {
        cellSelected.value = {
            column: title.value + 'Id',
            value: refValue.value.id,
        };
    }
    props.onModalClose();
    onClose();
}

defineExpose({ cellSelected, refId });
</script>
