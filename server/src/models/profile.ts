import { t } from 'elysia';

const Profile = t.Object({
    id: t.Integer(),
    displayName: t.String(),
    joinedAt: t.Date(),
});

export { Profile };
