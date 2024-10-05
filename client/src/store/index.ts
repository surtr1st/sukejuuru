import { type TAppState } from '@/types';
import { defineStore } from 'pinia';

export const useState = defineStore('appState', {
    state: (): TAppState => ({
        priorities: [],
        status: [],
        tagTasks: [],
        trackLogs: [],
        colors: [],
    }),
});
