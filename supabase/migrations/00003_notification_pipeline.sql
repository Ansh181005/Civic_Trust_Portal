-- ============================================================
-- CIVIC TRUST PORTAL — Notification pipeline migration
-- Run this AFTER 00002_realtime_and_extras.sql
-- ============================================================

-- 1) Profile preference for scheme alerts
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS scheme_alerts BOOLEAN DEFAULT true;

-- 2) Opportunity metadata for robust timeline notifications
ALTER TABLE public.jobs
ADD COLUMN IF NOT EXISTS closes_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS apply_url TEXT;

ALTER TABLE public.scholarships
ADD COLUMN IF NOT EXISTS closes_at DATE,
ADD COLUMN IF NOT EXISTS apply_url TEXT;

ALTER TABLE public.schemes
ADD COLUMN IF NOT EXISTS opens_at DATE,
ADD COLUMN IF NOT EXISTS closes_at DATE,
ADD COLUMN IF NOT EXISTS apply_url TEXT;

-- 3) Extend notifications with dedupe + source metadata
ALTER TABLE public.notifications
ADD COLUMN IF NOT EXISTS event_type TEXT,
ADD COLUMN IF NOT EXISTS source_table TEXT,
ADD COLUMN IF NOT EXISTS source_id UUID,
ADD COLUMN IF NOT EXISTS dedupe_key TEXT,
ADD COLUMN IF NOT EXISTS delivery_channels TEXT[] DEFAULT ARRAY['in_app']::TEXT[],
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

CREATE UNIQUE INDEX IF NOT EXISTS idx_notifications_user_dedupe
  ON public.notifications(user_id, dedupe_key)
  WHERE dedupe_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_notifications_source
  ON public.notifications(source_table, source_id);

-- 4) Queue for new/updated opportunities (auto-catches new data integration)
CREATE TABLE IF NOT EXISTS public.notification_event_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_table TEXT NOT NULL CHECK (source_table IN ('jobs', 'scholarships', 'schemes')),
  source_id UUID NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'opportunity_new',
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_notification_event_queue_unprocessed
  ON public.notification_event_queue(processed_at, created_at);

-- 5) Delivery tracking to avoid duplicate emails
CREATE TABLE IF NOT EXISTS public.notification_dispatches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID NOT NULL REFERENCES public.notifications(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('email')),
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(notification_id, channel)
);

CREATE INDEX IF NOT EXISTS idx_notification_dispatches_status
  ON public.notification_dispatches(status, created_at);

-- 6) Trigger function to enqueue opportunities when new data is inserted
CREATE OR REPLACE FUNCTION public.enqueue_notification_event()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notification_event_queue (source_table, source_id, event_type, payload)
  VALUES (
    TG_TABLE_NAME,
    NEW.id,
    'opportunity_new',
    jsonb_build_object(
      'title', COALESCE(NEW.title, NEW.name),
      'created_at', NEW.created_at
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_jobs_enqueue_notification_event ON public.jobs;
CREATE TRIGGER trg_jobs_enqueue_notification_event
AFTER INSERT ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.enqueue_notification_event();

DROP TRIGGER IF EXISTS trg_scholarships_enqueue_notification_event ON public.scholarships;
CREATE TRIGGER trg_scholarships_enqueue_notification_event
AFTER INSERT ON public.scholarships
FOR EACH ROW
EXECUTE FUNCTION public.enqueue_notification_event();

DROP TRIGGER IF EXISTS trg_schemes_enqueue_notification_event ON public.schemes;
CREATE TRIGGER trg_schemes_enqueue_notification_event
AFTER INSERT ON public.schemes
FOR EACH ROW
EXECUTE FUNCTION public.enqueue_notification_event();
