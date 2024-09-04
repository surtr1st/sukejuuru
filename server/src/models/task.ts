import { t } from 'elysia';

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
