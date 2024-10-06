<template>
    <div :class="theme + ' ' + getColors(color)">
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
    color: string | TColorVariant;
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

const getColors = (color: string) => `bg-${color}/15 text-${color} border-${color}`;

onMounted(() => (theme.value = `${theme.value} ${computedSize.value}`));
</script>
