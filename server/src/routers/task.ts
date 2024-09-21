import { TaskController } from '@/controllers';
import { TaskRoute } from '@/enums';
import { TaskMiddlewares, TaskParamMiddlewares } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const TaskRouter = createRouter()
    .use(TaskParamMiddlewares)
    .use(TaskMiddlewares)
    .get(TaskRoute.RETRIEVE_BY_NODE, TaskController.retrieveTasksByNode)
    .post(TaskRoute.CREATE, TaskController.createTask)
    .put(TaskRoute.UPDATE, TaskController.updateTask)
    .delete(TaskRoute.DELETE, TaskController.deleteTask)
    .compose();
