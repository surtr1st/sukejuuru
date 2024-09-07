import { useDrizzle } from '@/config/db';
import { penalty } from '@/config/schema';
import { PenaltyError, PenaltySuccess } from '@/enums';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import Elysia, { InternalServerError, NotFoundError } from 'elysia';

interface IPenaltyService {
    findByNode(nodeId: number): Promise<TOmits<TPenalty, 'nodeId' | 'createdAt'>>;
    create(value: Omit<TPenalty, 'id'>): Promise<string>;
    update(id: number, value: Omit<TPenalty, 'id'>): Promise<string>;
    remove(id: number): Promise<string>;
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
        if (result.empty()) throw new InternalServerError(PenaltyError.CREATE);
        return PenaltySuccess.CREATE;
    }

    async update(id: number, value: Omit<TPenalty, 'id'>): Promise<string> {
        const target = await this.db
            .select({ id: penalty.id })
            .from(penalty)
            .where(eq(penalty.id, id));
        if (target.empty()) throw new NotFoundError(PenaltyError.NONEXISTENCE('id', id));

        const result = await this.db
            .update(penalty)
            .set(value)
            .where(eq(penalty.id, id))
            .returning();
        if (result.empty()) throw new InternalServerError(PenaltyError.UPDATE);

        return PenaltySuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const result = await this.db.delete(penalty).where(eq(penalty.id, id)).returning();
        if (result.empty()) throw new InternalServerError(PenaltyError.DELETE);
        return PenaltySuccess.DELETE;
    }
}

export const PenaltyService = new Elysia({ name: 'penalty.service' }).decorate(
    'penaltyService',
    () => new Service(),
);
