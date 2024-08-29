<template>
    <button
        v-if="iconOnly"
        :class="theme"
        @click="emit('click')"
    >
        <component :is="icon" />
    </button>
    <button
        v-else-if="!iconOnly && icon"
        :class="theme"
        @click="emit('click')"
    >
        <component :is="icon" /> {{ title }}
    </button>
    <button
        v-else
        :class="theme"
        @click="emit('click')"
    >
        {{ title }}
    </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
import type { TColorVariant, TSize } from '@/types';
import type { Component } from 'vue';

type TButton = {
    size: TSize;
    title: string;
    color: TColorVariant;
    iconOnly: boolean;
    icon: Component;
};
const props = withDefaults(defineProps<Partial<TButton>>(), {
    color: 'primary',
    size: 'sm',
    title: 'No title',
    iconOnly: false,
    icon: undefined,
});
const emit = defineEmits(['click']);
const theme = ref<string>(
    'rounded-7px drop-shadow-lg text-light font-semibold m-1 p-3 transition ease-in-out text-[15px]',
);

const computedSize = computed(() => {
    switch (props.size) {
        case 'md':
            return 'max-w-[200px] h-[50px]';
        case 'lg':
            return 'max-w-[250px] h-[60px]';
        default:
            return 'max-w-[150px] h-[42px]';
    }
});

const computedColor = computed(() => {
    switch (props.color) {
        case 'secondary':
            return 'bg-secondary hover:bg-h-secondary';
        case 'light':
            return 'bg-light text-neutral hover:bg-h-light';
        case 'neutral':
            return 'bg-neutral hover:bg-h-neutral';
        case 'neutral-2':
            return 'bg-neutral-2 hover:bg-h-neutral-2';
        case 'dark':
            return 'bg-dark hover:bg-h-dark';
        case 'danger':
            return 'bg-danger hover:bg-h-danger';
        case 'warning':
            return 'bg-warning hover:bg-h-warning';
        default:
            return 'bg-primary hover:bg-h-primary';
    }
});

onMounted(
    () =>
        (theme.value = `${theme.value} ${computedSize.value} ${computedColor.value}${props.icon ? ' flex justify-center items-center gap-2' : ''}`),
);
</script>
