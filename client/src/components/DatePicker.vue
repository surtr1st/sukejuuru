<template>
    <div class="flex items-start flex-col m-1 gap-2">
        <label
            v-show="!noTitle"
            :for="title"
            class="text-lg font-semibold dark:text-light"
            >{{ title }}</label
        >
        <span class="w-full relative">
            <input
                :id="title"
                type="date"
                :class="{
                    'placeholder:italic drop-shadow-lg bg-light text-neutral rounded-7px w-full h-[50px] px-3 border border-neutral-2 focus:border-primary outline-none dark:bg-dark dark:text-light dark:border-neutral-2':
                        !disabled,
                    'placeholder:italic drop-shadow-lg text-neutral bg-neutral rounded-7px w-full h-[50px] px-3 border border-neutral-2 focus:border-primary outline-none dark:text-light dark:border-neutral-2':
                        disabled,
                }"
                :disabled="disabled"
                v-model="model"
                ref="date"
            />
            <CalendarDateRangeIcon
                class="absolute top-[50%] right-0 -translate-x-[50%] -translate-y-[50%]"
                @click="showPicker()"
            />
        </span>
    </div>
</template>

<script setup lang="ts">
import CalendarDateRangeIcon from './icons/24x24/CalendarDateRangeIcon.vue';
import { ref } from 'vue';

type TDatePicker = {
    title: string;
    noTitle: boolean;
    disabled: boolean;
};
const props = withDefaults(defineProps<Partial<TDatePicker>>(), {
    title: 'No title',
    noTitle: false,
    disabled: false,
});
const model = defineModel('pick', { type: String });
const date = ref<HTMLInputElement | null>(null);

function showPicker() {
    if (!date.value) return;
    date.value.focus();
    date.value.showPicker();
}
</script>

<style scoped>
input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
}
</style>
