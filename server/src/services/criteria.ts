import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { useDrizzle } from '@/config';
import { criteria } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { InternalError, ServiceSuccess } from '@/enums';
import type { IBaseService } from '@bunarcane/arcane';
import { InternalServerError, NotFoundError } from '@/errors';

interface ICriteriaService extends IBaseService<TCriteria, number> {
    findAllByTask(taskId: number): Promise<TCriteria[]>;
}

export class CriteriaService implements ICriteriaService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    async list(): Promise<TCriteria[]> {
        throw new Error('Not implemented');
    }

    async findAllByTask(taskId: number): Promise<TCriteria[]> {
        return await this.db.select().from(criteria).where(eq(criteria.taskId, taskId));
    }

    async create(value: Omit<TCriteria, 'id'>): Promise<string> {
        const result = await this.db.insert(criteria).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('criteria').CREATE);
        return ServiceSuccess.CREATE;
    }

    async update(id: number, value: Omit<TCriteria, 'id'>): Promise<string> {
        const target = await this.db.select().from(criteria);
        if (target.empty())
            throw new NotFoundError(InternalError('criteria').NONEXISTENCE('id', id));
        const result = await this.db
            .update(criteria)
            .set(value)
            .where(eq(criteria.id, id))
            .returning();
        if (result.empty()) throw new InternalServerError(InternalError('criteria').UPDATE);
        return ServiceSuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const result = await this.db.delete(criteria).where(eq(criteria.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('criteria').DELETE);
        return ServiceSuccess.DELETE;
    }
}
