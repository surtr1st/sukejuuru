<template>
    <div class="flex items-start flex-col m-1 gap-2">
        <label
            v-show="!noTitle"
            :for="title"
            class="text-lg font-semibold dark:text-light"
            >{{ title }}</label
        >
        <input
            :id="title"
            :type="type"
            :placeholder="placeholder"
            :class="{
                'placeholder:italic drop-shadow-lg bg-light text-neutral rounded-7px w-full h-[50px] px-3 border border-neutral-2 focus:border-primary outline-none dark:bg-dark dark:text-light dark:border-neutral-2':
                    !disabled,
                'placeholder:italic drop-shadow-lg text-neutral bg-neutral rounded-7px w-full h-[50px] px-3 border border-neutral-2 focus:border-primary outline-none dark:text-light dark:border-neutral-2':
                    disabled,
            }"
            :disabled="disabled"
            v-model="model"
            @keydown="submitOnEnter($event)"
        />
    </div>
</template>

<script setup lang="ts">
type TInputType = 'text' | 'password';
type TInput = {
    title: string;
    placeholder: string;
    type: TInputType;
    noTitle: boolean;
    disabled: boolean;
    onEnter: () => void;
};
const props = withDefaults(defineProps<Partial<TInput>>(), {
    title: 'No title',
    placeholder: '',
    type: 'text',
    noTitle: false,
    disabled: false,
});
const model = defineModel('value', { type: String });

function submitOnEnter(e: KeyboardEvent) {
    if (!props.onEnter) return;
    if (e.key === 'Enter') props.onEnter();
}
</script>
