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
    const [response, error] = await priorities();
    if (error !== null) {
        onError(error.message);
        return;
    }
    state.priorities = response;
}

async function fetchStatus() {
    const [response, error] = await status();
    if (error !== null) {
        onError(error.message);
        return;
    }
    state.status = response;
}

async function fetchColors() {
    const [response, error] = await colors();
    if (error !== null) {
        onError(error.message);
        return;
    }
    state.colors = response;
}

async function fetchTagTasks() {
    const node = localStorage.getItem('node');
    if (!node) return;
    const [response, error] = await compactTasksFromNode(parseInt(node));
    if (error !== null) {
        onError(error.message);
        return;
    }
    state.tagTasks = response;
}

onBeforeMount(async () => {
    toggle();
    selected.value = preference.value;
    isExpand.value = expanded.value;
    isShrink.value = !expanded.value;

    const node = localStorage.getItem('node');
    if (!node) return;
    const [_, error] = await findNodeById(parseInt(node));
    if (error !== null) {
        onError(err);
        await router.replace('/');
    }

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
