import type { TAppState } from '@/types';
import { reactive } from 'vue';

export const state = reactive<TAppState>({
    priorities: [],
    status: [],
});
