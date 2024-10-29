<template>
    <table
        class="dark:text-frost w-full border border-l-0 border-right-0 border-t-0 border-slate rounded-bl-7px rounded-br-7px overflow-x-auto"
    >
        <thead class="uppercase">
            <tr>
                <th
                    class="text-primary border-b first:border-l-0 border-l border-slate p-5 font-bold"
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
                class="text-center *:p-5 border border-l-0 border-r-0 border-slate hover:bg-neutral/15 *:dark:hover:bg-shadow *:hover:cursor-pointer"
            >
                <td
                    id="title"
                    :class="'max-w-[200px] text-start ' + getColor(content.color)"
                >
                    {{ content.title }}
                </td>
                <td
                    id="description"
                    class="text-start max-w-[300px]"
                >
                    {{ content.description }}
                </td>
                <td
                    id="priority"
                    :class="'max-w-[50px] ' + getColor(`${content.priority.color}`)"
                >
                    {{ content.priority.display }}
                </td>

                <td id="minLength">
                    {{ content.minLength }}
                </td>
                <td id="maxLength">
                    {{ content.maxLength }}
                </td>
                <td id="startDate">
                    {{ formatDatetime(content.startDate) }}
                </td>
                <td id="dueDate">
                    {{ formatDatetime(content.dueDate) }}
                </td>
                <td
                    id="criterias"
                    class="max-w-[300px]"
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
                    :class="getColor(`${content.status.color}`)"
                >
                    {{ content.status.display }}
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr
                class="hover:bg-neutral/15 dark:hover:bg-shadow hover:cursor-pointer w-full h-12 text-center text-primary"
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
import Checkbox from './Checkbox.vue';
import { formatDatetime } from '@/composables';

type TTable = {
    headers: string[];
    body: TTask[];
    onAdd: () => void;
};

withDefaults(defineProps<Partial<TTable>>(), {
    headers: () => [],
    body: () => [],
    onAdd: () => {},
});

const getColor = (color: string) => `bg-${color}/15 text-${color}`;
</script>
