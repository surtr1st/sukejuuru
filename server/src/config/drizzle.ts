import { usePostgres } from '@bunarcane/arcane';
import { drizzle } from 'drizzle-orm/postgres-js';

export function useDrizzle() {
    return drizzle(usePostgres());
}
