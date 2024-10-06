import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { task, useDrizzle } from '@/config';
import { duration } from '@/config';
import { InternalError } from '@/enums';
import { InternalServerError } from '@/errors';
import { desc, eq } from 'drizzle-orm';

export class DurationService {
    db: PostgresJsDatabase<Record<string, number>>;

    constructor() {
        this.db = useDrizzle();
    }

    async list(): Promise<TDuration[]> {
        throw new Error('Not implemented');
    }

    async create(value: Omit<TDuration, 'id'>): Promise<{ insertedId: number }> {
        const result = await this.db
            .insert(duration)
            .values(value)
            .returning({ insertedId: duration.id });
        if (result.empty()) throw new InternalServerError(InternalError('duration').CREATE);
        return result[0];
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
            .where(eq(task.nodeId, nodeId))
            .orderBy(desc(duration.id));
    }
}
