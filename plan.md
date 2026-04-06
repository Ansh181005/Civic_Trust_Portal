## Plan: On-Demand Jobs Refresh With DB Sync

Implement a server-side refresh endpoint that runs when the Jobs page opens, but only calls RapidAPI when cached data is older than 60 minutes. The endpoint will normalize and filter API payloads to match the jobs table schema, upsert into Supabase, and return status metadata. The Jobs UI will load existing DB data immediately, show refresh state, and then re-query jobs after refresh so users see updated listings without blocking the whole page.

**Steps**
1. Add DB support for apply links and refresh metadata.
2. Phase 1: Database groundwork.
3. Create a new migration to add public.jobs.url, public.jobs.external_job_id (TEXT UNIQUE), and refresh tracking table (public.jobs_sync_state with source, last_synced_at, last_status, last_error, fetched_count).
4. Add index(es) needed for refresh metadata lookup and keep existing jobs indexes intact.
5. Update generated types so jobs Row/Insert/Update include url and external_job_id, and jobs_sync_state types are available to API code.
6. Phase 2: Server refresh pipeline.
7. Create a server-only mapper utility that converts RapidAPI job records to DB rows, enforces required fields, truncates overly long text safely, normalizes type to job/internship, and drops malformed records. Depends on step 3.
8. Create a new API route for refresh trigger from Jobs page load. It should: check last_synced_at for source rapidapi_jobs; skip external call if within 60 minutes; fetch multiple queries from RapidAPI when stale; deduplicate by provider job id; upsert jobs by external_job_id; update jobs_sync_state with success/failure metadata; return payload with refreshed true/false, reason, counts, and synced_at. Depends on steps 3 and 7.
9. Ensure secure credentials usage: RAPIDAPI key and Supabase service-role writes must stay server-side only; no client direct writes.
10. Phase 3: Jobs page flow update.
11. Remove local JSON merge logic and switch Jobs page to DB-only listing flow.
12. On page mount: fetch current jobs immediately for fast paint; in parallel call refresh endpoint; if endpoint reports refreshed or recent cache, re-run getJobs so UI reflects newest DB rows. Parallel with search debounce logic cleanup.
13. Add visible refresh status in UI (loading indicator and last updated text) without blocking already-visible jobs. Depends on step 12.
14. Keep search and tab filtering behavior intact, but avoid duplicate filtering (prefer DB filtering in service + minimal client-side pass only when needed).
15. Phase 4: Hardening and cleanup.
16. Keep existing fetchJobs.js as optional manual/backfill tool but align its mapper with the new shared normalization logic or mark it deprecated to avoid drift.
17. Add basic request guardrails in refresh API (timeout, partial-query error handling, and clear error response for frontend toast/logging).
18. Scope exclusion: no background cron scheduler in this change; refresh remains page-triggered with 60-minute cache window.

**Relevant files**
- CIVIC/app/(dashboard)/jobs/page.tsx — replace local JSON merge flow with load + refresh trigger + status UI.
- CIVIC/services/jobs.service.ts — keep DB query interface and optionally add helper for refresh endpoint call from client.
- CIVIC/app/api/jobs/refresh/route.ts — new endpoint for stale-aware RapidAPI fetch and DB upsert.
- CIVIC/supabase/migrations/<new_migration>.sql — add jobs.url and jobs_sync_state table.
- CIVIC/types/database.ts — include schema updates for new column/table.
- CIVIC/fetchJobs.js — optional alignment/deprecation note to avoid mapping drift.

**Verification**
1. Open Jobs page with empty/old sync state: confirm initial DB render, refresh indicator, API refresh execution, DB upsert completion, and updated listings visible after reload query.
2. Re-open Jobs page within 60 minutes: confirm refresh endpoint returns cached/recent status and does not call RapidAPI.
3. Validate DB rows: jobs records contain only mapped columns (including url), type is limited to job/internship, and no malformed null-required rows are inserted.
4. Validate UX: search and tabs still work, empty-state still appears correctly, and loading state does not freeze page when jobs already exist.
5. Failure test: force RapidAPI error and verify frontend keeps showing existing jobs while exposing non-blocking refresh failure state.

**Decisions**
- Refresh strategy: stale-while-revalidate on page open with 60-minute staleness threshold.
- Schema decision: include apply URL in jobs table via migration.
- UX decision: show existing jobs first, then background refresh.
- Security decision: all external API calls and DB writes happen in server route using server credentials.

**Further Considerations**
1. Query breadth tradeoff: keep current 4 role-based queries or add configurable query list in env for easier tuning without code edits.
2. Volume management: optionally cap stored records per refresh cycle to control DB growth and improve query speed.
3. Data freshness indicator: show relative last synced time so users trust listing recency.