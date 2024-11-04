import type { TNode } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useNode() {
    return {
        nodes: async () => {
            const { data, error } = await useFetch(`${BASE_URL}/nodes`).get().json<TNode[]>();
            return [data.value ?? [], error.value];
        },
        createNode: async (node: Partial<Omit<TNode, 'id'>>) => {
            const { data, error } = await useFetch(`${BASE_URL}/nodes`).post(node).text();
            return [data.value, error.value];
        },
        updateNode: async (id: number, newData: Partial<TNode>) => {
            const { data } = await useFetch(`${BASE_URL}/nodes/${id}`).put(newData).text();
            return data.value;
        },
        deleteNode: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/nodes/${id}`).delete().text();
            return data.value;
        },
        findNodeById: async (id: number) => {
            const { data, error } = await useFetch(`${BASE_URL}/nodes/${id}`).get().json<TNode>();
            return [data.value ?? {}, error.value];
        },
    };
}
