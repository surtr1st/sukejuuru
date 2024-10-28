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
                v-for="(content, index) in body"
                :key="index"
                class="text-center *:p-5 border dark:border-neutral-2 *:hover:bg-neutral-2/15 *:hover:cursor-pointer"
            >
                <td
                    :class="
                        'max-w-[200px] focus:outline focus:outline-warning text-start ' +
                        getColor(content.color)
                    "
                >
                    {{ content.display }}
                </td>
                <td class="text-start max-w-[300px] focus:outline focus:outline-warning">
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

const getColor = (color: string) => `bg-${color}/15 text-${color}`;
</script>
