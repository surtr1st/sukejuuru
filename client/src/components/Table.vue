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
                        getColor(content.color)
                    "
                >
                    {{ content.display }}
                </td>
                <td
                    @dblclick="editCell(index, 1, $event)"
                    @blur="saveOnBlur(index, 1)"
                    class="text-start max-w-[300px] focus:outline focus:outline-warning"
                >
                    {{ content.description }}
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
import { ref } from 'vue';
import type { TTableItem } from '@/types';

type TTable = {
    headers: string[];
    body: TTableItem[];
    onAdd: () => void;
};

withDefaults(defineProps<Partial<TTable>>(), {
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
