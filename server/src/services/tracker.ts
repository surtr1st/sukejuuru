import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { tracker, useDrizzle } from '@/config';
import { InternalError, ServiceSuccess } from '@/enums';
import { InternalServerError } from '@/errors';
import { sql } from 'drizzle-orm';

export class TrackerService {
    db: PostgresJsDatabase<Record<string, number>>;

    constructor() {
        this.db = useDrizzle();
    }

    async list(): Promise<TTrackerFromRaw[]> {
        return await this.db.execute(
            sql`SELECT duration_id, TO_CHAR(made_on_date, 'Dy, Mon DD, YYYY') as made_on FROM tracker GROUP BY made_on, duration_id ORDER BY duration_id DESC`,
        );
    }

    async create(value: TTracker): Promise<string> {
        const result = await this.db.insert(tracker).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('tracker').CREATE);
        return ServiceSuccess.CREATE;
    }
}
