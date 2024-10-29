<template>
    <TaskTable
        :headers
        :body
        @add="open = true"
    />
    <Modal
        :open="open"
        @close="open = false"
        title="Add new task"
    >
        <template #body>
            <div class="grid w-[600px] grid-rows-12 gap-3">
                <div class="row-span-3">
                    <Input
                        title="Title"
                        placeholder="e.g. Computer Science"
                        v-model:value="task.title"
                        required
                        :invalid="{
                            when: task.title.length === 0,
                            message: 'Title cannot be empty',
                        }"
                        check-on-blur
                    />
                </div>
                <div class="row-span-3">
                    <TextArea
                        title="Description"
                        placeholder="e.g. Learning all about computer, data structures, etc."
                        v-model:value="task.description"
                    />
                </div>
                <div class="row-span-3 grid grid-cols-12 gap-3">
                    <DatePicker
                        class="col-span-6"
                        title="Start at"
                        v-model:pick="task.startDate"
                    />
                    <DatePicker
                        class="col-span-6"
                        title="Due to"
                        v-model:pick="task.dueDate"
                    />
                </div>
                <div class="row-span-3 grid grid-cols-12 gap-3">
                    <NumInput
                        class="col-span-3"
                        placeholder="e.g. 120"
                        title="Min."
                        v-model:value="task.minLength"
                        required
                        :invalid="{
                            when: isMaxEntered && task.minLength > task.maxLength,
                            message: 'Min should be less than Max',
                        }"
                    />
                    <Select
                        class="col-span-3"
                        title="Time Unit"
                        :items="timeUnits"
                        :select-option="timeUnits[0].display"
                        v-model:option="minUnitSelect"
                    />
                    <NumInput
                        class="col-span-3"
                        placeholder="e.g. 1200"
                        title="Max."
                        :disabled="!task.minLength ? true : false"
                        v-model:value="task.maxLength"
                    />
                    <Select
                        class="col-span-3"
                        title="Max Unit"
                        :items="timeUnits"
                        :disabled="!task.minLength ? true : false"
                        v-model:option="maxUnitSelect"
                    />
                </div>
                <div class="row-span-3 grid grid-cols-12 gap-3">
                    <Select
                        class="col-span-4"
                        title="Color"
                        :colors="state.colors"
                        v-model:color="task.color"
                    />
                    <Select
                        class="col-span-4"
                        title="Priority"
                        :items="state.priorities"
                        v-model:option="task.priorityId"
                    />
                    <Select
                        class="col-span-4"
                        title="Status"
                        :items="state.status"
                        v-model:option="task.statusId"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <Button
                title="Close"
                color="midnight"
                @click="open = false"
            />
            <Button
                title="Add"
                color="primary"
                @click="debounceCreateTask"
            />
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
import Input from '@/components/Input.vue';
import TextArea from '@/components/TextArea.vue';
import TaskTable from '@/components/TaskTable.vue';
import DatePicker from '@/components/DatePicker.vue';
import Select from '@/components/Select.vue';
import NumInput from '@/components/NumInput.vue';
import type { TPriority, TTask, TTaskPayload } from '@/types';
import { useTask } from '@/services';
import { useCustomToast } from '@/helpers';
import { useBoolState, useState } from '@/store';
import { onMounted, ref, computed } from 'vue';
import { watchTriggerable } from '@vueuse/core';
import { debounce } from '@/composables';

const state = useState();
const boolState = useBoolState();
const { tasksFromNode, createTask } = useTask();
const { onSuccess, onError } = useCustomToast();
const headers = computed<string[]>(() => [
    'Title',
    'Description',
    'Priority',
    'Min.',
    'Max.',
    'Start',
    'Due',
    'Criterias',
    'Status',
]);
const body = ref<TTask[]>([]);
const open = ref(false);
const defaultTaskValue = computed(() => ({
    title: '',
    description: '',
    color: state.colors.length > 0 ? state.colors[0].display : 'primary',
    criterias: [],
    priorityId: state.priorities.length > 0 ? state.priorities[0].id : 1,
    statusId: state.status.length > 0 ? state.status[0].id : 1,
}));
const task = ref<Partial<TTaskPayload>>(defaultTaskValue.value);
const timeUnits = computed<TPriority[]>(() => [
    { id: 1, display: 'Minutes', description: '', createdAt: '', color: '' },
    { id: 2, display: 'Hours', description: '', createdAt: '', color: '' },
]);
const minUnitSelect = ref(timeUnits.value[0].id);
const maxUnitSelect = ref(minUnitSelect.value);
const isMaxEntered = ref(task.value.maxLength !== 0);

const { trigger } = watchTriggerable(() => boolState.task, fetchTasksFromNode);
const debounceCreateTask = debounce(handleCreateTask);

function handleCreateTask() {
    const node = localStorage.getItem('node');
    if (!node) return;
    createTask(parseInt(node), task.value)
        .then((res) => {
            onSuccess(res!);
            boolState.toggle('task');
            task.value = defaultTaskValue.value;
        })
        .catch((err) => onError(err.message));
}

function fetchTasksFromNode() {
    const nodeId = localStorage.getItem('node');
    if (!nodeId) return;
    tasksFromNode(parseInt(nodeId))
        .then((res) => (body.value = res))
        .catch((err) => onError(err.message));
}

onMounted(async () => {
    await fetchTasksFromNode();
    if (boolState.task) trigger();
});
</script>
