<template>
    <div class="flex items-start flex-col m-1 gap-2">
        <label
            v-show="!noTitle"
            :for="title"
            class="text-lg font-semibold dark:text-light"
            >{{ title }}</label
        >
        <select
            :id="title"
            :class="{
                'drop-shadow-lg bg-light text-neutral rounded-7px w-full h-[50px] px-3 border border-neutral-2 focus:border-primary outline-none dark:bg-dark dark:text-light dark:border-neutral-2':
                    !disabled,
                'drop-shadow-lg text-neutral rounded-7px w-full h-[50px] px-3 border border-neutral-2 outline-none bg-neutral dark:text-light dark:border-neutral-2':
                    disabled,
            }"
            :disabled="disabled"
            v-model="model"
        >
            <option
                v-for="item in items"
                :key="item.id"
                :value="item"
                :class="'text-' + item.color"
            >
                {{ item.display }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import type { TItems } from '@/types';
type TSelect = {
    title: string;
    default: string;
    noTitle: boolean;
    items: TItems[];
    disabled: boolean;
};
withDefaults(defineProps<Partial<TSelect>>(), {
    title: 'No title',
    default: '',
    noTitle: false,
    items: () => [],
    disabled: false,
});
const model = defineModel('option', { type: Object });
</script>
