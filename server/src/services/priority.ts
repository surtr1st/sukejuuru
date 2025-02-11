import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { db, type IBaseService } from '.';
import { priority } from '@/schema';
import { InternalError, ServiceSuccess } from '@/enums';
import { eq } from 'drizzle-orm';
import { InternalServerError, NotFoundError } from '@/errors';

interface TPriorityService extends IBaseService<TPriority, number> {}

class PriorityService implements TPriorityService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = db();
    }

    async list(): Promise<TPriority[]> {
        return await this.db.select().from(priority);
    }

    async create(value: Omit<TPriority, 'id'>): Promise<string> {
        const result = await this.db.insert(priority).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('priority').CREATE);
        return ServiceSuccess.CREATE;
    }

    async update(id: number, value: Omit<TPriority, 'id'>): Promise<string> {
        const target = await this.db.select().from(priority).where(eq(priority.id, id));
        if (target.empty())
            throw new NotFoundError(InternalError('priority').NONEXISTENCE('id', id));
        const result = await this.db
            .update(priority)
            .set(value)
            .where(eq(priority.id, id))
            .returning();
        if (result.empty()) throw new InternalServerError(InternalError('priority').UPDATE);
        return ServiceSuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const result = await this.db.delete(priority).where(eq(priority.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('priority').DELETE);
        return ServiceSuccess.DELETE;
    }
}

export function usePriority() {
    return new PriorityService();
}
