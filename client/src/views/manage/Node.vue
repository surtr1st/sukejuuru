<template>
    <Table
        :headers
        :body
        @add="open = true"
    />
    <Modal
        :open="open"
        @close="open = false"
    >
        <template #body> </template>
        <template #footer>
            <Button
                title="Add"
                color="primary"
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
import Table from '@/components/Table.vue';
import type { TTask } from '@/types';
import { ref } from 'vue';
import { computed } from 'vue';

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
const body = ref<TTask[]>([
    {
        id: 1,
        title: 'Computer Science',
        description:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
        priority: { id: 1, display: 'High' },
        minLength: '30 mins',
        maxLength: '2 hours',
        startDate: '20/11/2022',
        dueDate: '10/12/2022',
        criterias: [
            { id: 1, description: 'Criteria 1' },
            {
                id: 2,
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            },
            { id: 3, description: 'Lorem ipsum blah blah blah' },
        ],
        status: { id: 1, display: 'Incompleted' },
        color: { display: 'primary' },
    },
    {
        id: 2,
        title: 'Anatomy Drawing Practice',
        description:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
        priority: { id: 1, display: 'High' },
        minLength: '30 mins',
        maxLength: '2 hours',
        startDate: '20/11/2022',
        dueDate: '10/12/2022',
        criterias: [
            { id: 1, description: 'Criteria 1' },
            {
                id: 2,
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            },
            { id: 3, description: 'Lorem ipsum blah blah blah' },
        ],
        status: { id: 1, display: 'Incompleted' },
        color: { display: 'danger' },
    },
]);

const open = ref(false);
</script>
