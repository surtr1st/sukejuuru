<template>
    <div class="grid grid-cols-12 gap-3 dark:text-light border-b border-b-neutral-2 px-1">
        <div class="lg:col-span-2 lg:block md:hidden">
            <TaskTag
                size="lg"
                color="primary"
                :display="task"
            />
        </div>
        <div class="lg:col-span-8 md:col-span-6 flex justify-start">
            <input
                type="text"
                class="border-none outline-none bg-inherit w-full h-full text-lg px-1"
                placeholder="(Description)"
            />
        </div>
        <div class="lg:col-span-1 md:col-span-3 flex justify-end items-center">
            <h1 class="text-[32px] font-semibold">00:45:12</h1>
        </div>
        <div class="lg:col-span-1 md:col-span-3 flex justify-end items-center gap-2">
            <Button
                icon-only
                :icon="PlayIcon"
                fixed
                rounded
            />
            <Button
                icon-only
                color="danger"
                :icon="MinusCircleIcon"
                fixed
                rounded
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import TaskTag from './TaskTag.vue';
import PlayIcon from './icons/24x24/PlayIcon.vue';
import MinusCircleIcon from './icons/24x24/MinusCircleIcon.vue';

type TTracker = {
    task: string;
    description: string;
    duration: number;
};

withDefaults(defineProps<Partial<TTracker>>(), {
    task: '',
    description: '',
    duration: 0,
});
</script>
