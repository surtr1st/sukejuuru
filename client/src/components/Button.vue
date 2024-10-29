<template>
    <button
        v-if="iconOnly"
        :class="theme"
        @click="emit('click')"
        :disabled="disabled"
    >
        <component :is="icon" />
    </button>
    <button
        v-else-if="!iconOnly && icon"
        :class="theme"
        @click="emit('click')"
        :disabled="disabled"
    >
        <component :is="icon" /> {{ title }}
    </button>
    <button
        v-else
        :class="theme"
        @click="emit('click')"
        :disabled="disabled"
    >
        {{ title }}
    </button>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import type { TColorVariant, TSize } from '@/types';
import type { Component } from 'vue';
import { getBackgroundColor, getHoverColor } from '@/composables';

type TButton = {
    size: TSize;
    title: string;
    color: TColorVariant;
    iconOnly: boolean;
    icon: Component;
    fixed: boolean;
    rounded: boolean;
    disabled: boolean;
};
const props = withDefaults(defineProps<Partial<TButton>>(), {
    color: 'primary',
    size: 'sm',
    title: 'No title',
    iconOnly: false,
    icon: undefined,
    fixed: false,
    rounded: false,
    disabled: false,
});
const emit = defineEmits(['click']);
const theme = ref<string>(
    'shadow-md shadow-dark/50 text-frost font-semibold p-3 transition ease-in-out text-[15px]',
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

onMounted(
    () =>
        (theme.value = `${computedFullRounded.value} ${theme.value} ${props.rounded ? computedRoundedSize.value : computedSize.value} ${props.disabled ? 'bg-neutral' : getBackgroundColor(props.color) + ' ' + getHoverColor(props.color)}${props.icon ? ' flex justify-center items-center gap-2' : ''}`),
);
</script>
