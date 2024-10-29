<template>
    <span
        v-show="when"
        class="text-blush text-sm"
    >
        {{ message }}
    </span>
</template>

<script setup lang="ts">
type TInvalid = {
    message: string;
    target: string;
    when: boolean;
};

defineProps<Partial<TInvalid>>();
</script>
