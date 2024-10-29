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
            :type="type"
            :placeholder="placeholder"
            :class="{
                [theme]: !disabled,
                'placeholder:italic drop-shadow-lg text-neutral bg-neutral rounded-7px w-full h-[50px] px-3 border border-slate focus:border-primary outline-none dark:text-frost dark:border-slate':
                    disabled,
                [invalidTheme]: !disabled && isInvalid,
            }"
            :disabled="disabled"
            :required="required"
            v-model="model"
            @keydown="submitOnEnter($event)"
            @blur="checkOnBlur ? onBlur() : () => {}"
        />
        <Invalid
            v-show="isInvalid"
            :when="invalid.when"
            :message="invalid.message"
        />
    </div>
</template>

<script setup lang="ts">
import Invalid from './Invalid.vue';
import { ref, computed } from 'vue';

type TInputType = 'text' | 'password';
type TInput = {
    title: string;
    placeholder: string;
    type: TInputType;
    noTitle: boolean;
    disabled: boolean;
    required: boolean;
    invalid: {
        when: string;
        message: string;
    };
    checkOnBlur: boolean;
    onEnter: () => void;
};
const props = withDefaults(defineProps<Partial<TInput>>(), {
    title: 'No title',
    placeholder: '',
    type: 'text',
    noTitle: false,
    disabled: false,
    required: false,
    invalid: {
        when: false,
        message: 'Invalid',
    },
    checkOnBlur: false,
});
const isInvalid = ref(false);
const model = defineModel('value', { type: String });
const theme = computed(
    () =>
        'placeholder:italic drop-shadow-lg rounded-7px w-full h-[50px] px-3 bg-frost text-neutral border border-slate focus:border-primary outline-none dark:bg-midnight dark:text-frost dark:border-slate',
);
const invalidTheme = ref(`${theme.value} invalid:border-blush`);

function submitOnEnter(e: KeyboardEvent) {
    if (!props.onEnter) return;
    if (e.key === 'Enter') {
        onBlur();
        if (isInvalid.value) return;
        props.onEnter();
    }
}

function onBlur() {
    if (props.invalid) {
        isInvalid.value = true;
    } else isInvalid.value = false;
}
</script>
