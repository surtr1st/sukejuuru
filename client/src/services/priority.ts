import type { TPriority } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function usePriority() {
    return {
        priorities: async () => {
            const { data, error } = await useFetch(`${BASE_URL}/priorities`)
                .get()
                .json<TPriority[]>();
            return [data.value ?? [], error.value];
        },
        createPriority: async (priority: Partial<Omit<TPriority, 'id'>>) => {
            const { data } = await useFetch(`${BASE_URL}/priorities`).post(priority).text();
            return data.value;
        },
        updatePriority: async (id: number, newData: Partial<TPriority>) => {
            const { data } = await useFetch(`${BASE_URL}/priorities/${id}`).put(newData).text();
            return data.value;
        },
        deletePriority: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/priorities/${id}`).delete().text();
            return data.value;
        },
    };
}
