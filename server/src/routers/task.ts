import { TaskController } from '@/controllers';
import { TaskRoute } from '@/enums';
import { createRouter } from '@bunarcane/arcane';

export const TaskRouter = createRouter()
    .get(TaskRoute.RETRIEVE_BY_NODE, TaskController.retrieveTasksByNode)
    .post(TaskRoute.CREATE, TaskController.createTask)
    .put(TaskRoute.UPDATE, TaskController.updateTask)
    .delete(TaskRoute.DELETE, TaskController.deleteTask)
    .compose();
