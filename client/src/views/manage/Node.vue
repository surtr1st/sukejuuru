<template>
    <TaskTable
        :headers
        :body
        @add="open = true"
        @update="handleUpdateCell()"
        ref="table"
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
                        class="col-span-6"
                        title="Priority"
                        :items="state.priorities"
                        v-model:option="task.priorityId"
                    />
                    <Select
                        class="col-span-6"
                        title="Status"
                        :items="state.status"
                        v-model:option="task.statusId"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <Button
                title="Add"
                color="primary"
                @click="handleCreateTask()"
            />
            <Button
                title="Close"
                color="dark"
                @click="open = false"
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
import { useState } from '@/store';
import { onMounted, ref, computed, reactive } from 'vue';

const state = useState();
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
const task = reactive<Partial<TTaskPayload>>({
    title: '',
    description: '',
    color: 'primary',
    criterias: [],
    priorityId: state.priorities.length > 0 ? state.priorities[0].id : 1,
    statusId: state.status.length > 0 ? state.status[0].id : 1,
});
const timeUnits = computed<TPriority[]>(() => [
    { id: 1, display: 'Minutes', description: '', createdAt: '', color: '' },
    { id: 2, display: 'Hours', description: '', createdAt: '', color: '' },
]);
const minUnitSelect = ref(timeUnits.value[0].id);
const maxUnitSelect = ref(minUnitSelect.value);
const table = ref<InstanceType<typeof TaskTable> | null>(null);

async function handleCreateTask() {
    try {
        const node = localStorage.getItem('node');
        if (!node) return;
        const result = await createTask(parseInt(node), task);
        onSuccess(result!);
    } catch (e) {
        onError(e as string);
    }
}

function handleUpdateCell() {
    if (!table.value) return;
    if (!table.value.cellSelected) return;
}

onMounted(() => {
    const nodeId = localStorage.getItem('node');
    if (!nodeId) return;
    if (body.value.length > 0) return;
    tasksFromNode(parseInt(nodeId))
        .then((res) => (body.value = res))
        .catch((err) => onError(err));
});
</script>
