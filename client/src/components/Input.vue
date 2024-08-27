<template>
    <div class="flex items-start flex-col m-1 gap-2">
        <label
            :for="title"
            class="text-lg font-semibold"
            >{{ title }}</label
        >
        <input
            :id="title"
            :type="type"
            :placeholder="placeholder"
            class="drop-shadow-lg bg-light text-neutral border border-primary rounded-7px w-full h-[50px] px-3 outline-primary"
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
type TInputType = 'text' | 'password';
type TInput = {
    title: string;
    placeholder: string;
    type: TInputType;
};
const props = withDefaults(defineProps<Partial<TInput>>(), {
    title: 'No title',
    placeholder: '',
    type: 'text',
});
const model = defineModel('value', { type: String });
</script>
