import { Elysia } from 'elysia';
import { useDrizzle } from '@/config/db';
import { node } from '@/config/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { PostgresError } from 'postgres';
import { NodeError, NodeSuccess } from '@/enums';
import { eq } from 'drizzle-orm';

interface INodeService {
    nodes(): Promise<TNode[]>;
    create(value: TNode): Promise<string>;
    update(value: TNode): Promise<string>;
    remove(id: number): Promise<string>;
}

class Service implements INodeService {
    private db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    async nodes(): Promise<TNode[]> {
        return await this.db.select().from(node);
    }

    async create(value: TNode): Promise<string> {
        try {
            const result = await this.db.insert(node).values(value).returning();
            if (result.length === 0) throw new PostgresError(NodeError.CREATE);
            return NodeSuccess.CREATE;
        } catch (e) {
            return (e as PostgresError).message;
        }
    }

    async update(value: TNode): Promise<string> {
        try {
            const result = await this.db
                .update(node)
                .set(value)
                .where(eq(node.id, value.id))
                .returning();
            if (result.length === 0) throw new PostgresError(NodeError.UPDATE);
            return NodeSuccess.UPDATE;
        } catch (e) {
            return (e as PostgresError).message;
        }
    }

    async remove(id: number): Promise<string> {
        try {
            const result = await this.db.delete(node).where(eq(node.id, id)).returning();
            if (result.length === 0) throw new PostgresError(NodeError.DELETE);
            return NodeSuccess.DELETE;
        } catch (e) {
            return (e as PostgresError).message;
        }
    }
}

export const NodeService = new Elysia({ name: 'node.service' }).decorate(
    'NodeService',
    () => new Service(),
);
