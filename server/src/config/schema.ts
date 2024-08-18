import { pgTable, serial, varchar, date, text, bigint, integer } from 'drizzle-orm/pg-core';

const profile = pgTable('profile', {
    id: serial('id').primaryKey(),
    displayName: varchar('display_name', { length: 256 }),
    joinedAt: date('joined_at'),
});

const penalty = pgTable('penalty', {
    id: serial('id').primaryKey(),
    title: text('title'),
    description: text('description'),
    compensation: text('compensation'),
    createdAt: date('created_at'),
});

const node = pgTable('node', {
    id: serial('id').primaryKey(),
    title: text('title'),
    createdAt: date('created_at'),
    profileId: integer('profile_id').references(() => profile.id),
    penaltyId: integer('penalty_id').references(() => penalty.id),
});

const task = pgTable('task', {
    id: serial('id').primaryKey(),
    title: text('title'),
    description: text('description'),
    minLength: bigint('min_length', { mode: 'number' }),
    maxLength: bigint('max_length', { mode: 'number' }),
    createdAt: date('created_at'),
    startDate: date('start_date'),
    dueDate: date('due_date'),
    nodeId: integer('node_id').references(() => node.id),
});

const criteria = pgTable('criteria', {
    id: serial('id').primaryKey(),
    description: text('description'),
    createdAt: date('created_at'),
    taskId: integer('task_id').references(() => task.id),
});

const status = pgTable('status', {
    id: serial('id').primaryKey(),
    display: varchar('display', { length: 256 }),
    description: text('description'),
    createdAt: date('created_at'),
    taskId: integer('task_id').references(() => task.id),
});

const duration = pgTable('duration', {
    id: serial('id').primaryKey(),
    timeOnTask: bigint('time_on_task', { mode: 'number' }),
    madeOnDate: date('made_on_date'),
    description: text('description'),
    taskId: integer('task_id').references(() => task.id),
});

const priority = pgTable('priority', {
    id: serial('id').primaryKey(),
    display: varchar('display', { length: 256 }),
    description: text('description'),
    createdAt: date('created_at'),
    taskId: integer('task_id').references(() => task.id),
});

const tracker = pgTable('tracker', {
    durationId: integer('duration_id').references(() => duration.id),
    priorityId: integer('priority_id').references(() => priority.id),
});

export { profile, node, penalty, task, criteria, status, duration, priority, tracker };
