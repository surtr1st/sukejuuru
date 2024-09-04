import { t } from 'elysia';

export const node = t.Object({
    id: t.Integer(),
    title: t.String(),
    createdAt: t.Date(),
});
