<template>
    <div
        v-if="colors.length === 0"
        class="flex items-start flex-col m-1 gap-2"
    >
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
            v-model="itemModel"
            :ref="refSelect"
        >
            <option
                v-for="item in items"
                :key="item.id"
                :value="item.id"
                :class="'text-' + item.color"
            >
                {{ item.display }}
            </option>
        </select>
    </div>
    <div
        v-else
        class="flex items-start flex-col m-1 gap-2"
    >
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
            v-model="colorModel"
            :ref="refSelect"
        >
            <option
                v-for="color in colors"
                :key="color.id"
                :value="color.display"
                :class="'text-' + color.display + ' bg-' + color.display + '/15'"
            >
                {{ color.display }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import type { TItems, TColor } from '@/types';
import type { VNodeRef } from 'vue';
import { ref } from 'vue';

type TSelect = {
    title: string;
    default: string;
    noTitle: boolean;
    items: TItems[];
    colors: TColor[];
    disabled: boolean;
    refSelect: VNodeRef;
};
withDefaults(defineProps<Partial<TSelect>>(), {
    title: 'No title',
    default: '',
    noTitle: false,
    items: () => [],
    colors: () => [],
    disabled: false,
    refSelect: () => {},
});
const itemModel = defineModel('option', { type: Number });
const colorModel = defineModel('color', { type: String });
</script>
