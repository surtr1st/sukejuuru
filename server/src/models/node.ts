import { t } from 'elysia';

export const Node = t.Object({
    id: t.Integer(),
    title: t.String(),
    createdAt: t.Date(),
});
