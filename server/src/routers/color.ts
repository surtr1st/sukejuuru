import { ColorController } from '@/controllers';
import { ColorRoute } from '@/enums';
import { createRouter } from '@bunarcane/arcane';

export const ColorRouter = createRouter()
    .get(ColorRoute.RETRIEVE_COLORS, ColorController.retrieveColors)
    .post(ColorRoute.CREATE, ColorController.createColor)
    .compose();
