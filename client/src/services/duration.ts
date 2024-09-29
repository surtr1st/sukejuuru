import type { TDuration } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useDuration() {
    return {
        logsFromNode: async (nodeId: number) => {
            const { data } = await useFetch(`${BASE_URL}/durations?nodeId=${nodeId}`)
                .get()
                .json<TDuration[]>();
            return data.value ?? [];
        },
        createDuration: async (duration: Partial<Omit<TDuration, 'id'>>) => {
            const { data } = await useFetch(`${BASE_URL}/duration`).post(duration).text();
            return data.value;
        },
        updateDuration: async (id: number, newData: Partial<TDuration>) => {
            const { data } = await useFetch(`${BASE_URL}/durations/${id}`).put(newData).text();
            return data.value;
        },
        deleteDuration: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/durations/${id}`).delete().text();
            return data.value;
        },
    };
}
