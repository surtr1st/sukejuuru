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

export const useBoolState = defineStore('boolState', {
    state: () => ({
        added: false,
    }),

    actions: {
        toggleAdded() {
            this.added = true;
            setTimeout(() => (this.added = false), 0);
        },
    },
});
