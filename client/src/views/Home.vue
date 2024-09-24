<script setup lang="ts">
import { onMounted } from 'vue';
import { useNode } from '@/services';
import { ref } from 'vue';
import type { TNode } from '@/types';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables';

const list = ref<TNode[]>([]);
const { nodes } = useNode();
const { replace } = useRouter();
const { toggle } = useTheme();

async function selectNode(id: number) {
    localStorage.setItem('node', String(id));
    await replace(`/@node/${id}`);
}

onMounted(() => {
    toggle();
    nodes()
        .then((res) => (list.value = res))
        .catch((err) => console.error(err));
});
</script>

<template>
    <div
        class="min-h-screen dark:bg-dark dark:text-light flex justify-center flex-col items-center relative"
    >
        <h1 class="text-4xl font-bold my-3 uppercase">Node Study List</h1>
        <ul class="border dark:border-neutral border-light rounded-7px shadow-md">
            <li
                v-for="node in list"
                :key="node.id"
                @click="selectNode(node.id)"
                class="p-3 hover:bg-light dark:hover:bg-neutral hover:cursor-pointer transition-all ease-in-out"
            >
                {{ node.title }}
            </li>
        </ul>
    </div>
</template>
