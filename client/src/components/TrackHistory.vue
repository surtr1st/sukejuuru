<template>
    <div
        class="border border-neutral-2 m-2 *:px-5"
        v-for="(track, index) in tracks"
        :key="index"
    >
        <div
            class="grid grid-cols-12 place-items-start text-light text-xl bg-neutral-2 dark:bg-neutral-2/25 border-b border-b-neutral-2 *:font-semibold *:h-[74px] *:flex *:items-center"
        >
            <h3 class="col-span-3 gap-2"><CalendarDaysIcon />{{ track.madeOnDate }}</h3>
            <h3 class="col-span-4">Description</h3>
            <h3 class="col-span-2">{{ getTodayTaskTime(track.madeOnDate) }}</h3>
            <h3 class="col-span-2">Local Time</h3>
            <div
                @click="toggle"
                class="col-span-1 hover:*:cursor-pointer *:w-10 *:h-10 *:text-center *:rounded-full transition ease-in-out"
            >
                <ChevronDownIcon v-if="!isActive" />
                <ChevronUpIcon v-else />
            </div>
        </div>
        <div
            ref="accordianBody"
            class="dark:bg-dark-2 rounded-7px dark:text-light"
        >
            <ul
                :class="{
                    'grid grid-cols-12 gap *:flex *:items-center *:py-3 hover:cursor-pointer':
                        !isActive,
                    hidden: isActive,
                }"
                v-for="(item, index) in track.items"
                :key="index"
            >
                <li class="col-span-3">
                    <TaskTag
                        size="md"
                        :color="item.taskTag.color"
                        :display="item.taskTag.title"
                    />
                </li>
                <li class="col-span-4">
                    {{ item.description }}
                </li>
                <li class="col-span-2">
                    {{ convertTimeDiffrence(item.timeOnTask) }}
                </li>
                <li class="col-span-2">
                    {{ formatTimeRange(item.startFrom) }} - {{ formatTimeRange(item.endAt) }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TTrackHistory as TrackHistory } from '@/types';
import { ref } from 'vue';
import CalendarDaysIcon from '@/components/icons/24x24/CalendarDaysIcon.vue';
import ChevronDownIcon from '@/components/icons/24x24/ChevronDownIcon.vue';
import ChevronUpIcon from '@/components/icons/24x24/ChevronUpIcon.vue';
import TaskTag from './TaskTag.vue';

type TTrackHistory = {
    tracks: TrackHistory[];
};

const props = withDefaults(defineProps<Partial<TTrackHistory>>(), {
    tracks: () => [],
});

const isActive = ref<boolean>(false);

function toggle() {
    isActive.value = !isActive.value;
}

function formatTimeRange(timestamp: string) {
    const date = new Date(timestamp);
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
}

function convertTimeDiffrence(ms: number) {
    const totalSeconds = ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
}

function getTodayTaskTime(date: string) {
    const today = props.tracks.find((track) => track.madeOnDate === date);
    if (!today) return 0;
    const total = today.items.reduce((a, c) => a + c.timeOnTask, 0);
    return convertTimeDiffrence(total);
}
</script>
