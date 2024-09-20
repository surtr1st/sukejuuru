import { StatusController } from '@/controllers';
import { StatusRoute } from '@/enums';
import { createRouter } from '@bunarcane/arcane';

export const StatusRouter = createRouter()
    .get(StatusRoute.RETRIEVE, StatusController.retrieveStatus)
    .post(StatusRoute.CREATE, StatusController.createStatus)
    .put(StatusRoute.UPDATE, StatusController.updateStatus)
    .delete(StatusRoute.DELETE, StatusController.deleteStatus)
    .compose();
