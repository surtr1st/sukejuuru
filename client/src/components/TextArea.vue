<template>
    <div class="flex items-start flex-col mx-1 mt-1 mb-5 gap-2">
        <label
            v-show="!noTitle"
            :for="title"
            class="text-lg font-semibold dark:text-light"
            >{{ title }}</label
        >
        <textarea
            :id="title"
            :placeholder="placeholder"
            class="drop-shadow-lg bg-light text-neutral border border-primary rounded-7px w-full p-3 outline outline-primary dark:bg-dark dark:text-light dark:border-neutral-2 dark:outline-neutral-2"
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
