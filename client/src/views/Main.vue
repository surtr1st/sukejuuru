<script setup lang="ts">
import List from '@/components/List.vue';
import Bars3Icon from '@/components/icons/24x24/Bars3Icon.vue';
import Tracker from '@/components/Tracker.vue';
import { useSidebar, useTheme } from '@/composables';
import { sidebarItems } from '@/data';
import { RouterView } from 'vue-router';
import { ref, onMounted, nextTick, onBeforeMount } from 'vue';
import { state } from '@/store';
import { usePriority, useStatus } from '@/services';
import { useCustomToast } from '@/helpers';

const { preference, toggle } = useTheme();
const { expanded, setExpand } = useSidebar();
const { priorities } = usePriority();
const { status } = useStatus();
const { onError } = useCustomToast();
const selected = ref('system');
const isExpand = ref(true);
const isShrink = ref(false);
const list = ref<HTMLDivElement | null>(null);

async function expand() {
    if (!list.value) return;
    isExpand.value = !isExpand.value;
    setExpand(isExpand.value);
    await nextTick();
    if (list.value.offsetWidth <= 100) isShrink.value = true;
    else isShrink.value = false;
}

onBeforeMount(() => {
    selected.value = preference.value;
    isExpand.value = expanded.value;
    isShrink.value = !expanded.value;
});

onMounted(() => {
    toggle();
    if (state.priorities.length === 0) {
        priorities()
            .then((data) => (state.priorities = data))
            .catch((err) => onError(err));
    }
    if (state.status.length === 0) {
        status()
            .then((data) => (state.status = data))
            .catch((err) => onError(err));
    }
});
</script>

<template>
    <div class="dark:bg-dark flex justify-center relative">
        <div
            ref="list"
            :class="{
                'w-[250px] border-r border-r-neutral-2 min-h-screen': isExpand,
                'w-[70px] border-r border-r-neutral-2 min-h-screen': !isExpand,
            }"
        >
            <div :class="{ 'flex justify-end': isExpand, 'flex justify-center': !isExpand }">
                <button
                    class="bg-none dark:text-light hover:bg-h-light dark:hover:bg-h-neutral-2 transition-all ease-in-out rounded-7px m-1 p-2"
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
            <Tracker />
            <div class="h-[90vh] row-span-11 overflow-x-hidden overflow-y-auto">
                <RouterView />
            </div>
        </div>
    </div>
</template>
