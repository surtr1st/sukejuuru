import Elysia, { t } from 'elysia';

export const Criteria = t.Object({
    id: t.Integer(),
    description: t.String(),
    createdAt: t.Date(),
    taskId: t.Integer(),
});

export const CriteriaDTO = t.Omit(Criteria, ['id']);

export const criteriaModels = new Elysia().model({
    'criteria.m': Criteria,
    'criteria.dto': CriteriaDTO,
});
