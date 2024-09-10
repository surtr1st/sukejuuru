<template>
    <TrackHistory :tracks />
</template>

<script setup lang="ts">
import TrackHistory from '@/components/TrackHistory.vue';
import type { TTrackHistoryItem } from '@/types';
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
</script>
