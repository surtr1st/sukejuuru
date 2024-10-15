import { db, type IBaseService } from '.';
import { penalty } from '@/schema';
import { InternalError, ServiceSuccess } from '@/enums';
import { InternalServerError, NotFoundError } from '@/errors';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

interface IPenaltyService extends IBaseService<TPenalty, number> {
    findByNode(nodeId: number): Promise<TOmits<TPenalty, 'nodeId' | 'createdAt'>>;
}

export class PenaltyService implements IPenaltyService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = db();
    }

    list(): Promise<TPenalty[]> {
        throw new Error('Not implemented');
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
        return ServiceSuccess.CREATE;
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

        return ServiceSuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const result = await this.db.delete(penalty).where(eq(penalty.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('penalty').DELETE);
        return ServiceSuccess.DELETE;
    }
}
