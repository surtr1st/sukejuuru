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
    fixed: boolean;
    rounded: boolean;
};
const props = withDefaults(defineProps<Partial<TButton>>(), {
    color: 'primary',
    size: 'sm',
    title: 'No title',
    iconOnly: false,
    icon: undefined,
    fixed: false,
    rounded: false,
});
const emit = defineEmits(['click']);
const theme = ref<string>(
    'shadow-md shadow-dark/50 text-light font-semibold p-3 transition ease-in-out text-[15px]',
);

const computedFullRounded = computed(() => (props.rounded ? 'rounded-full' : 'rounded-7px'));

const computedRoundedSize = computed(() => {
    switch (props.size) {
        case 'md':
            return 'w-[100px] h-[100px]';
        case 'lg':
            return 'w-[150px] h-[150px]';
        default:
            return 'w-[50px] h-[50px]';
    }
});

const computedSize = computed(() => {
    switch (props.size) {
        case 'md':
            return props.fixed ? 'w-[100px] max-w-[200px] h-[60px]' : 'max-w-[200px] h-[60px]';
        case 'lg':
            return props.fixed ? 'w-[200px] max-w-[250px] h-[65px]' : 'max-w-[250px] h-[65px]';
        default:
            return props.fixed ? 'w-[75px] max-w-[150px] h-[50px]' : 'max-w-[150px] h-[50px]';
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
        (theme.value = `${computedFullRounded.value} ${theme.value} ${props.rounded ? computedRoundedSize.value : computedSize.value} ${computedColor.value}${props.icon ? ' flex justify-center items-center gap-2' : ''}`),
);
</script>
