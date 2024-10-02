<template>
    <TrackHistory :tracks />
</template>

<script setup lang="ts">
import TrackHistory from '@/components/TrackHistory.vue';
import type { TTrackHistoryItem } from '@/types';
import { useDuration } from '@/services';
import { state } from '@/store';
import { useCustomToast } from '@/helpers';
import { onMounted, watch } from 'vue';

const { logsFromNode } = useDuration();
const { onError } = useCustomToast();

const tracks: TTrackHistoryItem[] = [
    {
        taskTag: { color: 'primary', display: 'Computer Science' },
        description: 'Bruh',
        duration: '',
        localTime: '',
    },
    {
        taskTag: { color: 'danger', display: '3D Modeling' },
        description: 'Bruh',
        duration: '',
        localTime: '',
    },
    {
        taskTag: { color: 'warning', display: 'Anatomy Drawing Prac' },
        description: 'Bruh',
        duration: '',
        localTime: '',
    },
];

watch(
    () => state.trackLogs,
    (oldLogs, newLogs) => {},
);

onMounted(() => {
    const node = localStorage.getItem('node');
    if (!node) return;
    if (state.trackLogs.length === 0)
        logsFromNode(parseInt(node))
            .then((data) => (state.trackLogs = data))
            .catch((err) => onError(err));
});
</script>
