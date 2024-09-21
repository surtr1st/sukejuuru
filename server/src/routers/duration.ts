import { DurationController } from '@/controllers';
import { DurationRoute } from '@/enums';
import { DurationMiddlewares } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const DurationRouter = createRouter()
    .use(DurationMiddlewares)
    .get(DurationRoute.RETRIEVE, DurationController.retrieveDurations)
    .post(DurationRoute.CREATE, DurationController.createDuration)
    .compose();
