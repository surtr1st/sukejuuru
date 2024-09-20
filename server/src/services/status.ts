import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { useDrizzle } from '@/config';
import { status } from '@/config/schema';
import { InternalError, ServiceSuccess } from '@/enums';
import { eq } from 'drizzle-orm';
import type { IBaseService } from '@bunarcane/arcane';
import { InternalServerError, NotFoundError } from '@/errors';

interface IStatusService extends IBaseService<TStatus, number> {}

export class StatusService implements IStatusService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    async list(): Promise<TStatus[]> {
        return await this.db.select().from(status);
    }

    async create(value: Omit<TStatus, 'id'>): Promise<string> {
        const result = await this.db.insert(status).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('status').CREATE);
        return ServiceSuccess.CREATE;
    }

    async update(id: number, value: Omit<TStatus, 'id'>): Promise<string> {
        const target = await this.db.select().from(status).where(eq(status.id, id));
        if (target.empty()) throw new NotFoundError(InternalError('status').NONEXISTENCE('id', id));
        const result = await this.db.update(status).set(value).where(eq(status.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('status').UPDATE);
        return ServiceSuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const result = await this.db.delete(status).where(eq(status.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('status').DELETE);
        return ServiceSuccess.DELETE;
    }
}
