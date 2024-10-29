<template>
    <div class="flex items-start flex-col m-1 gap-2">
        <label
            v-show="!noTitle"
            :for="title"
            class="text-lg font-semibold dark:text-frost"
            >{{ title }}</label
        >
        <textarea
            :id="title"
            :name="title"
            :placeholder="placeholder"
            class="placeholder:italic drop-shadow-lg bg-frost text-neutral rounded-7px w-full p-3 border border-slate focus:border-primary outline-none dark:bg-midnight dark:text-frost dark:border-slate"
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

withDefaults(defineProps<Partial<TTextArea>>(), {
    title: 'No title',
    placeholder: '',
    noTitle: false,
});

const model = defineModel('value', { type: String });
</script>

<style scoped>
textarea {
    resize: none;
}
</style>
