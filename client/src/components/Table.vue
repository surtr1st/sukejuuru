<template>
    <table class="dark:text-light w-full">
        <thead class="uppercase">
            <tr>
                <th
                    class="text-primary border border-neutral-2 p-5 font-bold"
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
                class="text-center *:p-5 border border-neutral-2 *:hover:bg-neutral-2 *:hover:cursor-pointer"
            >
                <td :class="'text-start ' + getColor(content.color.display)">
                    {{ content.title }}
                </td>
                <td class="text-start max-w-[300px]">{{ content.description }}</td>
                <td>{{ content.priority.display }}</td>
                <td>{{ content.minLength }}</td>
                <td>{{ content.maxLength }}</td>
                <td>{{ content.startDate }}</td>
                <td>{{ content.dueDate }}</td>
                <td></td>
                <td>{{ content.status.display }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type { TTask } from '../types';

type TTable = {
    headers: string[];
    body: TTask[];
};

const props = withDefaults(defineProps<Partial<TTable>>(), {
    headers: () => [],
    body: () => [],
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
</script>
