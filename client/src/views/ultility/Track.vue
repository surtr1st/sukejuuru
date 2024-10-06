<template>
    <TrackHistory :tracks="state.trackLogs" />
</template>

<script setup lang="ts">
import TrackHistory from '@/components/TrackHistory.vue';
import { useTracker } from '@/services';
import { useState } from '@/store';
import { useCustomToast } from '@/helpers';
import { onMounted } from 'vue';

const state = useState();
const { logsFromNode } = useTracker();
const { onError } = useCustomToast();

onMounted(() => {
    const node = localStorage.getItem('node');
    if (!node) return;
    if (state.trackLogs.length === 0)
        logsFromNode(parseInt(node))
            .then((data) => (state.trackLogs = data ?? []))
            .catch((err) => onError(err));
});
</script>
