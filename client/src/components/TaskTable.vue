<template>
    <table
        class="dark:text-light w-full border dark:border-neutral-2 rounded-bl-7px rounded-br-7px overflow-x-auto"
    >
        <thead class="uppercase">
            <tr>
                <th
                    class="text-primary border dark:border-neutral-2 p-5 font-bold"
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
                        getColor(content.color.display)
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
                    @dblclick="editCell(index, 2, $event)"
                    @blur="saveOnBlur(index, 2)"
                    class="focus:outline focus:outline-warning"
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
                    @dblclick="editCell(index, 5, $event)"
                    @blur="saveOnBlur(index, 5)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ content.startDate }}
                </td>
                <td
                    @dblclick="editCell(index, 6, $event)"
                    @blur="saveOnBlur(index, 6)"
                    class="focus:outline focus:outline-warning"
                >
                    {{ content.dueDate }}
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
                    @dblclick="editCell(index, 8, $event)"
                    @blur="saveOnBlur(index, 8)"
                    class="focus:outline focus:outline-warning"
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
</template>

<script setup lang="ts">
import type { TTask } from '@/types';
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';

type TTable = {
    headers: string[];
    body: TTask[];
    onAdd: () => void;
};

const props = withDefaults(defineProps<Partial<TTable>>(), {
    headers: () => [],
    body: () => [],
    onAdd: () => {},
});

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
        default:
            return 'bg-primary/15 text-primary';
    }
}

const tableRow = ref<HTMLTableCellElement[] | null>(null);

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
    selectedCell.setAttribute('contenteditable', 'false');
}
</script>
