import type { TDuration } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useDuration() {
    return {
        createDuration: async (duration: Partial<Omit<TDuration, 'id'>>) => {
            const { data, error } = await useFetch(`${BASE_URL}/durations`)
                .post(duration)
                .json<{ insertedId: number }>();
            return [data.value!.insertedId, error.value];
        },
    };
}
