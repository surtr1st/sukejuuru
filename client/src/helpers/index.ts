export function useLocalStorage(name: string, defaultValue = ''): [Getter<string>, Setter<string>] {
    const item = () => localStorage.getItem(name) || defaultValue;
    const setItem = (value: string) => {
        localStorage.setItem(name, value);
    };
    return [item, setItem];
}

export function useMediaPreferred() {
    const preferMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const dark = () => preferMedia.matches && 'dark';
    const light = () => !preferMedia.matches && 'light';
    return { dark, light };
}
