import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { useDrizzle } from '@/config';
import { color } from '@/config';
import { InternalError, ServiceSuccess } from '@/enums';
import { InternalServerError } from '@/errors';
import type { IBaseService } from '@bunarcane/arcane';

interface IColorService extends IBaseService<TColor, number> {}

export class ColorService implements IColorService {
    db: PostgresJsDatabase<Record<string, number>>;

    constructor() {
        this.db = useDrizzle();
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
