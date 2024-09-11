import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { BaseService } from './base';
import { useDrizzle } from '@/config/db';
import { criteria } from '@/config/schema';
import { eq } from 'drizzle-orm';
import Elysia, { InternalServerError, NotFoundError } from 'elysia';
import { InternalError, ServiceSuccess } from '@/enums';

interface ICriteriaService extends BaseService<TCriteria> {
    findAllByTask(taskId: number): Promise<TCriteria[]>;
}

class Service implements ICriteriaService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
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

export const CriteriaService = new Elysia({ name: 'criteria.service' }).decorate(
    'criteriaService',
    () => new Service(),
);
