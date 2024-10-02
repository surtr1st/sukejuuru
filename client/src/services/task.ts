import type { TTagTask, TTask, TTaskPayload } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useTask() {
    return {
        tasksFromNode: async (nodeId: number) => {
            const { data, error } = await useFetch(`${BASE_URL}/tasks?nodeId=${nodeId}`)
                .get()
                .json<TTask[]>();
            if (error.value !== null) throw new Error(error.value);
            return data.value ?? [];
        },
        compactTasksFromNode: async (nodeId: number) => {
            const { data, error } = await useFetch(`${BASE_URL}/tasks?nodeId=${nodeId}`)
                .get()
                .json<TTagTask[]>();
            if (error.value !== null) throw new Error(error.value);
            return data.value ?? [];
        },
        createTask: async (nodeId: number, task: Partial<TTaskPayload>) => {
            const { data, error } = await useFetch(`${BASE_URL}/task`)
                .post({ nodeId, ...task })
                .text();
            if (error.value !== null) throw new Error(error.value);
            return data.value;
        },
        updateTask: async (id: number, newData: Partial<TTask>) => {
            const { data } = await useFetch(`${BASE_URL}/tasks/${id}`).put(newData).text();
            return data.value;
        },
        deleteTask: async (id: number) => {
            const { data } = await useFetch(`${BASE_URL}/tasks/${id}`).delete().text();
            return data.value;
        },
    };
}
