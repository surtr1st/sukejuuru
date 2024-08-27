<template>
    <button
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

type TButtonSize = 'sm' | 'md' | 'lg';
type TButtonColor =
    | 'primary'
    | 'secondary'
    | 'light'
    | 'neutral'
    | 'neutral-2'
    | 'dark'
    | 'danger'
    | 'warning';
type TButton = {
    size: TButtonSize;
    title: string;
    color: TButtonColor;
};
const props = withDefaults(defineProps<Partial<TButton>>(), {
    color: 'primary',
    size: 'sm',
    title: 'No title',
});
const emit = defineEmits(['click']);
const theme = ref<string>(
    'rounded-7px drop-shadow-lg text-light font-semibold m-1 transition ease-in-out text-[15px]',
);

const computedSize = computed(() => {
    switch (props.size) {
        case 'md':
            return 'w-[150px] h-[50px]';
        case 'lg':
            return 'w-[180px] h-[60px]';
        default:
            return 'w-[84px] h-[42px]';
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

onMounted(() => (theme.value = `${theme.value} ${computedSize.value} ${computedColor.value}`));
</script>
