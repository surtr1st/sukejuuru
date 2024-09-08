import { TaskController } from '@/controllers';
import { TaskRoute } from '@/enums';
import { TaskMiddlewares } from '@/middlewares';
import Elysia from 'elysia';

export const TaskRouter = new Elysia({ name: 'task.router' })
    .use(TaskController)
    .use(TaskMiddlewares)
    .onError(({ error }) => new Response(error.message))
    .get(TaskRoute.RETRIEVE_BY_NODE, ({ retrieveTasksByNode }) => retrieveTasksByNode(), {
        beforeHandle: ({ validateTaskQueries }) => validateTaskQueries(),
    })
    .post(TaskRoute.CREATE, ({ createTask }) => createTask, {
        beforeHandle: ({ validatePayload }) => validatePayload(),
    })
    .put(TaskRoute.UPDATE, ({ updateTask }) => updateTask(), {
        beforeHandle: ({ validateParams }) => validateParams(),
    })
    .delete(TaskRoute.DELETE, ({ deleteTask }) => deleteTask(), {
        beforeHandle: ({ validateParams }) => validateParams(),
    });
