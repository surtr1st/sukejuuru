import { useFetch } from '@vueuse/core';
import { BASE_URL } from '.';
import type { TTracker, TTrackHistory } from '@/types';

export function useTracker() {
    return {
        logsFromNode: async (nodeId: number) => {
            const { data, error } = await useFetch(`${BASE_URL}/tracks?nodeId=${nodeId}`)
                .get()
                .json<TTrackHistory[]>();
            return [data.value, error.value];
        },
        createTrack: async (track: TTracker) => {
            const { data, error } = await useFetch(`${BASE_URL}/tracks`).post(track).text();
            return [data.value, error.value];
        },
    };
}
