import { useDrizzle } from '@/config/db';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import Elysia, { InternalServerError, NotFoundError } from 'elysia';
import { BaseService } from './base';
import { task } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { InternalError, ServiceSuccess } from '@/enums';

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
        if (result.empty()) throw new InternalServerError(InternalError('task').CREATE);
        return ServiceSuccess.CREATE;
    }

    async update(id: number, value: Omit<TTask, 'id'>): Promise<string> {
        const target = await this.db.select().from(task).where(eq(task.id, id));
        if (target.empty()) throw new NotFoundError(InternalError('task').NONEXISTENCE('id', id));

        const result = await this.db.update(task).set(value).where(eq(task.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('task').UPDATE);

        return ServiceSuccess.UPDATE;
    }

    async remove(id: number): Promise<string> {
        const result = await this.db.delete(task).where(eq(task.id, id)).returning();
        if (result.empty()) throw new InternalServerError(InternalError('task').DELETE);
        return ServiceSuccess.DELETE;
    }
}

export const TaskService = new Elysia({ name: 'task.service' }).decorate(
    'taskService',
    () => new Service(),
);
