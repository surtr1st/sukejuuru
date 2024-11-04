import { useFetch } from '@vueuse/core';
import { BASE_URL } from '.';
import type { TColor } from '@/types';

export function useColor() {
    return {
        colors: async () => {
            const { data, error } = await useFetch(`${BASE_URL}/colors`).get().json<TColor[]>();
            return [data.value ?? [], error.value];
        },
    };
}
