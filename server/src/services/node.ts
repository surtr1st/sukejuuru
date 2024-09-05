import { Elysia } from 'elysia';
import { useDrizzle } from '@/config/db';
import { node } from '@/config/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { NodeError, NodeSuccess } from '@/enums';
import { eq } from 'drizzle-orm';

interface INodeService {
    nodes(): Promise<TNode[]>;
    create(value: TNode): Promise<string>;
    update(value: TNode): Promise<string>;
    remove(id: number): Promise<string>;
}

class Service implements INodeService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    async nodes(): Promise<TNode[]> {
        return await this.db.select().from(node);
    }

    async create(value: Omit<TNode, 'id'>): Promise<string> {
        try {
            const result = await this.db.insert(node).values(value).returning();
            if (result.length === 0) throw new Error(NodeError.CREATE);
            return NodeSuccess.CREATE;
        } catch (e) {
            return (e as Error).message;
        }
    }

    async update(value: TNode): Promise<string> {
        try {
            const result = await this.db
                .update(node)
                .set(value)
                .where(eq(node.id, value.id))
                .returning();
            if (result.length === 0) throw new Error(NodeError.UPDATE);
            return NodeSuccess.UPDATE;
        } catch (e) {
            return (e as Error).message;
        }
    }

    async remove(id: number): Promise<string> {
        try {
            const result = await this.db.delete(node).where(eq(node.id, id)).returning();
            if (result.length === 0) throw new Error(NodeError.DELETE);
            return NodeSuccess.DELETE;
        } catch (e) {
            return (e as Error).message;
        }
    }
}

export const NodeService = new Elysia({ name: 'node.service' }).decorate(
    'nodeService',
    () => new Service(),
);
