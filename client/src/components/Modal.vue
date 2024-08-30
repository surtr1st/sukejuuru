<template>
    <Teleport to="body">
        <div
            v-show="open"
            class="shadow-lg fixed z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[700px] max-h-[800px] p-7 flex flex-col border border-primary rounded-2xl bg-light dark:bg-dark-2 dark:text-light"
        >
            <div class="h-[50px]">
                <h2 class="text-3xl font-semibold">{{ title }}</h2>
            </div>
            <div class="my-3 overflow-x-hidden overflow-y-auto">
                <slot name="body" />
            </div>
            <div class="flex gap-3 justify-end">
                <slot name="footer" />
            </div>
        </div>
        <div
            v-show="open"
            @click="onClose"
            class="bg-dark-2/35 z-index[1000] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-h-screen"
        ></div>
    </Teleport>
</template>

<script setup lang="ts">
type TModal = {
    title: string;
    open: boolean;
    onClose: () => void;
};

withDefaults(defineProps<Partial<TModal>>(), {
    title: '',
    open: false,
    onClose: () => {},
});
</script>
