import { CriteriaController } from '@/controllers';
import { CriteriaRoute } from '@/enums';
import { CriteriaMiddlewares, CriteriaParamMiddlewares } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const CriteriaRouter = createRouter()
    .use(CriteriaParamMiddlewares)
    .use(CriteriaMiddlewares)
    .get(CriteriaRoute.RETRIEVE_BY_TASK, CriteriaController.retrieveCriteriasByTask)
    .post(CriteriaRoute.CREATE, CriteriaController.createCriteria)
    .put(CriteriaRoute.UPDATE, CriteriaController.updateCriteria)
    .delete(CriteriaRoute.DELETE, CriteriaController.deleteCriteria)
    .compose();
