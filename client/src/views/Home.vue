<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNode } from '@/services';
import type { TNode } from '@/types';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables';
import Input from '@/components/Input.vue';
import { useCustomToast } from '@/helpers';
import { watchTriggerable } from '@vueuse/core';
import { useBoolState } from '@/store';
import { debounce } from '@/composables';

const input = ref<string>('');
const list = ref<TNode[] | null>([]);

const boolState = useBoolState();
const { nodes, createNode } = useNode();
const { replace } = useRouter();
const { toggle } = useTheme();
const { onSuccess, onError } = useCustomToast();

const { trigger } = watchTriggerable(() => boolState.node, fetchNodes);
const debounceSelectNode = debounce(selectNode);

async function selectNode(id: number) {
    localStorage.setItem('node', String(id));
    await replace('/@node');
}

async function handleCreateNode() {
    if (!input.value) return;
    const title = input.value;
    const [response, error] = await createNode({ title });
    if (error !== null) {
        onError(error.message);
        return;
    }
    onSuccess(response);
    boolState.toggle('node');
}

async function fetchNodes() {
    const [response, error] = await nodes();
    if (error !== null) {
        onError(error.message);
        return;
    }
    list.value = response;
}

onMounted(async () => {
    toggle();
    await fetchNodes();
    if (boolState.node) trigger();
});
</script>

<template>
    <div
        class="min-h-screen dark:bg-midnight dark:text-frost flex justify-center flex-col items-center relative"
    >
        <Input
            title="Node"
            placeholder="Add new node"
            @enter="handleCreateNode()"
            v-model:value="input"
            required
            :invalid="{ when: input.length === 0, message: 'Node title should be larger than 0' }"
        />
        <h1 class="text-4xl font-bold my-3 uppercase">Node Study List</h1>
        <ul
            class="min-w-[500px] max-w-[1000px] border dark:border-neutral border-frost rounded-7px shadow-md"
        >
            <li
                v-for="node in list"
                :key="node.id"
                @click="debounceSelectNode(node.id)"
                class="p-3 hover:bg-frost dark:hover:bg-neutral hover:cursor-pointer transition-all ease-in-out"
            >
                {{ node.title }}
            </li>
        </ul>
    </div>
</template>
