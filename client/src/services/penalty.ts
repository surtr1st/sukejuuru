import type { TPenalty } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function usePenalty() {
    return {
        penaltiesFromNode: async (nodeId: number) => {
            const { data } = await useFetch(`${BASE_URL}/penalties?nodeId=${nodeId}`)
                .get()
                .json<TPenalty[]>();
            return data.value ?? [];
        },
        createPenalty: async (penalty: Partial<TPenalty>) => {
            const { data } = await useFetch(`${BASE_URL}/penalty`).post(penalty).text();
            return data.value;
        },
        updatePenalty: async (id: number, newData: Partial<TPenalty>) => {
            const { data } = await useFetch(`${BASE_URL}/penalties/${id}`).put(newData).text();
            return data.value;
        },
        deletePenalty: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/penalties/${id}`).delete().text();
            return data.value;
        },
    };
}
