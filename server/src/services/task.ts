import { priority, status, useDrizzle } from '@/config';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { task } from '@/config';
import { eq } from 'drizzle-orm';
import { InternalError, ServiceSuccess } from '@/enums';
import type { IBaseService } from '@bunarcane/arcane';
import { InternalServerError, NotFoundError } from '@/errors';

interface ITaskService extends IBaseService<TTask, number> {
    findTaskByNode(nodeId: number): Promise<TOmits<TTask, 'nodeId' | 'createdAt'>>;
}

export class TaskService implements ITaskService {
    db: PostgresJsDatabase<Record<string, never>>;

    constructor() {
        this.db = useDrizzle();
    }

    list(): Promise<TTask[]> {
        throw new Error('Not implemented');
    }

    async findTaskByNode(nodeId: number): Promise<TOmits<TTask, 'nodeId' | 'createdAt'>> {
        return await this.db
            .select({
                id: task.id,
                title: task.title,
                description: task.description,
                startDate: task.startDate,
                dueDate: task.dueDate,
                color: task.color,
                minLength: task.minLength,
                maxLength: task.maxLength,
                priority: {
                    display: priority.display,
                    description: priority.description,
                    color: priority.color,
                },
                status: {
                    display: status.display,
                    description: status.description,
                    color: status.color,
                },
            })
            .from(task)
            .innerJoin(priority, eq(task.priorityId, priority.id))
            .innerJoin(status, eq(task.statusId, status.id))
            .where(eq(task.nodeId, nodeId));
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
