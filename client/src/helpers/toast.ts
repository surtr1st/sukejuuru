import { POSITION, TYPE, useToast } from 'vue-toastification';
import type { ToastOptions } from 'vue-toastification/dist/types/types';

export function useCustomToast(timeout = 3000) {
    const toast = useToast();

    const options: ToastOptions = {
        hideProgressBar: true,
        pauseOnHover: true,
        position: POSITION.TOP_CENTER,
        showCloseButtonOnHover: true,
        timeout,
    };

    const onSuccess = (message: string) => toast(message, { type: TYPE.SUCCESS, ...options });
    const onError = (message: string) => toast(message, { type: TYPE.ERROR, ...options });

    return { onSuccess, onError };
}
