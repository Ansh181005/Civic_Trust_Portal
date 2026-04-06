-- ============================================================
-- CIVIC TRUST PORTAL — Additional Migrations
-- Run this AFTER 00001_initial_schema.sql
-- ============================================================

-- ============================================================
-- 1. Enable Realtime for notifications table
-- This allows the client to subscribe to INSERT events
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ============================================================
-- 2. Enable Realtime for other tables that might need live updates
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.transparency_kpis;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scheme_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.department_scores;

-- ============================================================
-- 3. Add a welcome notification trigger
-- When a new profile is created, send a welcome notification
-- ============================================================
CREATE OR REPLACE FUNCTION public.send_welcome_notification()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message)
  VALUES (
    NEW.id,
    'success',
    'Welcome to Civic Trust Portal!',
    'Your account has been created successfully. Explore government schemes, scholarships, and job opportunities tailored for you.'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created_welcome
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.send_welcome_notification();

-- ============================================================
-- 4. Function to create a notification when deadline is near
-- (Can be called via Supabase Edge Function or pg_cron)
-- ============================================================
CREATE OR REPLACE FUNCTION public.create_deadline_notifications()
RETURNS void AS $$
DECLARE
  scholarship RECORD;
  user_record RECORD;
BEGIN
  -- Find scholarships with deadline within 7 days
  FOR scholarship IN
    SELECT id, title, deadline
    FROM public.scholarships
    WHERE deadline != 'Open'
    AND to_date(deadline, 'Mon DD, YYYY') BETWEEN CURRENT_DATE AND CURRENT_DATE + interval '7 days'
  LOOP
    -- Notify all users who have scholarship alerts enabled
    FOR user_record IN
      SELECT id FROM public.profiles WHERE scholarship_alerts = true
    LOOP
      INSERT INTO public.notifications (user_id, type, title, message)
      VALUES (
        user_record.id,
        'scholarship',
        'Scholarship Deadline Approaching',
        'The deadline for "' || scholarship.title || '" is ' || scholarship.deadline || '. Apply now!'
      )
      ON CONFLICT DO NOTHING;
    END LOOP;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 5. Add INSERT policy for profiles (needed for trigger)
-- ============================================================
CREATE POLICY "System can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- 6. Add INSERT policy for notifications (for triggers/system)
-- ============================================================
CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- 7. Add DELETE policy for notifications
-- ============================================================
CREATE POLICY "Users can delete own notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- 8. Full-text search indexes for better performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_jobs_title_search ON public.jobs USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_scholarships_title_search ON public.scholarships USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_schemes_name_search ON public.schemes USING gin(to_tsvector('english', name));

-- ============================================================
-- 9. Add index for saved_opportunities lookups
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_saved_opp_lookup 
  ON public.saved_opportunities(user_id, opportunity_type, opportunity_id);
