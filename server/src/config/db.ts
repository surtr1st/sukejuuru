import dorm = require('drizzle-orm/postgres-js');
import postgres from 'postgres';

function useDrizzle() {
    const queryClient = postgres(process.env.SUKEJUURU_CONNECTION_STRING || '');
    return dorm.drizzle(queryClient);
}

export { useDrizzle };
