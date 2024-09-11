import Elysia, { t } from 'elysia';

export const Node = t.Object({
    id: t.Integer(),
    title: t.String(),
    createdAt: t.Date(),
});

export const NodeDTO = t.Omit(Node, ['id', 'createdAt']);

export const nodeModels = new Elysia({ name: 'node.model' }).model({
    'node.m': Node,
    'node.dto': NodeDTO,
});
