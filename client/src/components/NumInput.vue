<template>
    <div class="flex items-start flex-col m-1 gap-2">
        <label
            v-show="!noTitle"
            :for="title"
            class="text-lg font-semibold dark:text-frost"
            >{{ title }}</label
        >
        <input
            :id="title"
            :name="title"
            type="number"
            :placeholder="placeholder"
            :class="{
                'placeholder:italic drop-shadow-lg bg-frost text-neutral rounded-7px w-full h-[50px] px-3 border border-slate focus:border-primary outline-none dark:bg-midnight dark:text-frost dark:border-slate':
                    !disabled,
                'placeholder:italic drop-shadow-lg text-neutral bg-neutral rounded-7px w-full h-[50px] px-3 border border-slate focus:border-primary outline-none dark:text-frost dark:border-slate':
                    disabled,
            }"
            :disabled="disabled"
            v-model="model"
            @keydown="submitOnEnter($event)"
        />
    </div>
</template>

<script setup lang="ts">
type TInput = {
    title: string;
    placeholder: string;
    noTitle: boolean;
    disabled: boolean;
    onEnter: () => void;
};
const props = withDefaults(defineProps<Partial<TInput>>(), {
    title: 'No title',
    placeholder: '',
    noTitle: false,
    disabled: false,
});
const model = defineModel('value', { type: Number });

function submitOnEnter(e: KeyboardEvent) {
    if (!props.onEnter) return;
    if (e.key === 'Enter') props.onEnter();
}
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
