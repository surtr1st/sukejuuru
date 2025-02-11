import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

const node = pgTable('node', {
    id: serial('id').primaryKey(),
    title: text('title'),
    createdAt: timestamp('created_at', { withTimezone: true }),
});

const penalty = pgTable('penalty', {
    id: serial('id').primaryKey(),
    title: text('title'),
    description: text('description'),
    compensation: text('compensation'),
    createdAt: timestamp('created_at', { withTimezone: true }),
    nodeId: integer('node_id').references(() => node.id, { onDelete: 'cascade' }),
});

const status = pgTable('status', {
    id: serial('id').primaryKey(),
    display: varchar('display', { length: 256 }),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true }),
    color: text('color'),
});

const priority = pgTable('priority', {
    id: serial('id').primaryKey(),
    display: varchar('display', { length: 256 }),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true }),
    color: text('color'),
});

const task = pgTable('task', {
    id: serial('id').primaryKey(),
    title: text('title'),
    description: text('description'),
    minLength: integer('min_length'),
    maxLength: integer('max_length'),
    createdAt: timestamp('created_at', { withTimezone: true }),
    startDate: timestamp('start_date', { withTimezone: true }),
    dueDate: timestamp('due_date', { withTimezone: true }),
    color: text('color'),
    nodeId: integer('node_id').references(() => node.id, { onDelete: 'cascade' }),
    priorityId: integer('priority_id').references(() => priority.id, { onDelete: 'cascade' }),
    statusId: integer('status_id').references(() => status.id, { onDelete: 'cascade' }),
});

const criteria = pgTable('criteria', {
    id: serial('id').primaryKey(),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true }),
    taskId: integer('task_id').references(() => task.id, { onDelete: 'cascade' }),
});

const duration = pgTable('duration', {
    id: serial('id').primaryKey(),
    timeOnTask: integer('time_on_task'),
    startFrom: timestamp('start_from', { withTimezone: true }),
    endAt: timestamp('end_at', { withTimezone: true }),
    description: text('description'),
    taskId: integer('task_id').references(() => task.id),
});

const color = pgTable('color', {
    id: serial('id').primaryKey(),
    display: varchar('display', { length: 256 }),
    hex: varchar('hex', { length: 30 }),
    createdAt: timestamp('created_at', { withTimezone: true }),
});

const tracker = pgTable('tracker', {
    madeOnDate: timestamp('made_on_date', { withTimezone: true }),
    durationId: integer('duration_id').references(() => duration.id, { onDelete: 'cascade' }),
});

export { node, penalty, task, criteria, status, duration, priority, color, tracker };
