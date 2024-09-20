import { useDrizzle } from '@/config';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { task } from '@/config';
import { eq } from 'drizzle-orm';
import { InternalError, ServiceSuccess } from '@/enums';
import type { IBaseService } from '@bunarcane/arcane';
import { InternalServerError, NotFoundError } from '@/errors';

interface ITaskService extends IBaseService<TTask, number> {
    findTaskByNode(nodeId: number): Promise<Array<TTask>>;
}

export class TaskService implements ITaskService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    list(): Promise<TTask[]> {
        throw new Error('Not implemented');
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
