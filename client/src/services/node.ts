import type { TNode } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useNode() {
    return {
        nodes: async () => {
            const { data } = await useFetch(`${BASE_URL}/nodes`).get().json<TNode[]>();
            return data.value ?? [];
        },
        createNode: async (node: Partial<TNode>) => {
            const { data } = await useFetch(`${BASE_URL}/node`).post(node).text();
            return data.value;
        },
        updateNode: async (id: number, newData: Partial<TNode>) => {
            const { data } = await useFetch(`${BASE_URL}/nodes/${id}`).put(newData).text();
            return data.value;
        },
        deleteNode: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/nodes/${id}`).delete().text();
            return data.value;
        },
    };
}
