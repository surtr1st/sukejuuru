<template>
    <div class="border border-primary m-2 *:px-5">
        <div
            class="grid grid-cols-12 place-items-start text-light text-xl bg-primary border-b border-b-neutral-2 gap-3 *:font-semibold *:h-[74px] *:flex *:items-center"
        >
            <h3 class="col-span-2"><CalendarDaysIcon />Sunday, 25 Aug, 2024</h3>
            <h3 class="col-span-5">Description</h3>
            <h3 class="col-span-2">02:29:30</h3>
            <h3 class="col-span-2">Local Time</h3>
            <div
                ref="accordian"
                @click="toggle"
                class="col-span-1 hover:*:cursor-pointer *:w-10 *:h-10 *:text-center *:rounded-full transition ease-in-out"
            >
                <ChevronDownIcon v-if="!clicked" />
                <ChevronUpIcon v-else />
            </div>
        </div>
        <div
            ref="accordianBody"
            class="dark:bg-dark-2 rounded-7px dark:text-light"
        >
            <ul
                class="grid grid-cols-12 gap-3 *:flex *:items-center *:py-3"
                v-for="(track, index) in tracks"
                :key="index"
            >
                <li class="col-span-2">
                    <TaskTag
                        size="md"
                        :color="track.taskTag.color"
                        :display="track.taskTag.display"
                    />
                </li>
                <li class="col-span-5">
                    {{ track.description }}
                </li>
                <li class="col-span-2">
                    {{ track.duration }}
                </li>
                <li class="col-span-2">
                    {{ track.localTime }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TTrackHistoryItem } from '@/types';
import { ref } from 'vue';
import CalendarDaysIcon from '@/components/icons/24x24/CalendarDaysIcon.vue';
import ChevronDownIcon from '@/components/icons/24x24/ChevronDownIcon.vue';
import ChevronUpIcon from '@/components/icons/24x24/ChevronUpIcon.vue';
import TaskTag from './TaskTag.vue';

type TTrackHistory = {
    tracks: TTrackHistoryItem[];
};

withDefaults(defineProps<Partial<TTrackHistory>>(), {
    tracks: () => [],
});

const clicked = ref<boolean>(false);
const accordian = ref<HTMLDivElement | null>(null);
const accordianBody = ref<HTMLDivElement | null>(null);

function toggle() {
    if (!accordian.value || !accordianBody.value) return;
    if (!clicked.value) {
        clicked.value = true;
        accordianBody.value.classList.add('hidden');
    } else {
        clicked.value = false;
        accordianBody.value.classList.remove('hidden');
    }
}
</script>
