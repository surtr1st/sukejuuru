import { useResult } from '@/utils';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export interface IBaseService<T1, T2> {}
export const db = () => drizzle(postgres(useResult(Bun.env.SUKEJUURU_CONNECTION_STRING)));

export * from './node';
export * from './task';
export * from './status';
export * from './penalty';
export * from './criteria';
export * from './duration';
export * from './priority';
export * from './tracker';
export * from './color';
