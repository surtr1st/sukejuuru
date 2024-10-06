import { TrackerController } from '@/controllers';
import { TrackerRoute } from '@/enums';
import { TrackerMiddleware, TrackerQueryMiddleware } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const TrackerRouter = createRouter()
    .use(TrackerQueryMiddleware)
    .get(TrackerRoute.RETRIEVE_BY_NODE, TrackerController.retrieveTrackLogsFromNode)
    .use(TrackerMiddleware)
    .post(TrackerRoute.CREATE, TrackerController.createHistory)
    .compose();
