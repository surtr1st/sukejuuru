import { Elysia, InternalServerError, NotFoundError } from 'elysia';
import { useDrizzle } from '@/config/db';
import { node } from '@/config/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { NodeError, NodeSuccess } from '@/enums';
import { eq } from 'drizzle-orm';

interface INodeService {
    nodes(): Promise<TNode[]>;
    create(value: TNode): Promise<string>;
    update(id: number, value: Omit<TNode, 'id'>): Promise<string>;
    remove(id: number): Promise<string>;
    findById(id: number): Promise<TNode>;
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
        const result = await this.db.insert(node).values(value).returning();
        if (result.empty()) throw new InternalServerError(NodeError.CREATE);
        return NodeSuccess.CREATE;
    }

    async update(id: number, value: TNode): Promise<string> {
        const target = await this.db.select().from(node).where(eq(node.id, id));
        if (target.empty()) throw new NotFoundError(NodeError.NONEXISTENCE('id', id));

        const result = await this.db.update(node).set(value).where(eq(node.id, id)).returning();
        if (result.empty()) throw new InternalServerError(NodeError.UPDATE);
        return NodeSuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const target = await this.db.select().from(node).where(eq(node.id, id));
        if (target.empty()) throw new NotFoundError(NodeError.NONEXISTENCE('id', id));

        const result = await this.db.delete(node).where(eq(node.id, id)).returning();
        if (result.empty()) throw new InternalServerError(NodeError.DELETE);
        return NodeSuccess.DELETE;
    }

    async findById(id: number): Promise<TNode> {
        const result = await this.db.select().from(node).where(eq(node.id, id));
        if (result.empty()) throw new NotFoundError(NodeError.NONEXISTENCE('id', id));
        return result[0];
    }
}

export const NodeService = new Elysia({ name: 'node.service' }).decorate(
    'nodeService',
    () => new Service(),
);
