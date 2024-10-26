<template>
    <TrackHistory :tracks="state.trackLogs" />
</template>

<script setup lang="ts">
import TrackHistory from '@/components/TrackHistory.vue';
import { useTracker } from '@/services';
import { useBoolState, useState } from '@/store';
import { useCustomToast } from '@/helpers';
import { onMounted } from 'vue';
import { watchTriggerable } from '@vueuse/core';

const state = useState();
const boolState = useBoolState();
const { logsFromNode } = useTracker();
const { onError } = useCustomToast();

const { trigger } = watchTriggerable(() => boolState.tracker, fetchLogsFromNode);

async function fetchLogsFromNode() {
    try {
        const node = localStorage.getItem('node');
        if (!node) return;
        const response = await logsFromNode(parseInt(node));
        state.trackLogs = response ?? [];
    } catch (e) {
        onError((e as Error).message);
    }
}

onMounted(async () => {
    if (state.trackLogs.length === 0) await fetchLogsFromNode();
    if (boolState.tracker) trigger();
});
</script>
