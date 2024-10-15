import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { db, type IBaseService } from '.';
import { color } from '@/schema';
import { InternalError, ServiceSuccess } from '@/enums';
import { InternalServerError } from '@/errors';

interface IColorService extends IBaseService<TColor, number> {}

class ColorService implements IColorService {
    db: PostgresJsDatabase<Record<string, number>>;

    constructor() {
        this.db = db();
    }

    async list(): Promise<TColor[]> {
        return await this.db.select().from(color);
    }

    async create(value: TColorPayload) {
        const result = await this.db.insert(color).values(value).returning();
        if (result.empty()) throw new InternalServerError(InternalError('duration').CREATE);
        return ServiceSuccess.CREATE;
    }

    async update(): Promise<string> {
        throw new Error('Not implemented');
    }

    async remove(): Promise<string> {
        throw new Error('Not implemented');
    }
}

export function useColor() {
    return new ColorService();
}
