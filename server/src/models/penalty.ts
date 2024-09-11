import Elysia, { t } from 'elysia';

export const Penalty = t.Object({
    id: t.Integer(),
    title: t.String(),
    description: t.String(),
    compensation: t.String(),
    createdAt: t.Date(),
});

export const PenaltyDTO = t.Omit(Penalty, ['id', 'createdAt']);

export const penaltyModels = new Elysia().model({
    'penalty.m': Penalty,
    'penalty.dto': PenaltyDTO,
});
