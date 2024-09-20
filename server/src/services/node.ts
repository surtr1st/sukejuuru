import { node, useDrizzle } from '@/config';
import { InternalError, ServiceSuccess } from '@/enums';
import { InternalServerError, NotFoundError } from '@/errors';
import { eq } from 'drizzle-orm';
import { type IBaseService } from '@bunarcane/arcane';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

interface INodeService extends IBaseService<TNode, number> {
    findById(id: number): Promise<TNode>;
}

export class NodeService implements INodeService {
    private db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    async list(): Promise<TNode[]> {
        return await this.db.select().from(node);
    }

    async create(value: Omit<TNode, 'id'>): Promise<string> {
        const result = await this.db.insert(node).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('node').CREATE);
        return ServiceSuccess.CREATE;
    }

    async update(value: TNode): Promise<string> {
        const target = await this.db.select().from(node).where(eq(node.id, value.id));
        if (target.empty())
            throw new NotFoundError(InternalError('node').NONEXISTENCE('id', value.id));

        const result = await this.db
            .update(node)
            .set(value)
            .where(eq(node.id, value.id))
            .returning();
        if (result.empty()) throw new InternalServerError(InternalError('node').UPDATE);
        return ServiceSuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const target = await this.db.select().from(node).where(eq(node.id, id));
        if (target.empty()) throw new NotFoundError(InternalError('node').NONEXISTENCE('id', id));

        const result = await this.db.delete(node).where(eq(node.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('node').DELETE);
        return ServiceSuccess.DELETE;
    }

    async findById(id: number): Promise<TNode> {
        const result = await this.db.select().from(node).where(eq(node.id, id));
        if (result.empty()) throw new NotFoundError(InternalError('node').NONEXISTENCE('id', id));
        return result[0];
    }
}
