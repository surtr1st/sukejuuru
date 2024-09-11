import { useLocalStorage, useMediaPreferred } from '@/helpers';
import { computed, ref, watch } from 'vue';

const DEFAULT_THEME = 'system';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const [item, setItem] = useLocalStorage('theme', DEFAULT_THEME);

export function useTheme() {
    const theme = ref(item());

    const togglePreference = () => {
        if (preference.value === DARK_THEME) {
            theme.value = LIGHT_THEME;
            setItem(LIGHT_THEME);
        } else {
            theme.value = DARK_THEME;
            setItem(DARK_THEME);
        }
    };

    const preference = computed(() => theme.value);

    const bySystem = () => {
        const body = ref<HTMLElement | null>(document.documentElement);
        if (!body.value) return;
        if (useMediaPreferred().dark()) body.value.classList.add(DARK_THEME);
        else body.value.classList.remove(DARK_THEME);
    };

    const toggle = () => {
        const body = ref<HTMLElement | null>(document.documentElement);
        if (!body.value) return;
        const preference = item();
        switch (preference) {
            case DARK_THEME:
                body.value.classList.add(DARK_THEME);
                break;
            default:
                body.value.classList.remove(DARK_THEME);
                break;
        }
    };

    watch(theme, () => toggle());

    return { togglePreference, preference, bySystem, toggle };
}
