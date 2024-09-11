<template>
    <div class="flex items-center dark:text-light">
        <div class="w-full m-2">
            <h2 class="text-2xl uppercase font-semibold py-3">Priority</h2>
            <Table
                :headers
                :body="priorities"
                @add="open = true"
            />
        </div>
        <div class="w-full m-2">
            <h2 class="text-2xl uppercase font-semibold py-3">Status</h2>
            <Table
                :headers
                :body="status"
                @add="open = true"
            />
        </div>
    </div>
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
import Modal from '@/components/Modal.vue';
import Table from '@/components/Table.vue';
import { TTableItem } from '@/types';
import { computed } from 'vue';
import { ref } from 'vue';

const open = ref(false);
const headers = computed(() => ['Display', 'Description']);
const priorities = ref<TTableItem[]>([
    {
        id: 1,
        title: 'Utmost',
        color: 'danger',
        description: 'A du dark wa',
    },
]);

const status = ref<TTableItem[]>([
    {
        id: 1,
        title: 'Partially Completed',
        color: 'warning',
        description: 'A du dark wa',
    },
]);
</script>
