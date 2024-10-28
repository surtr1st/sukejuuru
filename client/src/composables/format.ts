import { useDateFormat } from '@vueuse/core';

export const formatLocalDate = (timestamp: string) => useDateFormat(timestamp, 'HH:mm A');

export const formatDatetime = (timestamp: string) => useDateFormat(timestamp, 'YYYY-MM-DD');
