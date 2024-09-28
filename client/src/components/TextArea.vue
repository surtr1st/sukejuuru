<template>
    <div class="flex items-start flex-col m-1 gap-2">
        <label
            v-show="!noTitle"
            :for="title"
            class="text-lg font-semibold dark:text-light"
            >{{ title }}</label
        >
        <textarea
            :id="title"
            :placeholder="placeholder"
            class="placeholder:italic drop-shadow-lg bg-light text-neutral rounded-7px w-full p-3 border border-neutral-2 focus:border-primary outline-none dark:bg-dark dark:text-light dark:border-neutral-2"
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
type TTextArea = {
    title: string;
    placeholder: string;
    noTitle: boolean;
};

const props = withDefaults(defineProps<Partial<TTextArea>>(), {
    title: 'No title',
    placeholder: '',
    noTitle: false,
});

const model = defineModel('value', { type: String });
</script>
