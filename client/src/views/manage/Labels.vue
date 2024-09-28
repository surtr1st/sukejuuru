<template>
    <div class="flex items-center dark:text-light">
        <div class="w-full m-2">
            <h2 class="text-2xl uppercase font-semibold py-3">Priority</h2>
            <Table
                :headers
                :body="state.priorities"
                @add="open = true"
            />
        </div>
        <div class="w-full m-2">
            <h2 class="text-2xl uppercase font-semibold py-3">Status</h2>
            <Table
                :headers
                :body="state.status"
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
import type { TTableItem } from '@/types';
import { ref, computed } from 'vue';
import { state } from '@/store';

const open = ref(false);
const headers = computed(() => ['Display', 'Description']);
</script>
