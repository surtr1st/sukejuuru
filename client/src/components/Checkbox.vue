<template>
    <div :class="[checked || marked ? checkedTheme : theme]">
        <div class="relative flex items-center rounded-full cursor-pointer">
            <input
                type="checkbox"
                :class="inputTheme"
                :id="title"
                :checked="marked"
                v-model="checked"
            />
            <span
                class="absolute text-frost transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                >
                    <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </span>
        </div>
        <label
            :for="title"
            class="text-lg cursor-pointer"
        >
            {{ title }}
        </label>
    </div>
</template>
<script setup lang="ts">
import type { TColorVariant } from '@/types';
import { onMounted } from 'vue';
import { computed, ref } from 'vue';

type TCheckbox = {
    title: string;
    marked: boolean;
    color: TColorVariant;
};

const props = withDefaults(defineProps<Partial<TCheckbox>>(), {
    title: 'No title',
    marked: false,
    color: 'primary',
});

const checked = defineModel('checked', { type: Boolean });

const theme = computed(() => 'flex gap-2 items-center text-start dark:text-frost w-fit p-1');
const checkedTheme = ref(theme.value);
const inputTheme = ref(
    "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity",
);

const computedColor = computed(() => {
    switch (props.color) {
        case 'secondary':
            return 'bg-secondary hover:bg-h-secondary ';
        case 'light':
            return 'bg-light text-neutral hover:bg-h-light';
        case 'neutral':
            return 'bg-neutral hover:bg-h-neutral';
        case 'neutral-2':
            return 'bg-neutral-2 hover:bg-h-neutral-2';
        case 'success':
            return 'border border-success checked:border-success checked:bg-success checked:before:bg-success';
        default:
            return 'border border-primary checked:border-primary checked:bg-primary checked:before:bg-primary';
    }
});

const computedCheckedColor = computed(
    () => `line-through bg-${props.color}/15 rounded-7px text-${props.color}`,
);

onMounted(() => {
    inputTheme.value = `${inputTheme.value} ${computedColor.value}`;
    checkedTheme.value = `${checkedTheme.value} ${computedCheckedColor.value}`;
});
</script>
