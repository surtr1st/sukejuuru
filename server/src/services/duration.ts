import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { task, useDrizzle } from '@/config';
import { duration } from '@/config';
import { InternalError, ServiceSuccess } from '@/enums';
import type { IBaseService } from '@bunarcane/arcane';
import { InternalServerError } from '@/errors';
import { eq } from 'drizzle-orm';

interface IDurationService extends IBaseService<TDuration, number> {}

export class DurationService implements IDurationService {
    db: PostgresJsDatabase<Record<string, number>>;

    constructor() {
        this.db = useDrizzle();
    }

    async list(): Promise<TDuration[]> {
        throw new Error('Not implemented');
    }

    async create(value: Omit<TDuration, 'id'>): Promise<string> {
        const result = await this.db.insert(duration).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('duration').CREATE);
        return ServiceSuccess.CREATE;
    }

    async update(): Promise<string> {
        throw new Error('Not implemented');
    }

    async remove(): Promise<string> {
        throw new Error('Not implemented');
    }

    async logsFromNode(nodeId: number): Promise<TDurationFromNode[]> {
        return await this.db
            .select({
                id: duration.id,
                taskTag: {
                    id: task.id,
                    title: task.title,
                    color: task.color,
                },
                description: duration.description,
                timeOnTask: duration.timeOnTask,
                startFrom: duration.startFrom,
                endAt: duration.endAt,
            })
            .from(duration)
            .innerJoin(task, eq(duration.taskId, task.id))
            .where(eq(task.nodeId, nodeId));
    }
}
