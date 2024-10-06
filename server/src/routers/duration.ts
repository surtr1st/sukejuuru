import { DurationController } from '@/controllers';
import { DurationRoute } from '@/enums';
import { DurationMiddlewares } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const DurationRouter = createRouter()
    .use(DurationMiddlewares)
    .post(DurationRoute.CREATE, DurationController.createDuration)
    .compose();
