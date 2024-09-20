import { NotFoundError } from '@/errors';
import { createModule } from '@bunarcane/arcane';

export const BaseMiddlewares = createModule()
    .mod('validateParamId', (id) => {
        if (!id) throw new NotFoundError('`id` is required!');
        if (isNaN(id)) throw new NotFoundError('`id` must be number!');
    })
    .compose();
