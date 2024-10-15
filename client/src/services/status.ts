import type { TStatus } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useStatus() {
    return {
        status: async () => {
            const { data } = await useFetch(`${BASE_URL}/status`).get().json<TStatus[]>();
            return data.value ?? [];
        },
        createStatus: async (status: Partial<Omit<TStatus, 'id'>>) => {
            const { data } = await useFetch(`${BASE_URL}/status`).post(status).text();
            return data.value;
        },
        updateStatus: async (id: number, newData: Partial<TStatus>) => {
            const { data } = await useFetch(`${BASE_URL}/status/${id}`).put(newData).text();
            return data.value;
        },
        deleteStatus: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/status/${id}`).delete().text();
            return data.value;
        },
    };
}
