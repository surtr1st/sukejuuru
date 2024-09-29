<template>
    <Modal
        :open="open"
        @close="onClose"
    >
        <template #body>
            <div class="grid w-[600px] grid-rows-12 gap-3">
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
                        :items="colors"
                        :select-option="colors[0].display"
                        v-model:option="item.color"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <Button
                title="Add"
                color="primary"
                @click="submit"
            />
            <Button
                title="Close"
                color="dark"
                @click="onClose"
            />
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import Input from '@/components/Input.vue';
import Select from '@/components/Select.vue';
import Button from '@/components/Button.vue';
import type { TPriority, TStatus, TItems } from '@/types';
import { ref, inject } from 'vue';
import { onMounted } from 'vue';
import { usePriority, useStatus } from '@/services';
import { useCustomToast } from '@/helpers';

type TPriorityStatusModal = {
    type: 'priority' | 'status';
    open: boolean;
    onClose: () => void;
    colors: TItems[];
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
            handleCreateStatus(item.value);
            break;
        default:
            if (!item.value) return;
            handleCreatePriority(item.value);
            break;
    }
}

function handleCreatePriority(item: Omit<TPriority, 'id'>) {
    createPriority(item)
        .then((res) => onSuccess(res))
        .catch((err) => onError(err));
}
function handleCreateStatus(item: Omit<TStatus, 'id'>) {
    createStatus(item)
        .then((res) => onSuccess(res))
        .catch((err) => onError(err));
}

onMounted(() => {
    const injectedItem = inject<Omit<TPriority, 'id' | 'createdAt'>>('priority-status');
    if (!injectedItem) return;
    item.value = injectedItem;
});
</script>
