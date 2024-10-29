<template>
    <Modal
        :open="open"
        :title
        @close="onClose"
    >
        <template #body>
            <div class="grid w-[600px] grid-rows-10 gap-3">
                <div class="row-span-3">
                    <Input
                        title="Display"
                        placeholder="e.g. Extremely High"
                        v-model:value="item.display"
                    />
                </div>
                <div class="row-span-3">
                    <TextArea
                        title="Description"
                        placeholder="e.g. Lorem ipsum."
                        v-model:value="item.description"
                    />
                </div>
                <div class="row-span-3">
                    <Select
                        class="col-span-3"
                        title="Color"
                        :colors
                        v-model:color="item.display"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <Button
                title="Close"
                color="midnight"
                @click="onClose"
            />
            <Button
                title="Add"
                color="primary"
                @click="submit"
            />
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import Input from '@/components/Input.vue';
import TextArea from '@/components/TextArea.vue';
import Select from '@/components/Select.vue';
import Button from '@/components/Button.vue';
import type { TPriority, TStatus, TColor } from '@/types';
import { ref, inject } from 'vue';
import { onMounted } from 'vue';
import { usePriority, useStatus } from '@/services';
import { useCustomToast } from '@/helpers';

type TPriorityStatusModal = {
    type: 'priority' | 'status';
    open: boolean;
    title: string;
    onClose: () => void;
    colors: TColor[];
};

const item = ref<Partial<TPriority>>({});
const { createPriority } = usePriority();
const { createStatus } = useStatus();
const { onSuccess, onError } = useCustomToast();
const props = defineProps<TPriorityStatusModal>();

function submit() {
    switch (props.type) {
        case 'status':
            if (!item.value) return;
            handleCreateStatus(item.value as TPriority);
            break;
        default:
            if (!item.value) return;
            handleCreatePriority(item.value as TPriority);
            break;
    }
}

function handleCreatePriority(item: Omit<TPriority, 'id'>) {
    createPriority(item)
        .then((res) => onSuccess(res!))
        .catch((err) => onError(err));
}
function handleCreateStatus(item: Omit<TStatus, 'id'>) {
    createStatus(item)
        .then((res) => onSuccess(res!))
        .catch((err) => onError(err));
}

onMounted(() => {
    const injectedItem = inject<Omit<TPriority, 'id' | 'createdAt'>>('priority-status');
    if (!injectedItem) return;
    item.value = injectedItem;
});
</script>
