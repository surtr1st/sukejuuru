<template>
    <div class="flex items-start dark:text-light">
        <div class="w-full m-2">
            <h2 class="text-2xl uppercase font-semibold py-3">Priority</h2>
            <Table
                :headers
                :body="state.priorities"
                @add="openPriorityModal = true"
            />
        </div>
        <div class="w-full m-2">
            <h2 class="text-2xl uppercase font-semibold py-3">Status</h2>
            <Table
                :headers
                :body="state.status"
                @add="openStatusModal = true"
            />
        </div>
    </div>
    <PriorityStatusModal
        ref="pmodal"
        :open="openPriorityModal"
        type="priority"
        @close="openPriorityModal = false"
        :colors="state.colors"
    />
    <PriorityStatusModal
        ref="smodal"
        :open="openStatusModal"
        type="status"
        @close="openStatusModal = false"
        :colors="state.colors"
    />
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue';
import PriorityStatusModal from '@/components/miscellaneos/PriorityStatusModal.vue';
import { ref, computed } from 'vue';
import { useState } from '@/store';
import { onMounted } from 'vue';
import { provide } from 'vue';
import type { TPriority } from '@/types';

const state = useState();
const openPriorityModal = ref(false);
const openStatusModal = ref(false);
const headers = computed(() => ['Display', 'Description']);

onMounted(() =>
    provide<Omit<TPriority, 'createdAt'>>('priority-status', {
        id: 1,
        display: '',
        description: '',
        color: 'primary',
    }),
);
</script>
