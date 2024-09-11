import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { BaseService } from './base';
import { useDrizzle } from '@/config/db';
import { duration } from '@/config/schema';
import Elysia, { InternalServerError } from 'elysia';
import { InternalError, ServiceSuccess } from '@/enums';

interface IDurationService extends BaseService<TDuration> {
    findAll(): Promise<TDuration[]>;
}

class Service implements IDurationService {
    db: PostgresJsDatabase<Record<string, number>>;

    constructor() {
        this.db = useDrizzle();
    }

    async findAll(): Promise<TDuration[]> {
        return await this.db.select().from(duration);
    }

    async create(value: Omit<TDuration, 'id'>): Promise<string> {
        const result = await this.db.insert(duration).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('duration').CREATE);
        return ServiceSuccess.CREATE;
    }

    async update(id: number, value: Omit<TDuration, 'id'>): Promise<string> {
        throw new Error('Not implemented');
    }

    async remove(id: number): Promise<string> {
        throw new Error('Not implemented');
    }
}

export const DurationService = new Elysia({ name: 'duration.service' }).decorate(
    'durationService',
    () => new Service(),
);
