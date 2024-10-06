import { DurationController } from '@/controllers';
import { DurationRoute } from '@/enums';
import { DurationMiddlewares } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const DurationRouter = createRouter()
    .use(DurationMiddlewares)
    .get(DurationRoute.RETRIEVE_BY_NODE, DurationController.retrieveLogsByNode)
    .post(DurationRoute.CREATE, DurationController.createDuration)
    .compose();
