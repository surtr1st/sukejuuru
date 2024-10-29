import { useDebounceFn } from '@vueuse/core';

const DEBOUNCE_TIME = 1000;

export const debounce = (fn: () => unknown) => useDebounceFn(fn, DEBOUNCE_TIME);
