import Elysia, { t } from 'elysia';

export const Duration = t.Object({
    id: t.Integer(),
    timeOnTask: t.BigInt(),
    madeOnDate: t.Date(),
    description: t.String(),
    taskId: t.Integer(),
});

export const DurationDTO = t.Omit(Duration, ['id']);

export const durationModels = new Elysia().model({
    'duration.m': Duration,
    'duration.dto': DurationDTO,
});
