import { useLocalStorage } from '@/helpers';
import { computed, ref } from 'vue';

const [item, setItem] = useLocalStorage('expand');

export function useSidebar() {
    const retrieveValue = () => {
        if (!item()) return true;
        return item() === 'true' ? true : false;
    };

    const isExpand = ref<boolean>(retrieveValue());

    const expanded = computed(() => isExpand.value);

    const setExpand = (expand: boolean) => {
        isExpand.value = expand;
        setItem(`${expand}`);
    };

    return {
        expanded,
        setExpand,
    };
}
