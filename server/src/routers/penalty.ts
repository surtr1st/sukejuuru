import { PenaltyController } from '@/controllers';
import { PenaltyRoute } from '@/enums';
import { createRouter } from '@bunarcane/arcane';

export const PenaltyRouter = createRouter()
    .get(PenaltyRoute.RETRIEVE_BY_NODE, PenaltyController.retrievePenaltiesByNode)
    .post(PenaltyRoute.CREATE, PenaltyController.createPenalty)
    .put(PenaltyRoute.UPDATE, PenaltyController.updatePenalty)
    .delete(PenaltyRoute.DELETE, PenaltyController.deletePenalty)
    .compose();
