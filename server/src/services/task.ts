import { useDrizzle } from '@/config/db';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import Elysia, { InternalServerError } from 'elysia';
import { BaseService } from './base';
import { task } from '@/config/schema';
import { eq } from 'drizzle-orm';

interface ITaskService extends BaseService<TTask> {
    findTaskByNode(nodeId: number): Promise<Array<TTask>>;
}

class Service implements ITaskService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    async findTaskByNode(nodeId: number): Promise<Array<TTask>> {
        return await this.db.select().from(task).where(eq(task.nodeId, nodeId));
    }

    async create(value: Omit<TTask, 'id'>): Promise<string> {
        const result = await this.db.insert(task).values(value).returning();
        if (result.empty()) throw new InternalServerError();
        return;
    }

    async update(id: number, value: Omit<TTask, 'id'>): Promise<string> {}

    async remove(id: number): Promise<string> {}
}

export const TaskService = new Elysia({ name: 'task.service' }).decorate(
    'taskService',
    () => new Service(),
);
