<script setup lang="ts">
import List from '@/components/List.vue';
import Bars3Icon from '@/components/icons/24x24/Bars3Icon.vue';
import Tracker from '@/components/Tracker.vue';
import { useSidebar, useTheme } from '@/composables';
import { sidebarItems } from '@/data';
import { RouterView } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import { onBeforeMount } from 'vue';

const { preference, toggle } = useTheme();
const { expanded, setExpand } = useSidebar();
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

onMounted(() => toggle());
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
        <div class="w-full">
            <Tracker />
            <RouterView />
        </div>
    </div>
</template>
