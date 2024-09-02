import { computed, ref, watch } from 'vue';

const DEFAULT_THEME = 'system';

export function useTheme() {
    const theme = ref(localStorage.getItem('theme') || DEFAULT_THEME);

    const systemPreferred = computed(() => {
        const preferMedia = window.matchMedia('(prefers-color-scheme: dark)');
        return preferMedia.matches ? 'dark' : 'light';
    });

    const togglePreference = () => {
        if (preference.value === 'dark') {
            theme.value = 'light';
            localStorage.setItem('theme', 'light');
        } else {
            theme.value = 'dark';
            localStorage.setItem('theme', 'dark');
        }
    };

    const preference = computed(() => theme.value);

    const bySystem = () => {
        const body = ref<HTMLElement | null>(document.documentElement);
        if (!body.value) return;
        if (systemPreferred.value === 'dark') body.value.classList.add('dark');
        else body.value.classList.remove('dark');
    };

    const toggle = () => {
        const body = ref<HTMLElement | null>(document.documentElement);
        if (!body.value) return;
        const preference = localStorage.getItem('theme') || DEFAULT_THEME;
        switch (preference) {
            case 'dark':
                body.value.classList.add('dark');
                break;
            default:
                body.value.classList.remove('dark');
                break;
        }
    };

    watch(theme, () => toggle());

    return { togglePreference, preference, bySystem, toggle };
}
