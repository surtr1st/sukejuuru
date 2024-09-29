<template>
    <div class="grid grid-cols-12 gap-3 dark:text-light border-b border-b-neutral-2 p-3">
        <div
            class="lg:col-span-2 lg:block md:hidden"
            v-show="isBegin"
        >
            <TaskTag
                size="lg"
                :color="task.color"
                :display="task.title"
            />
        </div>
        <div
            :class="{
                'lg:col-span-8 md:col-span-6 flex justify-start relative': isBegin,
                'lg:col-span-10 md:col-span-6 flex justify-start relative': !isBegin,
            }"
        >
            <input
                ref="input"
                type="text"
                class="border-none outline-none bg-inherit w-full h-full text-lg px-1"
                placeholder="(Description)"
                @focus="onFocus"
                @blur="onBlur"
            />
            <div
                v-show="isListShown"
                class="absolute top-[65px] left-0 -transition-x-[50%] -transition-y-[50%]"
            >
                <ul
                    class="bg-dark w-[300px] max-h-[500px] border border-t-0 border-r-neutral-2 border-l-neutral-2 border-b-neutral-2 rounded-b-7px"
                >
                    <li
                        v-for="item in list"
                        :key="item.id"
                        :class="
                            'last:rounded-b-7px transition-all ease-in-out w-full p-4 hover:bg-h-light dark:hover:bg-h-dark hover:cursor-pointer text-' +
                            item.color
                        "
                        @click="startTimer(item.id)"
                    >
                        {{ item.title }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="lg:col-span-1 md:col-span-3 flex justify-end items-center">
            <h1 class="text-[32px] font-semibold">{{ formatTimer }}</h1>
        </div>
        <div class="lg:col-span-1 md:col-span-3 flex justify-end items-center gap-2">
            <Button
                icon-only
                color="danger"
                :icon="MinusCircleIcon"
                fixed
                rounded
                :disabled="!isBegin"
                @click="resetTimer()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import TaskTag from './TaskTag.vue';
import MinusCircleIcon from './icons/24x24/MinusCircleIcon.vue';
import { ref } from 'vue';
import type { TTagTask } from '@/types';
import { onBeforeUnmount } from 'vue';
import { computed } from 'vue';
import { useDuration } from '@/services';

type TTracker = {
    list: TTagTask[];
};

const props = withDefaults(defineProps<Partial<TTracker>>(), {
    list: () => [],
});

const isBegin = ref(false);
const input = ref<HTMLInputElement | null>(null);
const isListShown = ref(false);
const isDescriptionFilled = ref(false);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const timer = ref<number | null>(null);
const startTime = ref<number | null>(null);
const task = ref<Partial<TTagTask>>({});
const { createDuration } = useDuration();

function onFocus() {
    if (!input.value) return;
    const value = input.value.value;
    if (!value && value.length === 0) isListShown.value = true;
    else isDescriptionFilled.value = true;
}

function onBlur() {
    if (!input.value) return;
    isListShown.value = false;
}

const formatTimer = computed(() => {
    const h = String(hours.value).padStart(2, '0');
    const m = String(minutes.value).padStart(2, '0');
    const s = String(seconds.value).padStart(2, '0');
    return `${h}:${m}:${s}`;
});

function startTimer(id: number) {
    if (timer.value) return;
    if (!task.value) task.value = props.list.find((item) => item.id === id);
    startTime.value = Date.now();
    timer.value = window.requestAnimationFrame(updateTimer);
}

function updateTimer() {
    const elapsed = Date.now() - (startTime.value ?? 0);
    hours.value = Math.floor(elapsed / (1000 * 60 * 60));
    minutes.value = Math.floor((elapsed / (1000 * 60)) % 60);
    seconds.value = Math.floor((elapsed / 1000) % 60);
    timer.value = window.requestAnimationFrame(updateTimer);
}

async function stopTimer() {
    if (input.value) {
        const description = input.value.value;
        await createDuration({
            madeOnDate: new Date(startTime.value!),
            timeOnTask: 1n,
            description,
            taskId: task.value.id,
        });
    }
    if (timer.value) {
        cancelAnimationFrame(timer.value);
        timer.value = null;
    }
}

async function resetTimer() {
    await stopTimer();
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
}

onBeforeUnmount(async () => await resetTimer());
</script>
