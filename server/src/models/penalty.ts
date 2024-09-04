import { t } from 'elysia';

export const Penalty = t.Object({
    id: t.Integer(),
    title: t.String(),
    description: t.String(),
    compensation: t.String(),
    createdAt: t.Date(),
});
