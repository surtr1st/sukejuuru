import { useResult } from '@bunarcane/arcane';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export function useDrizzle() {
    return drizzle(
        postgres(useResult(Bun.env.SUKEJUURU_CONNECTION_STRING), {
            transform: { column: postgres.toCamel },
        }),
    );
}
