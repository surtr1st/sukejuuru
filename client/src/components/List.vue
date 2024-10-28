<template>
    <div
        v-if="shrink"
        class="flex flex-col items-center gap-2 mx-1"
    >
        <h2 class="text-xs font-semibold uppercase text-primary my-1">{{ title }}</h2>
        <ul class="flex flex-col w-full gap-1">
            <template
                v-for="(item, index) in items"
                :key="index"
            >
                <li
                    class="transition ease-in-out w-full h-[48px] py-1 px-3 border-l border-primary flex gap-5 justify-center items-center hover:cursor-pointer hover:bg-neutral/15 dark:text-frost dark:hover:bg-shadow"
                    v-if="item.action"
                    @click="item.action"
                >
                    <component :is="item.icon" />
                </li>
                <RouterLink
                    :to="item.route || ''"
                    v-else
                >
                    <li
                        class="transition ease-in-out w-full h-[48px] py-1 px-3 border-l border-primary flex gap-5 justify-center items-center hover:cursor-pointer hover:bg-neutral/15 dark:text-frost dark:hover:bg-shadow"
                    >
                        <component :is="item.icon" />
                    </li>
                </RouterLink>
            </template>
        </ul>
    </div>
    <div
        v-else
        class="flex flex-col items-start gap-2 mx-1"
    >
        <h2 class="text-xs font-semibold uppercase text-primary my-1">{{ title }}</h2>
        <ul class="flex flex-col w-full gap-1">
            <template
                v-for="(item, index) in items"
                :key="index"
            >
                <li
                    class="transition-all ease-in-out w-full h-[48px] py-1 px-3 border-l border-primary flex gap-5 justify-start items-center hover:cursor-pointer hover:bg-neutral/15 dark:text-frost dark:hover:bg-shadow"
                    v-if="item.action"
                    @click="item.action"
                >
                    <component :is="item.icon" />
                    <h3 class="font-semibold">
                        {{ item.label }}
                    </h3>
                </li>
                <RouterLink
                    :to="item.route || ''"
                    v-else
                >
                    <li
                        class="transition-all ease-in-out w-full h-[48px] py-1 px-3 border-l border-primary flex gap-5 justify-start items-center hover:cursor-pointer hover:bg-neutral/15 dark:text-frost dark:hover:bg-shadow"
                    >
                        <component :is="item.icon" />
                        <h3 class="font-semibold">
                            {{ item.label }}
                        </h3>
                    </li>
                </RouterLink>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { TListItem } from '@/types';
import { RouterLink } from 'vue-router';

type TList = {
    title: string;
    shrink: boolean;
    items: TListItem[];
};

withDefaults(defineProps<Partial<TList>>(), {
    title: 'No Title',
    items: () => [],
    shrink: false,
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
