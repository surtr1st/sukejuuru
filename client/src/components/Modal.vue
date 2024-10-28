<template>
    <Teleport to="body">
        <div
            v-show="open"
            class="shadow-lg shadow-dark/50 fixed z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] max-h-[600px] p-7 flex flex-col border border-primary rounded-2xl bg-frost dark:bg-shadow dark:text-frost"
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
            class="bg-shadow/35 z-index[100] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-h-screen"
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
