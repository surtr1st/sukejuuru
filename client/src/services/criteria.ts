import type { TCriteria } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useCriteria() {
    return {
        criteriasFromTask: async (taskId: number) => {
            const { data } = await useFetch(`${BASE_URL}/criterias?taskId=${taskId}`)
                .get()
                .json<TCriteria[]>();
            return data.value ?? [];
        },
        createCriteria: async (criteria: Partial<Omit<TCriteria, 'id'>>) => {
            const { data } = await useFetch(`${BASE_URL}/criteria`).post(criteria).text();
            return data.value;
        },
        updateCriteria: async (id: number, newData: Partial<TCriteria>) => {
            const { data } = await useFetch(`${BASE_URL}/criterias/${id}`).put(newData).text();
            return data.value;
        },
        deleteCriteria: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/criterias/${id}`).delete().text();
            return data.value;
        },
    };
}
