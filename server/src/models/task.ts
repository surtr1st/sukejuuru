import Elysia, { t } from 'elysia';

export const Task = t.Object({
    id: t.Integer(),
    title: t.String(),
    description: t.String(),
    minLength: t.BigInt(),
    maxLength: t.BigInt(),
    createdAt: t.Date(),
    startDate: t.Date(),
    dueDate: t.Date(),
    color: t.String(),
});

export const TaskDTO = t.Omit(Task, ['id']);

export const taskModels = new Elysia().model({ 'task.m': Task, 'task.dto': TaskDTO });
