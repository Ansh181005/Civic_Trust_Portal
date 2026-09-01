import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  date,
  integer,
  numeric,
  unique,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(), // Clerk user ID is a string, not UUID
  fullName: text('full_name'),
  email: text('email'),
  phone: text('phone'),
  state: text('state'),
  category: text('category').default('General'),
  dateOfBirth: date('date_of_birth'),
  avatarUrl: text('avatar_url'),
  emailNotifications: boolean('email_notifications').default(true),
  scholarshipAlerts: boolean('scholarship_alerts').default(true),
  jobAlerts: boolean('job_alerts').default(true),
  role: text('role').default('user'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const rights = pgTable('rights', {
  id: uuid('id').defaultRandom().primaryKey(),
  category: text('category').notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  details: text('details').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const schemes = pgTable('schemes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  benefits: text('benefits').notNull(),
  eligibility: text('eligibility').notNull(),
  category: text('category').notNull(),
  beneficiary: text('beneficiary').notNull(),
  state: text('state').notNull(),
  howToApply: text('how_to_apply').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const scholarships = pgTable('scholarships', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  provider: text('provider').notNull(),
  benefits: text('benefits').notNull(),
  eligibility: text('eligibility').notNull(),
  category: text('category').notNull(),
  state: text('state').notNull(),
  deadline: text('deadline').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(), // 'job' or 'internship'
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  salary: text('salary').notNull(),
  jobType: text('job_type').notNull(),
  source: text('source').notNull(),
  snippet: text('snippet').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => profiles.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const savedOpportunities = pgTable(
  'saved_opportunities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),
    opportunityType: text('opportunity_type').notNull(),
    opportunityId: uuid('opportunity_id').notNull(),
    title: text('title').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (t) => [unique().on(t.userId, t.opportunityType, t.opportunityId)]
);

export const transparencyKpis = pgTable('transparency_kpis', {
  id: uuid('id').defaultRandom().primaryKey(),
  label: text('label').notNull(),
  value: text('value').notNull(),
  change: text('change').notNull(),
  iconName: text('icon_name').notNull(),
  sortOrder: integer('sort_order').default(0),
});

export const schemeProgress = pgTable('scheme_progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  schemeName: text('scheme_name').notNull(),
  target: numeric('target').notNull(),
  achieved: numeric('achieved').notNull(),
});

export const departmentScores = pgTable('department_scores', {
  id: uuid('id').defaultRandom().primaryKey(),
  department: text('department').notNull(),
  score: numeric('score').notNull(),
  trend: text('trend').notNull(),
  budgetShare: numeric('budget_share').notNull(),
});
