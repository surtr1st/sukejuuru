import { useFetch } from '@vueuse/core';
import { BASE_URL } from '.';
import type { TTracker, TTrackHistory } from '@/types';

export function useTracker() {
    return {
        logsFromNode: async (nodeId: number) => {
            const { data, error } = await useFetch(`${BASE_URL}/tracks?nodeId=${nodeId}`)
                .get()
                .json<TTrackHistory[]>();
            if (error.value !== null) throw new Error(error.value);
            return data.value;
        },
        createTrack: async (track: TTracker) => {
            const { data, error } = await useFetch(`${BASE_URL}/track`).post(track).text();
            if (error.value !== null) throw new Error(error.value);
            return data.value;
        },
    };
}
