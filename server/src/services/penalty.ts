import { useDrizzle } from '@/config/db';
import { penalty } from '@/config/schema';
import { InternalError, PenaltySuccess } from '@/enums';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import Elysia, { InternalServerError, NotFoundError } from 'elysia';
import { BaseService } from './base';

interface IPenaltyService extends BaseService<TPenalty> {
    findByNode(nodeId: number): Promise<TOmits<TPenalty, 'nodeId' | 'createdAt'>>;
}

class Service implements IPenaltyService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    async findByNode(nodeId: number): Promise<TOmits<TPenalty, 'nodeId' | 'createdAt'>> {
        const { id, title, description, compensation } = penalty;
        const result = await this.db
            .select({ id, title, description, compensation })
            .from(penalty)
            .where(eq(penalty.nodeId, nodeId));
        return result;
    }

    async create(value: Omit<TPenalty, 'id'>): Promise<string> {
        const result = await this.db.insert(penalty).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('penalty').CREATE);
        return PenaltySuccess.CREATE;
    }

    async update(id: number, value: Omit<TPenalty, 'id'>): Promise<string> {
        const target = await this.db
            .select({ id: penalty.id })
            .from(penalty)
            .where(eq(penalty.id, id));
        if (target.empty())
            throw new NotFoundError(InternalError('penalty').NONEXISTENCE('id', id));

        const result = await this.db
            .update(penalty)
            .set(value)
            .where(eq(penalty.id, id))
            .returning();
        if (result.empty()) throw new InternalServerError(InternalError('penalty').UPDATE);

        return PenaltySuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const result = await this.db.delete(penalty).where(eq(penalty.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('penalty').DELETE);
        return PenaltySuccess.DELETE;
    }
}

export const PenaltyService = new Elysia({ name: 'penalty.service' }).decorate(
    'penaltyService',
    () => new Service(),
);
