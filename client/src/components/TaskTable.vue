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
                    @dblclick="editCell(index, 0, $event)"
                    @blur="saveOnBlur(index, 0)"
                    :class="
                        'max-w-[200px] focus:outline focus:outline-warning text-start ' +
                        getColor(content.color)
                    "
                >
                    {{ content.title }}
                </td>
                <td
                    @dblclick="editCell(index, 1, $event)"
                    @blur="saveOnBlur(index, 1)"
                    class="text-start max-w-[300px] focus:outline focus:outline-warning"
                >
                    {{ content.description }}
                </td>
                <td
                    @dblclick="openUpdateModal('Priority', content.priority.display)"
                    :class="
                        'max-w-[50px] focus:outline focus:outline-warning ' +
                        getColor(`${content.priority.color}`)
                    "
                >
                    {{ content.priority.display }}
                </td>

                <td
                    @dblclick="editCell(index, 3, $event)"
                    @blur="saveOnBlur(index, 3)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ content.minLength }}
                </td>
                <td
                    @dblclick="editCell(index, 4, $event)"
                    @blur="saveOnBlur(index, 4)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ content.maxLength }}
                </td>
                <td
                    @dblclick="openUpdateModal('Start', content.startDate)"
                    @blur="saveOnBlur(index, 5)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ formatDatetime(content.startDate) }}
                </td>
                <td
                    @dblclick="openUpdateModal('Due', content.dueDate)"
                    @blur="saveOnBlur(index, 6)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ formatDatetime(content.dueDate) }}
                </td>
                <td
                    @dblclick="editCell(index, 7, $event)"
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
                    @dblclick="openUpdateModal('Status', content.status.display)"
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
            <Button title="Update" />
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
};

const props = withDefaults(defineProps<Partial<TTable>>(), {
    headers: () => [],
    body: () => [],
    onAdd: () => {},
    onUpdate: () => {},
});

const state = useState();
const tableRow = ref<HTMLTableCellElement[] | null>(null);
const cellSelected = ref<string | null>(null);
const title = ref<string>('');
const open = ref(false);
const refValue = ref<{ id: number; date: string }>({ id: 0, date: '' });

function editCell(row: number, col: number, event: MouseEvent) {
    if (!tableRow.value) return;
    tableRow.value[row].focus();
    const selectedCell = tableRow.value[row].children[col];
    selectedCell.setAttribute('contenteditable', 'true');
    autoFocus(event);
}

function autoFocus(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.contentEditable === 'true') target.focus();
}

function saveOnBlur(row: number, col: number) {
    if (!tableRow.value) return;
    const selectedCell = tableRow.value[row].children[col];
    cellSelected.value = selectedCell.textContent;
    if (props.onUpdate) props.onUpdate();
    selectedCell.setAttribute('contenteditable', 'false');
}

function formatDatetime(datetime: Date | string) {
    const date = new Date(datetime);
    return date.toLocaleDateString('vi-VN');
}

function openUpdateModal(
    columnName: 'Priority' | 'Status' | 'Start' | 'Due',
    currentValue?: string,
) {
    open.value = true;
    title.value = columnName;
    if (!currentValue) return;
    refValue.value.id = getItemId(currentValue, columnName.toLowerCase()) ?? 0;
    refValue.value.date = new Date(currentValue).toISOString().split('T')[0];
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
    switch (color) {
        case 'secondary':
            return 'bg-secondary/15 text-secondary';
        case 'light':
            return 'bg-light/15 text-neutral';
        case 'neutral':
            return 'bg-neutral/15 text-neutral';
        case 'neutral-2':
            return 'bg-neutral-2/15 text-neutral-2';
        case 'dark':
            return 'bg-dark/15 text-light';
        case 'danger':
            return 'bg-danger/15 text-danger';
        case 'warning':
            return 'bg-warning/15 text-warning';
        case 'info':
            return 'bg-info/15 text-info';
        case 'semi-danger':
            return 'bg-semi-danger/15 text-semi-danger';
        case 'quarter-danger':
            return 'bg-quarter-danger/15 text-quarter-danger';
        case 'success':
            return 'bg-success/15 text-success';
        default:
            return 'bg-primary/15 text-primary';
    }
}

defineExpose({ cellSelected });
</script>
