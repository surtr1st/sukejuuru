import { DurationController } from '@/controllers';
import { DurationRoute } from '@/enums';
import { createRouter } from '@bunarcane/arcane';

export const DurationRouter = createRouter()
    .get(DurationRoute.RETRIEVE, DurationController.retrieveDurations)
    .post(DurationRoute.CREATE, DurationController.createDuration)
    .compose();
