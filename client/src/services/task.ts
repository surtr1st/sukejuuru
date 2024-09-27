import type { TTask } from '@/types';
import { BASE_URL } from '.';
import { useFetch } from '@vueuse/core';

export function useTask() {
    return {
        tasksFromNode: async (nodeId: number) => {
            const { data } = await useFetch(`${BASE_URL}/tasks?nodeId=${nodeId}`)
                .get()
                .json<TTask[]>();
            return data.value ?? [];
        },
        createTask: async (task: Partial<Omit<TTask, 'id'>>) => {
            const { data } = await useFetch(`${BASE_URL}/task`).post(task).text();
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
