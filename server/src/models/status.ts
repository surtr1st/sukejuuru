import Elysia, { t } from 'elysia';

export const Status = t.Object({
    id: t.Integer(),
    display: t.String(),
    description: t.String(),
    createdAt: t.Date(),
    color: t.String(),
    taskId: t.Integer(),
});

export const StatusDTO = t.Omit(Status, ['id', 'taskId']);

export const statusModels = new Elysia().model({
    'status.m': Status,
    'status.dto': StatusDTO,
});
