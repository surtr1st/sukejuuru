<template>
    <div :class="theme">
        <h3 class="font-semibold">
            {{ display }}
        </h3>
    </div>
</template>

<script setup lang="ts">
import type { TColorVariant, TSize } from '@/types';
import { ref } from 'vue';
import { computed, onMounted } from 'vue';

type TTaskTag = {
    display: string;
    color: TColorVariant;
    size: TSize;
};

const props = withDefaults(defineProps<Partial<TTaskTag>>(), {
    display: 'No display',
    color: 'primary',
    size: 'sm',
});

const theme = ref<string>('grid place-items-center border rounded-7px p-2 mx-1');

const computedSize = computed(() => {
    switch (props.size) {
        case 'md':
            return 'max-w-[180px] h-[50px]';
        case 'lg':
            return 'max-w-[250px] h-[50px]';
        default:
            return 'max-w-[120px] h-[50px]';
    }
});

const computedColor = computed(() => {
    switch (props.color) {
        case 'secondary':
            return 'bg-secondary/15 text-secondary border-secondary';
        case 'light':
            return 'bg-light/15 text-light border-light';
        case 'neutral':
            return 'bg-neutral/15 dark:text-light text-neutral border-neutral';
        case 'neutral-2':
            return 'bg-neutral-2/15 dark:text-light text-neutral-2 border-neutral-2';
        case 'dark':
            return 'bg-dark/15 dark:text-light text-dark border-dark';
        case 'danger':
            return 'bg-danger/15 text-danger border-danger';
        case 'warning':
            return 'bg-warning/15 text-warning border-warning';
        default:
            return 'bg-primary/15 text-primary border-primary';
    }
});

onMounted(() => (theme.value = `${theme.value} ${computedSize.value} ${computedColor.value}`));
</script>
