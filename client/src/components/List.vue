<template>
    <div class="flex flex-col items-start gap-2 mx-1">
        <h2 class="text-xs font-semibold uppercase text-primary my-1">{{ title }}</h2>
        <ul class="flex flex-col w-full gap-1">
            <li
                class="transition ease-in-out w-full h-[48px] py-1 px-3 border-l border-primary flex gap-5 justify-start items-center hover:cursor-pointer hover:bg-h-light dark:text-light dark:hover:bg-h-dark"
                v-for="(item, index) in items"
                :key="index"
                @click="emit('click')"
            >
                <component :is="item.icon" />
                <h3 class="font-semibold">
                    {{ item.label }}
                </h3>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
type TListItem = {
    id: number;
    label: string;
    icon: unknown;
};

type TList = {
    title: string;
    items: TListItem[];
};
withDefaults(defineProps<Partial<TList>>(), {
    title: 'No Title',
    items: () => [],
});
const emit = defineEmits(['click']);
</script>
