import { computed, ref, toValue } from 'vue';

export function useSidebar() {
    const retrieveValue = (key: string) => {
        const expand = localStorage.getItem(key);
        if (!expand) return true;
        return expand === 'true' ? true : false;
    };

    const isExpand = ref<boolean>(retrieveValue('expand'));

    const expanded = computed(() => isExpand.value);

    const setExpand = (expand: boolean) => {
        isExpand.value = expand;
        localStorage.setItem('expand', `${expand}`);
    };

    return {
        expanded,
        setExpand,
    };
}
