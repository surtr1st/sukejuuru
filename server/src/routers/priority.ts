import { PriorityController } from '@/controllers';
import { PriorityRoute } from '@/enums';
import { PriorityMiddlewares, PriorityParamMiddlewares } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const PriorityRouter = createRouter()
    .use(PriorityParamMiddlewares)
    .use(PriorityMiddlewares)
    .get(PriorityRoute.RETRIEVE, PriorityController.retrievePriorities)
    .post(PriorityRoute.CREATE, PriorityController.createPriority)
    .put(PriorityRoute.UPDATE, PriorityController.updatePriority)
    .delete(PriorityRoute.DELETE, PriorityController.deletePriority)
    .compose();
