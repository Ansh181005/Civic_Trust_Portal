-- ============================================================
-- CIVIC TRUST PORTAL — Full Database Schema
-- Run this in your Supabase SQL Editor (Settings > SQL Editor)
-- ============================================================

-- ============================================================
-- 1. PROFILES TABLE (linked to auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  state TEXT,
  category TEXT DEFAULT 'General',
  date_of_birth DATE,
  avatar_url TEXT,
  email_notifications BOOLEAN DEFAULT true,
  scholarship_alerts BOOLEAN DEFAULT true,
  job_alerts BOOLEAN DEFAULT true,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, state)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'state', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- 2. RIGHTS TABLE
-- ============================================================
CREATE TABLE public.rights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_rights_category ON public.rights(category);

ALTER TABLE public.rights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read rights"
  ON public.rights FOR SELECT
  USING (true);

-- ============================================================
-- 3. SCHEMES TABLE
-- ============================================================
CREATE TABLE public.schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  benefits TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  category TEXT NOT NULL,
  beneficiary TEXT NOT NULL,
  state TEXT NOT NULL,
  how_to_apply TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_schemes_category ON public.schemes(category);

ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read schemes"
  ON public.schemes FOR SELECT
  USING (true);

-- ============================================================
-- 4. SCHOLARSHIPS TABLE
-- ============================================================
CREATE TABLE public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  benefits TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  category TEXT NOT NULL,
  state TEXT NOT NULL,
  deadline TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_scholarships_category ON public.scholarships(category);

ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read scholarships"
  ON public.scholarships FOR SELECT
  USING (true);

-- ============================================================
-- 5. JOBS TABLE
-- ============================================================
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('job', 'internship')),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary TEXT NOT NULL,
  job_type TEXT NOT NULL,
  source TEXT NOT NULL,
  snippet TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_jobs_type ON public.jobs(type);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read jobs"
  ON public.jobs FOR SELECT
  USING (true);

-- ============================================================
-- 6. NOTIFICATIONS TABLE
-- ============================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 7. SAVED OPPORTUNITIES TABLE
-- ============================================================
CREATE TABLE public.saved_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  opportunity_type TEXT NOT NULL,
  opportunity_id UUID NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, opportunity_type, opportunity_id)
);

CREATE INDEX idx_saved_user_id ON public.saved_opportunities(user_id);

ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own saved"
  ON public.saved_opportunities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved"
  ON public.saved_opportunities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved"
  ON public.saved_opportunities FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- 8. TRANSPARENCY KPIs TABLE
-- ============================================================
CREATE TABLE public.transparency_kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

ALTER TABLE public.transparency_kpis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read kpis"
  ON public.transparency_kpis FOR SELECT
  USING (true);

-- ============================================================
-- 9. SCHEME PROGRESS TABLE
-- ============================================================
CREATE TABLE public.scheme_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_name TEXT NOT NULL,
  target NUMERIC NOT NULL,
  achieved NUMERIC NOT NULL
);

ALTER TABLE public.scheme_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read scheme_progress"
  ON public.scheme_progress FOR SELECT
  USING (true);

-- ============================================================
-- 10. DEPARTMENT SCORES TABLE
-- ============================================================
CREATE TABLE public.department_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department TEXT NOT NULL,
  score NUMERIC NOT NULL,
  trend TEXT NOT NULL,
  budget_share NUMERIC NOT NULL
);

ALTER TABLE public.department_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read department_scores"
  ON public.department_scores FOR SELECT
  USING (true);

-- ============================================================
-- 11. STORAGE BUCKET FOR AVATARS
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own avatars"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own avatars"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================
-- SEED DATA
-- ============================================================

-- Seed Rights
INSERT INTO public.rights (category, title, summary, details) VALUES
('student', 'Right to Education Act (RTE)', 'Free and compulsory education for children aged 6-14 years. Every child has the right to quality education.', 'The Right of Children to Free and Compulsory Education Act, 2009 provides that every child between the ages of 6 and 14 years has a right to free and compulsory education in a neighbourhood school till completion of elementary education. The Act mandates a 25% reservation in private schools for disadvantaged sections.'),
('student', 'Anti-Ragging Laws', 'Protection against ragging in educational institutions as per UGC regulations.', 'UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009, make ragging punishable. Students can file complaints online and institutions are mandated to have anti-ragging committees. Penalties include expulsion, suspension, and FIR registration.'),
('consumer', 'Consumer Protection Act 2019', 'Protection against unfair trade practices, defective goods, and deficient services.', 'The Consumer Protection Act, 2019 establishes Consumer Disputes Redressal Commissions at District, State, and National levels. It covers product liability, e-commerce transactions, and unfair contracts. Consumers can file complaints online through the e-Daakhil portal.'),
('consumer', 'Right to Refund', 'Consumers can seek refund for defective products or unsatisfactory services.', 'Under the Consumer Protection Act, consumers have the right to seek replacement, refund, or compensation for defective goods, deficiency in services, or goods hazardous to life and safety. E-commerce entities are also covered under this provision.'),
('cyber', 'IT Act 2000 - Data Privacy', 'Protection of personal data and punishment for unauthorized access to computer systems.', 'The Information Technology Act, 2000 provides legal recognition for electronic transactions and addresses cybercrimes. Section 43A mandates compensation for failure to protect data. Section 66 covers computer-related offences, and Section 72A covers disclosure of personal information in breach of lawful contract.'),
('cyber', 'Cyber Harassment Protection', 'Legal provisions against cyber bullying, stalking, and online harassment.', 'Section 354D of the IPC covers cyber stalking. Section 67 of the IT Act deals with publishing obscene material electronically. Section 66E covers violation of privacy through capturing and publishing private images. Victims can file FIR at local cyber crime cells.'),
('labour', 'Minimum Wages Act', 'Every worker is entitled to minimum wages as fixed by the government.', 'The Code on Wages, 2019 (replacing the Minimum Wages Act, 1948) ensures minimum wage protection for all employees. The floor wage is set by the Central Government. State governments can set higher rates. Employers violating these provisions face penalties including fines and imprisonment.'),
('labour', 'Employees'' Provident Fund', 'Mandatory retirement benefits and social security for organized sector workers.', 'The Employees'' Provident Funds and Miscellaneous Provisions Act, 1952 mandates that both employer and employee contribute 12% of basic salary. It covers establishments with 20+ employees. Withdrawal is allowed for housing, medical emergencies, and education. Early withdrawal attracts TDS.'),
('women', 'Protection of Women from Domestic Violence', 'Legal protection for women from any form of domestic violence.', 'The Protection of Women from Domestic Violence Act, 2005 provides protection against physical, sexual, verbal, emotional, and economic abuse. Women can seek protection orders, residence orders, and monetary relief. The Act covers wives, live-in partners, mothers, sisters, and widows.'),
('women', 'Sexual Harassment at Workplace', 'Protection against sexual harassment at workplace (POSH Act).', 'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 mandates every employer with 10+ employees to constitute an Internal Complaints Committee. It covers all women including contractual and temporary workers. Complaints must be filed within 3 months of the incident.');

-- Seed Schemes
INSERT INTO public.schemes (name, benefits, eligibility, category, beneficiary, state, how_to_apply) VALUES
('PM Kisan Samman Nidhi', 'INR 6,000/year direct income support to small and marginal farmers', 'Land-owning farmer families with cultivable land', 'Agriculture', 'Farmers', 'All India', 'Apply through the PM-KISAN portal (pmkisan.gov.in) or visit your nearest Common Service Centre. You will need Aadhaar, bank account details, and land ownership documents.'),
('Ayushman Bharat - PMJAY', 'Health coverage of INR 5 lakh/family/year for secondary and tertiary hospitalization', 'Families identified through SECC 2011 data, no family size or age limit', 'Health', 'BPL Families', 'All India', 'Visit the nearest Ayushman Bharat empaneled hospital or CSC. Check eligibility on mera.pmjay.gov.in with your Aadhaar or ration card number.'),
('PM Mudra Yojana', 'Loans up to INR 10 lakh for non-agricultural small businesses', 'Any Indian citizen with a business plan for non-farm sector', 'Finance', 'Entrepreneurs', 'All India', 'Apply at any bank, NBFC, or MFI. Submit your business plan, KYC documents, and proof of business. Three categories: Shishu (up to 50K), Kishore (50K-5L), Tarun (5L-10L).'),
('Beti Bachao Beti Padhao', 'Financial incentives for girl child education and prevention of gender-biased sex selection', 'Parents of girl children, focused on low CSR districts', 'Women & Children', 'Women', 'All India', 'Contact your local Anganwadi centre or district Women and Child Development office. Benefits are administered through Sukanya Samriddhi Account at post offices or banks.'),
('PMEGP - Employment Generation', 'Subsidy up to 35% for setting up new micro enterprises in manufacturing and services', 'Any individual above 18 years, minimum 8th pass for projects above INR 10 lakh', 'Employment', 'Youth', 'All India', 'Apply online at kviconline.gov.in. Submit project proposal through KVIC/KVIB/DIC. Bank processes loan after approval by task force committee.'),
('Maharashtra Rojgar Hami Yojana', '100 days guaranteed wage employment per household per year', 'Adult members of rural households willing to do unskilled manual work', 'Employment', 'Rural Workers', 'Maharashtra', 'Register at your local Gram Panchayat with a photograph. Submit a written application for work. Job card will be issued within 15 days.');

-- Seed Scholarships
INSERT INTO public.scholarships (title, provider, benefits, eligibility, category, state, deadline) VALUES
('National Merit Scholarship 2026', 'Ministry of Education', 'Up to INR 12,000/year for tuition and living expenses', 'Class 12 passed, 80%+ marks', 'Merit-based', 'All India', 'Mar 15, 2026'),
('Post-Matric Scholarship for SC Students', 'Ministry of Social Justice', 'Full tuition fee waiver + maintenance allowance', 'SC category, family income below INR 2.5 lakh', 'SC/ST', 'All India', 'Apr 30, 2026'),
('INSPIRE Scholarship for Higher Education', 'Department of Science & Technology', 'INR 80,000/year for 5 years', 'Top 1% in Class 12 board exams, pursuing BSc/BS/MS', 'Merit-based', 'All India', 'Open'),
('Central Sector Scheme of Scholarship', 'Ministry of Education', 'INR 10,000 - 20,000/year', 'Top 20th percentile in Class 12, family income below INR 8 lakh', 'Merit-based', 'All India', 'May 15, 2026'),
('Pragati Scholarship for Girls', 'AICTE', 'INR 50,000/year + tuition fee', 'Girl students in technical education, family income below INR 8 lakh', 'Women', 'All India', 'Jun 30, 2026'),
('Maharashtra State OBC Scholarship', 'Govt of Maharashtra', 'Full tuition + exam fees', 'OBC category domiciled in Maharashtra, income below INR 1 lakh', 'OBC', 'Maharashtra', 'Mar 31, 2026');

-- Seed Jobs
INSERT INTO public.jobs (type, title, company, location, salary, job_type, source, snippet) VALUES
('job', 'Data Analyst', 'Smart City Mission', 'New Delhi', 'INR 6-8 LPA', 'Full-time', 'Government Portal', 'Analyze urban data sets to drive smart city initiatives. Experience with Python and data visualization required.'),
('job', 'Software Engineer - NIC', 'National Informatics Centre', 'Hyderabad', 'INR 8-12 LPA', 'Full-time', 'NIC Careers', 'Build and maintain government digital infrastructure. Proficiency in Java, React, and cloud services preferred.'),
('job', 'District Project Manager', 'National Health Mission', 'Multiple States', 'INR 5-7 LPA', 'Contract', 'NHM Portal', 'Manage district-level health programs and coordinate with state health departments.'),
('job', 'Legal Officer', 'NITI Aayog', 'New Delhi', 'INR 10-15 LPA', 'Full-time', 'NITI Aayog', 'Provide legal counsel on policy matters, draft regulatory frameworks, and review government agreements.'),
('internship', 'Digital India Internship Program', 'MeitY', 'Remote', 'INR 10,000/month', 'Internship', 'Digital India', 'Work on digital governance projects including app development, data analytics, and citizen services.'),
('internship', 'Policy Research Intern', 'Ministry of Finance', 'New Delhi', 'INR 15,000/month', 'Internship', 'MOF Portal', 'Assist in policy research, draft briefings, and analyze economic data for budget planning.'),
('internship', 'Urban Planning Intern', 'Ministry of Housing', 'Pune', 'INR 12,000/month', 'Internship', 'MOHUA', 'Support urban development projects, conduct surveys, and help prepare smart city proposals.'),
('internship', 'Cybersecurity Trainee', 'CERT-In', 'Bangalore', 'INR 20,000/month', 'Internship', 'CERT-In', 'Assist in vulnerability assessments, incident response, and cybersecurity awareness programs.');

-- Seed Transparency KPIs
INSERT INTO public.transparency_kpis (label, value, change, icon_name, sort_order) VALUES
('Active Schemes', '127', '+5 this quarter', 'Landmark', 1),
('Total Beneficiaries', '4.2 Cr', '+12% YoY', 'Users', 2),
('Budget Utilized', 'INR 1.8L Cr', '78% of allocation', 'IndianRupee', 3),
('Completion Rate', '84.6%', '+3.2% this quarter', 'Activity', 4);

-- Seed Scheme Progress
INSERT INTO public.scheme_progress (scheme_name, target, achieved) VALUES
('PM Kisan', 140, 120),
('PMJAY', 100, 85),
('Mudra', 80, 72),
('PMEGP', 50, 38),
('BBPB', 60, 55);

-- Seed Department Scores
INSERT INTO public.department_scores (department, score, trend, budget_share) VALUES
('Education', 92, 'up', 32),
('Health', 87, 'up', 25),
('Agriculture', 81, 'stable', 20),
('Finance', 76, 'down', 15),
('Housing & Urban', 70, 'up', 8);
