import Elysia, { t } from 'elysia';

export const Priority = t.Object({
    id: t.Integer(),
    display: t.String(),
    description: t.String(),
    createdAt: t.Date(),
    color: t.String(),
    taskId: t.Integer(),
});

export const PriorityDTO = t.Omit(Priority, ['id', 'taskId']);

export const priorityModels = new Elysia().model({
    'priority.m': Priority,
    'priority.dto': PriorityDTO,
});
