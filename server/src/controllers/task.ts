import { taskModels } from '@/models';
import { TaskService } from '@/services';
import Elysia from 'elysia';

export const TaskController = new Elysia({ name: 'task.controller' })
    .use(TaskService)
    .use(taskModels)
    .guard({ as: 'local', body: 'task.dto' })
    .derive({ as: 'scoped' }, ({ taskService, body, params, query }) => ({
        createTask: async () => await taskService().create({ ...body, createdAt: new Date() }),
        updateTask: async () => await taskService().update(params.id, body),
        deleteTask: async () => await taskService().remove(params.id),
        retrieveTasksByNode: async () => await taskService().findTaskByNode(query.nodeId),
    }));
