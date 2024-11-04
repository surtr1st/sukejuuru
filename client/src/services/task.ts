import type { TTagTask, TTask, TTaskPayload } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useTask() {
    return {
        tasksFromNode: async (nodeId: number) => {
            const { data, error } = await useFetch(`${BASE_URL}/tasks?nodeId=${nodeId}`)
                .get()
                .json<TTask[]>();
            return [data.value ?? [], error.value];
        },
        compactTasksFromNode: async (nodeId: number) => {
            const { data, error } = await useFetch(`${BASE_URL}/tasks?nodeId=${nodeId}`)
                .get()
                .json<TTagTask[]>();
            return [data.value ?? [], error.value];
        },
        createTask: async (nodeId: number, task: Partial<TTaskPayload>) => {
            const { data, error } = await useFetch(`${BASE_URL}/tasks`)
                .post({ nodeId, ...task })
                .text();
            return [data.value, error.value];
        },
        updateTask: async (id: number, newData: Partial<TTask>) => {
            const { data, error } = await useFetch(`${BASE_URL}/tasks/${id}`).put(newData).text();
            return [data.value, error.value];
        },
        deleteTask: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/tasks/${id}`).delete().text();
            return data.value;
        },
    };
}
