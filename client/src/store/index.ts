import { type TAppState, type TBoolStateKey } from '@/types';
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
        node: false,
        priority: false,
        status: false,
        color: false,
        tagTask: false,
        task: false,
    }),

    getters: {
        keys() {
            return ['node', 'color', 'priority', 'status', 'tag-task', 'task'];
        },
    },

    actions: {
        toggle(key: TBoolStateKey) {
            switch (key) {
                case 'node':
                    this.node = true;
                    setTimeout(() => (this.node = false), 0);
                    break;
                case 'color':
                    this.color = true;
                    setTimeout(() => (this.color = false), 0);
                    break;
                case 'priority':
                    this.priority = true;
                    setTimeout(() => (this.priority = false), 0);
                    break;
                case 'status':
                    this.status = true;
                    setTimeout(() => (this.status = false), 0);
                    break;
                case 'tag-task':
                    this.tagTask = true;
                    setTimeout(() => (this.tagTask = false), 0);
                    break;
                case 'task':
                    this.task = true;
                    setTimeout(() => (this.task = false), 0);
                    break;
            }
        },
    },
});
