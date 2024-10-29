<script setup lang="ts">
import List from '@/components/List.vue';
import Bars3Icon from '@/components/icons/24x24/Bars3Icon.vue';
import Tracker from '@/components/Tracker.vue';
import { useSidebar, useTheme } from '@/composables';
import { sidebarItems } from '@/data';
import { RouterView } from 'vue-router';
import { ref, nextTick, onBeforeMount, onMounted } from 'vue';
import { useBoolState, useState } from '@/store';
import { useNode, usePriority, useStatus, useTask, useColor } from '@/services';
import { useCustomToast } from '@/helpers';
import { useRouter } from 'vue-router';
import { watchTriggerable } from '@vueuse/core';

const state = useState();
const boolState = useBoolState();
const { preference, toggle } = useTheme();
const { expanded, setExpand } = useSidebar();
const { priorities } = usePriority();
const { status } = useStatus();
const { onError } = useCustomToast();
const { compactTasksFromNode } = useTask();
const { findNodeById } = useNode();
const { colors } = useColor();
const selected = ref('system');
const isExpand = ref(true);
const isShrink = ref(false);
const list = ref<HTMLDivElement | null>(null);
const router = useRouter();
// const { trigger: triggerPriority } = watchTriggerable(() => state.priorities, fetchPriorities);
// const { trigger: triggerStatus } = watchTriggerable(() => state.status, fetchStatus);
// const { trigger: triggerColor } = watchTriggerable(() => state.colors, fetchColors);
// const { trigger: triggerTagTask } = watchTriggerable(() => state.tagTasks, fetchTagTasks);

async function expand() {
    if (!list.value) return;
    isExpand.value = !isExpand.value;
    setExpand(isExpand.value);
    await nextTick();
    if (list.value.offsetWidth <= 100) isShrink.value = true;
    else isShrink.value = false;
}

async function fetchPriorities() {
    try {
        const response = await priorities();
        state.priorities = response;
    } catch (e) {
        onError((e as Error).message);
    }
}

async function fetchStatus() {
    try {
        const response = await status();
        state.status = response;
    } catch (e) {
        onError((e as Error).message);
    }
}

async function fetchColors() {
    try {
        const response = await colors();
        state.colors = response;
    } catch (e) {
        onError((e as Error).message);
    }
}

async function fetchTagTasks() {
    try {
        const node = localStorage.getItem('node');
        if (!node) return;
        const response = await compactTasksFromNode(parseInt(node));
        state.tagTasks = response;
    } catch (e) {
        onError((e as Error).message);
    }
}

onBeforeMount(async () => {
    toggle();
    selected.value = preference.value;
    isExpand.value = expanded.value;
    isShrink.value = !expanded.value;

    const node = localStorage.getItem('node');
    if (!node) return;
    findNodeById(parseInt(node)).catch(async (err) => {
        onError(err);
        await router.replace('/');
    });

    if (state.priorities.length === 0) await fetchPriorities();
    if (state.status.length === 0) await fetchStatus();
    if (state.colors.length === 0) await fetchColors();
    if (state.tagTasks.length === 0) await fetchTagTasks();
});

onMounted(() => {
    // if (boolState.priority) triggerPriority();
    // if (boolState.status) triggerStatus();
    // if (boolState.color) triggerColor();
    // if (boolState.tagTask) triggerTagTask();
});
</script>

<template>
    <div class="dark:bg-midnight flex justify-center relative">
        <div
            ref="list"
            :class="{
                'w-[250px] border-r border-r-slate min-h-screen': isExpand,
                'w-[70px] border-r border-r-slate min-h-screen': !isExpand,
            }"
        >
            <div :class="{ 'flex justify-end': isExpand, 'flex justify-center': !isExpand }">
                <button
                    class="bg-none dark:text-frost hover:bg-neutral/15 dark:hover:bg-shadow transition-all ease-in-out rounded-7px m-1 p-2"
                    @click="expand()"
                >
                    <Bars3Icon />
                </button>
            </div>
            <div
                v-for="(items, key) in sidebarItems"
                :key="key"
            >
                <List
                    ref="list"
                    :shrink="isShrink"
                    :title="key"
                    :items="items"
                />
            </div>
        </div>
        <div class="w-full min-h-screen">
            <Tracker :list="state.tagTasks" />
            <div class="h-[90vh] row-span-11 overflow-x-hidden overflow-y-auto">
                <RouterView />
            </div>
        </div>
    </div>
</template>
