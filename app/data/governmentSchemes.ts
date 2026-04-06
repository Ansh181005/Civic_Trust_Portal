export interface GovernmentScheme {
  id: number
  name: string
  ministry: string
  category: string[]
  description: string
  benefit: string
  eligibility: string
  documents: string
  portal: string
  badge: string
  isNew: boolean
  applyLink: string
}

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: 1,
    name: "Pradhan Mantri Awas Yojana – Urban (PMAY-U)",
    ministry: "Ministry of Housing & Urban Affairs",
    category: ["Housing"],
    description:
      "Provides affordable housing to urban poor through interest subsidy on home loans and direct financial assistance for construction or purchase of houses.",
    benefit:
      "₹1.5 lakh – ₹2.67 lakh subsidy on home loans; EWS/LIG get ₹1.2 lakh–₹2.5 lakh grant",
    eligibility:
      "Urban households from EWS (income < ₹3 LPA), LIG (< ₹6 LPA), MIG-I (< ₹12 LPA), MIG-II (< ₹18 LPA) who don't own a pucca house",
    documents: "Aadhaar card, income proof, bank account, land documents",
    portal: "pmaymis.gov.in",
    badge: "Housing",
    isNew: false,
    applyLink: "https://pmaymis.gov.in/",
  },
  {
    id: 2,
    name: "Pradhan Mantri Awas Yojana – Gramin (PMAY-G)",
    ministry: "Ministry of Rural Development",
    category: ["Housing"],
    description:
      "Provides financial assistance to rural households living in kutcha or dilapidated houses to construct a pucca house with basic amenities.",
    benefit: "₹1.20 lakh (plain areas) / ₹1.30 lakh (hilly/NE states) per house",
    eligibility:
      "Rural households without pucca house — SC/ST, minorities, freed bonded laborers, widows, ex-servicemen (from SECC 2011 list)",
    documents: "Aadhaar, bank passbook, BPL card, caste certificate if applicable",
    portal: "pmayg.nic.in",
    badge: "Housing",
    isNew: false,
    applyLink: "https://pmayg.nic.in/",
  },
  {
    id: 3,
    name: "Ayushman Bharat – PM Jan Arogya Yojana (PM-JAY)",
    ministry: "Ministry of Health & Family Welfare",
    category: ["Healthcare"],
    description:
      "World's largest health insurance scheme providing cashless treatment at empanelled hospitals. Now extended to ALL senior citizens aged 70+ regardless of income.",
    benefit: "₹5 lakh/family/year for secondary & tertiary hospitalization at 27,000+ empanelled hospitals",
    eligibility:
      "Families from SECC database + all citizens aged 70 years and above (as of 2026 update)",
    documents: "Aadhaar card, ration card or SECC-listed family proof",
    portal: "pmjay.gov.in",
    badge: "Healthcare",
    isNew: true,
    applyLink: "https://pmjay.gov.in/",
  },
  {
    id: 4,
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    ministry: "Ministry of Women & Child Development",
    category: ["Healthcare", "Women & Girls"],
    description:
      "Maternity benefit program providing cash incentives to pregnant women and lactating mothers for their first living child to improve health and nutrition.",
    benefit:
      "₹5,000 in three instalments (₹1,000 + ₹2,000 + ₹2,000) for first child; ₹6,000 for second child if girl",
    eligibility:
      "Pregnant and lactating women aged 19+ for first/second live birth, excluding government employees",
    documents: "Aadhaar, MCP card, bank passbook, husband's Aadhaar",
    portal: "pmmvy.wcd.gov.in",
    badge: "Healthcare",
    isNew: false,
    applyLink: "https://pmmvy.wcd.gov.in/",
  },
  {
    id: 5,
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    ministry: "Ministry of Finance",
    category: ["Healthcare", "Social Security"],
    description:
      "Accidental death and disability insurance scheme available to all Indian bank account holders at an extremely low annual premium.",
    benefit: "₹2 lakh for accidental death or permanent disability; ₹1 lakh for partial disability",
    eligibility: "Indian citizens aged 18–70 with an active bank account and Aadhaar",
    documents: "Aadhaar card, active bank account",
    portal: "jansuraksha.gov.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://www.jansuraksha.gov.in/Forms-PMSBY.aspx",
  },
  {
    id: 6,
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    ministry: "Ministry of Finance",
    category: ["Healthcare", "Social Security"],
    description:
      "Life insurance scheme offering affordable term insurance renewed annually, accessible to all savings bank account holders.",
    benefit: "₹2 lakh life insurance cover for death due to any cause",
    eligibility: "Indian citizens aged 18–50 with an active bank or post office savings account",
    documents: "Aadhaar card, active bank/post office savings account",
    portal: "jansuraksha.gov.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx",
  },
  {
    id: 7,
    name: "Janani Suraksha Yojana (JSY)",
    ministry: "Ministry of Health & Family Welfare",
    category: ["Healthcare", "Women & Girls"],
    description:
      "Safe motherhood intervention to reduce maternal and infant mortality by promoting institutional delivery among poor pregnant women.",
    benefit: "₹600 (urban) to ₹1,400 (rural) cash assistance for institutional delivery",
    eligibility:
      "Pregnant women from BPL/SC/ST families, all pregnant women in low-performing states (Bihar, UP, MP, etc.)",
    documents: "Aadhaar card, BPL/caste certificate, JSY card from ANM",
    portal: "nhm.gov.in",
    badge: "Healthcare",
    isNew: false,
    applyLink:
      "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
  },
  {
    id: 8,
    name: "Mission Indradhanush 5.0 – Immunization",
    ministry: "Ministry of Health & Family Welfare",
    category: ["Healthcare"],
    description:
      "Intensified immunization mission to fully vaccinate children under 2 years and pregnant women who are left out or missed under routine immunization.",
    benefit:
      "Free vaccination for 12 vaccine-preventable diseases including Measles, Polio, DPT, BCG, Hepatitis B",
    eligibility:
      "Children aged 0–2 years and pregnant women, especially in high-risk unvaccinated groups",
    documents: "Birth certificate; no documents needed for immunization",
    portal: "nhm.gov.in",
    badge: "Healthcare",
    isNew: false,
    applyLink: "https://nhm.gov.in/",
  },
  {
    id: 9,
    name: "PM Kisan Samman Nidhi (PM-KISAN)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: ["Farmers"],
    description:
      "Direct income support to all landholding farmers to meet their agricultural and domestic financial needs, transferred directly to bank accounts.",
    benefit: "₹6,000/year in 3 equal instalments of ₹2,000 every 4 months via Direct Benefit Transfer",
    eligibility:
      "All landholder farmer families across India (excludes institutional landholders, former/current govt employees, income tax payers)",
    documents: "Aadhaar, land records (Khasra/Khatauni), bank account, mobile number",
    portal: "pmkisan.gov.in",
    badge: "Farmers",
    isNew: false,
    applyLink: "https://pmkisan.gov.in/",
  },
  {
    id: 10,
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: ["Farmers"],
    description:
      "Crop insurance scheme providing financial support to farmers suffering crop loss or damage due to unforeseen events like natural calamities, pests and diseases.",
    benefit:
      "Insurance coverage for crop losses; premium as low as 1.5% (Rabi), 2% (Kharif), 5% (commercial crops)",
    eligibility:
      "All farmers including sharecroppers and tenant farmers growing notified crops",
    documents: "Aadhaar, land records, bank account, sowing certificate",
    portal: "pmfby.gov.in",
    badge: "Farmers",
    isNew: false,
    applyLink: "https://pmfby.gov.in/",
  },
  {
    id: 11,
    name: "Kisan Credit Card (KCC) Scheme",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: ["Farmers", "Finance & Banking"],
    description:
      "Provides short-term credit to farmers for agricultural operations, post-harvest expenses, maintenance of farm assets and allied activities.",
    benefit:
      "Credit up to ₹3 lakh at 4% interest (with 3% government interest subvention); also covers animal husbandry and fisheries",
    eligibility:
      "All farmers, sharecroppers, tenant farmers, SHG/JLG groups in farming; also fishermen and animal husbandry farmers",
    documents: "Aadhaar, land records, bank KYC documents",
    portal: "pmkisan.gov.in",
    badge: "Farmers",
    isNew: true,
    applyLink: "https://pmkisan.gov.in/KccExt.aspx",
  },
  {
    id: 12,
    name: "PM Krishi Sinchayee Yojana (PMKSY)",
    ministry: "Ministry of Jal Shakti",
    category: ["Farmers"],
    description:
      "Ensures access to irrigation to every farm with the motto 'More Crop Per Drop' — focuses on micro-irrigation and water management at the field level.",
    benefit:
      "55% subsidy on drip/sprinkler irrigation systems for small/marginal farmers; 45% for others",
    eligibility:
      "All farmers with agricultural land; priority to small/marginal farmers and drought-prone areas",
    documents: "Land records, Aadhaar, bank account",
    portal: "pmksy.gov.in",
    badge: "Farmers",
    isNew: false,
    applyLink: "https://pmksy.gov.in/",
  },
  {
    id: 13,
    name: "Bharat-VISTAAR (AI Farm Advisory) 2026",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: ["Farmers", "Digital India"],
    description:
      "India's first AI-powered multilingual agricultural advisory platform launched February 2026. AI assistant 'Bharati' provides crop selection advice, mandi prices, and scheme eligibility checks.",
    benefit:
      "Free 24/7 AI advisory in multiple Indian languages; access to 10+ central scheme information; real-time mandi prices",
    eligibility: "All farmers across India — call 155261 or access via mobile app",
    documents: "No documents needed — just call 155261",
    portal: "agriwelfare.gov.in",
    badge: "Farmers",
    isNew: true,
    applyLink: "https://agriwelfare.gov.in/",
  },
  {
    id: 14,
    name: "Beti Bachao Beti Padhao (BBBP)",
    ministry: "Ministry of Women & Child Development",
    category: ["Women & Girls", "Education"],
    description:
      "Addresses declining Child Sex Ratio (CSR) and promotes welfare and education of the girl child through multi-sectoral intervention.",
    benefit:
      "Financial incentives for girl child education; awareness campaigns; community mobilization",
    eligibility: "All families with girl children in identified districts across India",
    documents: "Girl child's birth certificate, Aadhaar",
    portal: "wcddel.in",
    badge: "Women & Girls",
    isNew: false,
    applyLink: "https://wcd.nic.in/bbbp-schemes",
  },
  {
    id: 15,
    name: "Sukanya Samriddhi Yojana (SSY)",
    ministry: "Ministry of Finance",
    category: ["Women & Girls", "Finance & Banking"],
    description:
      "Small savings scheme for girl child to build a corpus for her education and marriage expenses with attractive interest rates and tax benefits.",
    benefit:
      "8.2% interest rate (2026); tax deduction under Section 80C; up to ₹1.5 lakh/year deposit",
    eligibility: "Parents/guardian of girl child below 10 years of age (max 2 girls per family)",
    documents: "Girl's birth certificate, parent Aadhaar & PAN, address proof",
    portal: "nsiindia.gov.in",
    badge: "Women & Girls",
    isNew: false,
    applyLink:
      "https://www.nsiindia.gov.in/(S(3ljhfu45cqifb555lbegmk55))/InternalPage.aspx?Id_Pk=89",
  },
  {
    id: 16,
    name: "Mission Shakti – Sambal & Samarthya",
    ministry: "Ministry of Women & Child Development",
    category: ["Women & Girls"],
    description:
      "Umbrella scheme for women's safety, security and empowerment with two sub-schemes: Sambal (safety) and Samarthya (empowerment).",
    benefit:
      "One-stop centres for violence survivors; shelters; legal aid; skill training; Pradhan Mantri Matru Vandana benefits",
    eligibility:
      "All women, especially those in distress, violence survivors, and marginalized women",
    documents: "Aadhaar; varies by sub-scheme",
    portal: "wcd.nic.in",
    badge: "Women & Girls",
    isNew: false,
    applyLink: "https://wcd.nic.in/mission-shakti",
  },
  {
    id: 17,
    name: "PM Vishwakarma Yojana",
    ministry: "Ministry of MSME",
    category: ["Women & Girls", "Business & MSME", "Employment & Skills"],
    description:
      "Comprehensive support scheme for artisans and craftsmen (Vishwakarmas) from 18 traditional trade families including weavers, goldsmiths, potters, cobblers.",
    benefit:
      "₹15,000 toolkit grant; skill training with ₹500/day stipend; collateral-free loans at 5% (₹1L + ₹2L); PM Vishwakarma certificate",
    eligibility:
      "Artisans and craftspeople in 18 traditional trades; self-employed; not a government employee or income taxpayer",
    documents: "Aadhaar, mobile number, bank account, caste certificate (if applicable)",
    portal: "pmvishwakarma.gov.in",
    badge: "Business & MSME",
    isNew: true,
    applyLink: "https://pmvishwakarma.gov.in/",
  },

  // The remainder of the schemes (18..80) are included exactly as provided in your prompt.
  // Keeping the dataset in a single file enables fast client-side search/filtering.

  {
    id: 18,
    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    ministry: "Ministry of Finance",
    category: ["Finance & Banking"],
    description:
      "National mission for financial inclusion ensuring access to banking, credit, insurance and pension for all Indian households — zero balance accounts available.",
    benefit:
      "Zero-balance savings account; RuPay debit card; ₹2 lakh accident insurance; ₹30,000 life cover; overdraft up to ₹10,000",
    eligibility: "Any Indian citizen aged 10+ without a bank account; also for those wanting a second account",
    documents: "Aadhaar card (primary), or any officially valid KYC document",
    portal: "pmjdy.gov.in",
    badge: "Finance & Banking",
    isNew: false,
    applyLink: "https://pmjdy.gov.in/scheme",
  },
  {
    id: 19,
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    ministry: "Ministry of Finance / MUDRA",
    category: ["Finance & Banking", "Business & MSME"],
    description:
      "Provides collateral-free micro-loans to non-corporate, non-farm small/micro enterprises to start or grow their business. Extended to ₹20 lakh in 2024.",
    benefit:
      "Shishu: up to ₹50,000 | Kishore: ₹50,001–₹5 lakh | Tarun: ₹5 lakh–₹20 lakh — all collateral-free",
    eligibility:
      "Any Indian citizen (non-farm income-generating activities): shopkeepers, artisans, vendors, small manufacturers, service providers",
    documents: "Aadhaar, PAN, business proof, address proof, bank statements",
    portal: "mudra.org.in",
    badge: "Finance & Banking",
    isNew: true,
    applyLink: "https://www.mudra.org.in/",
  },
  {
    id: 20,
    name: "Atal Pension Yojana (APY)",
    ministry: "Ministry of Finance / PFRDA",
    category: ["Finance & Banking", "Social Security"],
    description:
      "Guaranteed pension scheme for unorganized sector workers ensuring fixed monthly pension of ₹1,000–₹5,000 after age 60 based on contribution.",
    benefit:
      "Guaranteed monthly pension ₹1,000/₹2,000/₹3,000/₹4,000/₹5,000 after age 60; spouse and nominee benefits",
    eligibility:
      "Indian citizens aged 18–40, not an income taxpayer, with a savings bank account",
    documents: "Aadhaar, savings bank account, mobile number",
    portal: "npscra.nsdl.co.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://npscra.nsdl.co.in/scheme-details.php",
  },
  {
    id: 21,
    name: "Stand Up India Scheme",
    ministry: "Ministry of Finance / SIDBI",
    category: ["Finance & Banking", "Business & MSME", "Women & Girls"],
    description:
      "Facilitates bank loans between ₹10 lakh and ₹1 crore to SC/ST borrowers and women entrepreneurs for greenfield enterprises.",
    benefit:
      "Bank loan ₹10 lakh–₹1 crore for setting up greenfield enterprise (manufacturing/services/trading)",
    eligibility: "SC/ST borrowers and women entrepreneurs above 18 years; for greenfield (new) ventures only",
    documents: "Aadhaar, PAN, business plan, caste/gender proof, property documents",
    portal: "standupmitra.in",
    badge: "Finance & Banking",
    isNew: false,
    applyLink: "https://www.standupmitra.in/",
  },
  {
    id: 22,
    name: "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
    ministry: "Ministry of Housing & Urban Affairs",
    category: ["Finance & Banking", "Business & MSME"],
    description:
      "Provides affordable collateral-free working capital loans to street vendors to restart their livelihoods affected by COVID-19 with credit graduation pathway.",
    benefit:
      "₹10,000 (1st loan) → ₹20,000 (2nd) → ₹50,000 (3rd) — collateral-free at 7% interest with 7% cashback on digital payments",
    eligibility:
      "Urban street vendors with vending certificate or letter of recommendation from ULB",
    documents: "Aadhaar, vending certificate/ID proof, bank account",
    portal: "pmsvanidhi.mohua.gov.in",
    badge: "Business & MSME",
    isNew: false,
    applyLink: "https://pmsvanidhi.mohua.gov.in/",
  },

  {
    id: 23,
    name: "Samagra Shiksha Abhiyan",
    ministry: "Ministry of Education",
    category: ["Education"],
    description:
      "Integrated scheme for school education from pre-primary to senior secondary level with focus on equity, quality and universal access.",
    benefit:
      "Free textbooks, uniforms, midday meal; RTE implementation; digital classrooms; teacher training",
    eligibility:
      "All children aged 6–18 years; special focus on girls, SC/ST, differently-abled, minorities and urban deprived children",
    documents: "Birth certificate, residence proof, caste certificate if applicable",
    portal: "samagra.education.gov.in",
    badge: "Education",
    isNew: false,
    applyLink: "https://samagra.education.gov.in/",
  },
  {
    id: 24,
    name: "PM POSHAN (Mid-Day Meal Scheme)",
    ministry: "Ministry of Education",
    category: ["Education"],
    description:
      "Hot cooked nutritious meal provided to all children enrolled in government and aided schools from Class 1–8 to improve enrollment, retention and nutrition.",
    benefit:
      "Free nutritious daily meal with specific calorie/protein requirements; ₹8.17–₹12.45 per child per day",
    eligibility:
      "All students enrolled in Government, Government-aided, Local Body Schools, Classes 1 to 8",
    documents: "School enrollment proof; no separate application needed",
    portal: "pmposhan.education.gov.in",
    badge: "Education",
    isNew: false,
    applyLink: "https://pmposhan.education.gov.in/",
  },
  {
    id: 25,
    name: "Skill India Mission (PMKVY 4.0)",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    category: ["Employment & Skills", "Education"],
    description:
      "Pradhan Mantri Kaushal Vikas Yojana 4.0 — provides free industry-relevant skill training to youth with placement support and certification.",
    benefit:
      "Free skill training (200+ courses); ₹500/day stipend during training; govt-recognized certificate; placement assistance",
    eligibility:
      "Indian citizens aged 15–45 who are school/college dropouts or unemployed youth",
    documents: "Aadhaar, age proof (10th marksheet), bank account",
    portal: "skillindiadigital.gov.in",
    badge: "Employment & Skills",
    isNew: true,
    applyLink: "https://www.skillindiadigital.gov.in/",
  },
  {
    id: 26,
    name: "National Apprenticeship Promotion Scheme (NAPS)",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    category: ["Employment & Skills", "Education"],
    description:
      "Promotes apprenticeship training in India by sharing 25% of stipend with employers to incentivize companies to take more apprentices.",
    benefit:
      "Apprentices get ₹1,500–₹9,000/month stipend (25% paid by govt); industry training + certification",
    eligibility:
      "Youth aged 14–21 (up to 24 for reserved categories) who have passed Class 5 or higher",
    documents: "Aadhaar, educational certificates, bank account",
    portal: "apprenticeshipindia.gov.in",
    badge: "Employment & Skills",
    isNew: false,
    applyLink: "https://www.apprenticeshipindia.gov.in/",
  },
  {
    id: 27,
    name: "PM Viksit Bharat Rozgar Yojana 2024–26",
    ministry: "Ministry of Labour & Employment",
    category: ["Employment & Skills"],
    description:
      "Employment-linked incentive scheme providing PF contribution support to employers and employees to boost formal employment among first-time workers.",
    benefit:
      "Scheme A: 1 month EPFO wage to first-timers (up to ₹15,000). Scheme B: Employer incentive for hiring. Scheme C: Manufacturing sector incentive",
    eligibility:
      "First-time EPFO-registered employees with salary < ₹1 lakh/month; employers adding new headcount",
    documents: "Aadhaar, EPFO registration, bank account",
    portal: "labour.gov.in",
    badge: "Employment & Skills",
    isNew: true,
    applyLink: "https://www.labour.gov.in/",
  },
  {
    id: 28,
    name: "Mahatma Gandhi NREGA (MGNREGS)",
    ministry: "Ministry of Rural Development",
    category: ["Employment & Skills", "Farmers"],
    description:
      "Guarantees 100 days of unskilled manual work per financial year to adult members of rural households demanding employment.",
    benefit:
      "₹237–₹357/day wage (state-wise) for 100 days/year; work within 5 km of residence; compensation for delay in payment",
    eligibility:
      "Adult members (18+) of rural households willing to do unskilled manual work; apply at local Gram Panchayat",
    documents: "Job Card (free from Gram Panchayat), Aadhaar, bank account",
    portal: "nrega.nic.in",
    badge: "Employment & Skills",
    isNew: false,
    applyLink: "https://nrega.nic.in/MGNREGA_new/Nrega_home.aspx",
  },
  {
    id: 29,
    name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    ministry: "Ministry of Rural Development",
    category: ["Employment & Skills"],
    description:
      "Skill training and placement program for rural poor youth aimed at adding diversity to their income and improving rural livelihoods.",
    benefit:
      "Free residential skill training (576–2,304 hours); free food/accommodation; post-placement support; ₹1,500/month stipend",
    eligibility:
      "Rural youth aged 15–35 from poor families (SECC 2011); SC/ST/minorities/women/PWD up to age 45",
    documents: "Aadhaar, SECC family proof or BPL card, age proof",
    portal: "ddugky.gov.in",
    badge: "Employment & Skills",
    isNew: false,
    applyLink: "https://ddugky.gov.in/",
  },
  {
    id: 30,
    name: "Startup India Seed Fund Scheme",
    ministry: "Ministry of Commerce & Industry / DPIIT",
    category: ["Business & MSME", "Employment & Skills"],
    description:
      "Provides financial assistance to startups at early stages for proof of concept, prototype development, product trials, market entry and commercialization.",
    benefit:
      "Up to ₹20 lakh for validation/prototype; up to ₹50 lakh as investment for commercialization; via selected incubators",
    eligibility:
      "DPIIT-recognized startups less than 2 years old; not received ₹10L+ funding; incorporated after 01/04/2016",
    documents: "DPIIT recognition, incorporation certificate, bank account, pitch deck",
    portal: "startupindia.gov.in",
    badge: "Business & MSME",
    isNew: false,
    applyLink: "https://seedfund.startupindia.gov.in/",
  },

  {
    id: 31,
    name: "PM Surya Ghar Muft Bijli Yojana",
    ministry: "Ministry of New & Renewable Energy",
    category: ["Digital India", "Environment & Energy"],
    description:
      "Scheme to install rooftop solar panels on 1 crore households and provide up to 300 units of free electricity every month.",
    benefit:
      "Up to 300 units FREE electricity/month; 40% subsidy on solar panel installation; reduced electricity bills",
    eligibility:
      "Household consumers; valid electricity connection; own or rented house with rooftop; income < ₹1.5 LPA preferred",
    documents: "Aadhaar, electricity bill, bank account, property documents",
    portal: "pmsuryaghar.gov.in",
    badge: "Environment & Energy",
    isNew: true,
    applyLink: "https://pmsuryaghar.gov.in/",
  },
  {
    id: 32,
    name: "Digital India – Free Skill Courses",
    ministry: "Ministry of Electronics & IT",
    category: ["Digital India", "Education"],
    description:
      "Government-recognized free online certificate courses on Digital India portal covering coding, AI/ML, data science, cybersecurity, and digital literacy.",
    benefit:
      "Free courses with govt-recognized certificates; 700+ courses on SkillBuild, PMGDISHA, iGOT platforms",
    eligibility: "All Indian citizens — students, job seekers, professionals, homemakers, senior citizens",
    documents: "Aadhaar/mobile number for registration only",
    portal: "digitalindia.gov.in",
    badge: "Digital India",
    isNew: true,
    applyLink: "https://www.digitalindia.gov.in/",
  },
  {
    id: 33,
    name: "Common Services Centre (CSC) – Digital Seva",
    ministry: "Ministry of Electronics & IT",
    category: ["Digital India", "Business & MSME"],
    description:
      "Network of over 5 lakh digital service centers offering government services, banking, insurance, and e-services to rural citizens. Also a self-employment opportunity.",
    benefit:
      "Access to 400+ govt services; VLEs earn ₹10,000–₹50,000/month by operating a CSC",
    eligibility: "Any Indian with Class 10 qualification to become VLE; ALL rural citizens to access services",
    documents: "Aadhaar, Class 10 certificate, own shop/space (to become VLE)",
    portal: "csc.gov.in",
    badge: "Digital India",
    isNew: false,
    applyLink: "https://register.csc.gov.in/",
  },
  {
    id: 34,
    name: "PM Wani – Free Public WiFi Scheme",
    ministry: "Ministry of Communications",
    category: ["Digital India"],
    description:
      "PM WiFi Access Network Interface (WANI) scheme to provide affordable/free broadband connectivity through small shops and kiosks acting as public data offices.",
    benefit:
      "Free/affordable high-speed public WiFi in local areas; income opportunity for PDO operators",
    eligibility: "All citizens to access; any person/shop to become a PDO (no license fee required)",
    documents: "PDO registration via DPIIT-registered PDOA apps",
    portal: "dot.gov.in",
    badge: "Digital India",
    isNew: false,
    applyLink: "https://dot.gov.in/spectrum-management/pm-wani",
  },
  {
    id: 35,
    name: "Pradhan Mantri Ujjwala Yojana (PMUY) 2.0",
    ministry: "Ministry of Petroleum & Natural Gas",
    category: ["Environment & Energy", "Women & Girls"],
    description:
      "Provides free LPG connections to women from poor households to replace polluting cooking fuels like wood, coal and dung, improving health and environment.",
    benefit: "Free LPG cylinder connection with stove and first refill free; subsidized refills",
    eligibility:
      "Women above 18 years from SECC 2011 listed poor households / BPL families; no existing LPG connection",
    documents: "Aadhaar, ration card/BPL card, bank account, address proof",
    portal: "pmuy.gov.in",
    badge: "Environment & Energy",
    isNew: false,
    applyLink: "https://www.pmuy.gov.in/",
  },
  {
    id: 36,
    name: "PM KUSUM Scheme (Solar for Farmers)",
    ministry: "Ministry of New & Renewable Energy",
    category: ["Environment & Energy", "Farmers"],
    description:
      "Provides solar pumps and grid-connected solar power plants to farmers to reduce diesel dependence and increase income through surplus energy sale.",
    benefit: "60% subsidy on solar pump installation; farmers sell extra power to grid at ₹3.07/unit",
    eligibility:
      "All farmers with agricultural land; preference to drought-prone and grid-less areas",
    documents: "Land records, Aadhaar, bank account, electricity connection proof",
    portal: "mnre.gov.in",
    badge: "Environment & Energy",
    isNew: false,
    applyLink: "https://mnre.gov.in/solar/schemes/",
  },
  {
    id: 37,
    name: "National Mission for Clean Ganga (NMCG)",
    ministry: "Ministry of Jal Shakti",
    category: ["Environment & Energy"],
    description:
      "Flagship mission to rejuvenate and clean the Ganga river through pollution control, watershed management, and rural sanitation along Ganga banks.",
    benefit:
      "Community benefits: clean water, improved sanitation, livelihood programs for Ganga-belt communities",
    eligibility:
      "Citizens/communities/NGOs in Ganga basin states (UP, Bihar, Jharkhand, West Bengal, Uttarakhand)",
    documents: "Varies by intervention; NGOs need registration documents",
    portal: "nmcg.nic.in",
    badge: "Environment & Energy",
    isNew: false,
    applyLink: "https://nmcg.nic.in/",
  },
  {
    id: 38,
    name: "National Social Assistance Programme (NSAP)",
    ministry: "Ministry of Rural Development",
    category: ["Social Security"],
    description:
      "Provides social pension and assistance to elderly, widows, disabled persons, and BPL families on death of primary breadwinner.",
    benefit:
      "₹300–₹500/month pension for elderly; ₹200–₹500 for widows; ₹300 for disabled; ₹20,000 on death of BPL breadwinner",
    eligibility:
      "BPL elderly (60+), BPL widows (40+), BPL disabled (18+); varies by component",
    documents: "BPL card/SECC proof, age proof, bank account, Aadhaar",
    portal: "nsap.nic.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://nsap.nic.in/",
  },
  {
    id: 39,
    name: "Antyodaya Anna Yojana (AAY) / NFSA Ration",
    ministry: "Ministry of Food & Public Distribution",
    category: ["Social Security"],
    description:
      "Provides heavily subsidized food grains to the poorest of the poor households and other BPL/priority households under the National Food Security Act.",
    benefit:
      "5 kg food grain/person/month at ₹0–₹3/kg (now largely free under PMGKAY extended to Dec 2028)",
    eligibility: "NFSA beneficiaries with valid ration card; AAY cardholders (poorest families)",
    documents: "Ration card, Aadhaar seeding with ration card",
    portal: "nfsa.gov.in",
    badge: "Social Security",
    isNew: true,
    applyLink: "https://nfsa.gov.in/",
  },
  {
    id: 40,
    name: "Pradhan Mantri Vaya Vandana Yojana (PMVVY)",
    ministry: "Ministry of Finance / LIC",
    category: ["Social Security", "Finance & Banking"],
    description:
      "Pension scheme for senior citizens providing assured return and regular pension income for 10 years backed by government guarantee.",
    benefit:
      "Assured 7.4% return; monthly/quarterly/annual pension option; maximum ₹15 lakh investment per senior",
    eligibility: "Senior citizens aged 60 years and above; NRI not eligible",
    documents: "Aadhaar, PAN, age proof, bank account",
    portal: "licindia.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://www.licindia.in/Products/Pension-Plans/Pradhan-Mantri-Vaya-Vandana-Yojana",
  },
  {
    id: 41,
    name: "Swachh Bharat Mission – Urban 2.0 (SBM-U 2.0)",
    ministry: "Ministry of Housing & Urban Affairs",
    category: ["Housing", "Environment & Energy"],
    description:
      "Aims to make cities garbage-free by constructing household/community toilets, solid waste management, and wastewater treatment in all urban areas.",
    benefit:
      "Free/subsidized household toilet construction; free community toilets; segregated waste collection",
    eligibility: "Urban households without toilets; priority to EWS/slum households",
    documents: "Aadhaar, residence proof, property documents",
    portal: "swachhbharaturban.gov.in",
    badge: "Housing",
    isNew: false,
    applyLink: "https://swachhbharaturban.gov.in/",
  },
  {
    id: 42,
    name: "Jal Jeevan Mission (Har Ghar Jal)",
    ministry: "Ministry of Jal Shakti",
    category: ["Housing", "Environment & Energy"],
    description:
      "Provides functional household tap water connections to every rural household at the rate of 55 litres per person per day through a village-level approach.",
    benefit: "Free household tap connection; safe drinking water at home; water quality testing support",
    eligibility: "All rural households in India without existing tap water connection",
    documents: "Aadhaar, residence proof; applied through Gram Panchayat",
    portal: "jaljeevanmission.gov.in",
    badge: "Housing",
    isNew: false,
    applyLink: "https://jaljeevanmission.gov.in/",
  },
  {
    id: 43,
    name: "PM Formalisation of Micro Food Processing (PMFME)",
    ministry: "Ministry of Food Processing Industries",
    category: ["Business & MSME", "Farmers"],
    description:
      "Enhances competitiveness of existing micro food processing enterprises by providing financial, technical, and business support.",
    benefit:
      "35% credit-linked subsidy up to ₹10 lakh; common infrastructure support; branding/marketing support",
    eligibility:
      "Individual micro food processing units, SHGs, FPOs, cooperatives in unorganized food sector",
    documents: "Aadhaar, business proof, bank account, project report",
    portal: "pmfme.mofpi.gov.in",
    badge: "Business & MSME",
    isNew: false,
    applyLink: "https://pmfme.mofpi.gov.in/",
  },
  {
    id: 44,
    name: "Udyam Registration (MSME Registration)",
    ministry: "Ministry of MSME",
    category: ["Business & MSME"],
    description:
      "Free online registration for Micro, Small and Medium Enterprises to avail government benefits, subsidies, priority lending and protection under MSME Act.",
    benefit:
      "Access to govt tenders; lower interest rates; protection against delayed payments; priority in NSIC schemes; collateral-free loans",
    eligibility:
      "Any enterprise with investment: Micro (<₹1 cr), Small (₹1–10 cr), Medium (₹10–50 cr) in plant/machinery",
    documents: "Aadhaar, PAN, GSTIN (optional), bank account",
    portal: "udyamregistration.gov.in",
    badge: "Business & MSME",
    isNew: false,
    applyLink: "https://udyamregistration.gov.in/",
  },
  {
    id: 45,
    name: "PM Gati Shakti National Master Plan",
    ministry: "Ministry of Commerce & Industry",
    category: ["Business & MSME", "Digital India"],
    description:
      "₹100 lakh crore infrastructure master plan integrating 16 ministries for holistic infrastructure planning reducing logistics cost for businesses.",
    benefit:
      "Lower logistics costs for businesses; faster project approvals; integrated infrastructure development; GIS-based planning portal",
    eligibility:
      "Businesses, investors, state governments applying for infrastructure clearances",
    documents: "Business registration, project proposal",
    portal: "pib.gov.in",
    badge: "Business & MSME",
    isNew: false,
    applyLink: "https://www.india.gov.in/spotlight/pm-gati-shakti-national-master-plan",
  },
  {
    id: 46,
    name: "Production Linked Incentive (PLI) Scheme",
    ministry: "Ministry of Commerce & Industry / DPIIT",
    category: ["Business & MSME"],
    description:
      "Incentivizes domestic manufacturing across 14 key sectors to boost India's manufacturing output and reduce import dependence.",
    benefit:
      "4–20% incentive on incremental sales for 4–6 years; covers electronics, pharma, textiles, auto, food, solar, etc.",
    eligibility:
      "Companies in 14 identified sectors meeting minimum investment/turnover thresholds (varies by sector)",
    documents:
      "Company incorporation, GST, sector-specific application via respective ministry portal",
    portal: "plibharatmake.gov.in",
    badge: "Business & MSME",
    isNew: true,
    applyLink: "https://plibharatmake.gov.in/",
  },
  {
    id: 47,
    name: "PM Garib Kalyan Ann Yojana (PMGKAY) – Extended 2028",
    ministry: "Ministry of Food & Public Distribution",
    category: ["Social Security"],
    description:
      "Free food grain scheme providing 5 kg grains per person per month to 81.35 crore beneficiaries. Extended by Government till December 2028.",
    benefit:
      "5 kg free wheat/rice per person per month for NFSA beneficiaries — extended till December 2028",
    eligibility: "All National Food Security Act beneficiaries with valid ration card",
    documents: "Valid ration card, Aadhaar linked to ration card",
    portal: "dfpd.gov.in",
    badge: "Social Security",
    isNew: true,
    applyLink: "https://dfpd.gov.in/",
  },
  {
    id: 48,
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY) – Tourism 2026",
    ministry: "Ministry of Skill Development",
    category: ["Employment & Skills", "Digital India"],
    description:
      "Specialized skill certification program in tourism, hospitality, wellness and heritage sectors launched 2026 targeting 50,000 youth.",
    benefit:
      "Free certification in 30+ tourism/hospitality jobs; ₹8,000 post-placement incentive; placement in Incredible India network",
    eligibility: "Youth aged 15–35; no prior qualification needed for most courses",
    documents: "Aadhaar, bank account",
    portal: "skillindiadigital.gov.in",
    badge: "Employment & Skills",
    isNew: true,
    applyLink: "https://www.skillindiadigital.gov.in/courses",
  },
  {
    id: 49,
    name: "NPS Vatsalya Scheme",
    ministry: "Ministry of Finance / PFRDA",
    category: ["Finance & Banking", "Education"],
    description:
      "Pension savings scheme for minors allowing parents to open NPS accounts for children to build a retirement corpus from childhood.",
    benefit:
      "Market-linked long-term pension corpus; seamless transition to regular NPS at 18; tax benefits for parent",
    eligibility:
      "Minors (below 18) — parents/guardians open on their behalf; any Indian minor",
    documents: "Child's birth certificate, parent Aadhaar/PAN, bank account",
    portal: "npscra.nsdl.co.in",
    badge: "Finance & Banking",
    isNew: true,
    applyLink: "https://npscra.nsdl.co.in/nps-vatsalya.php",
  },
  {
    id: 50,
    name: "Bhartiya Janaushadhi Pariyojana (PMBJP)",
    ministry: "Ministry of Chemicals & Fertilizers",
    category: ["Healthcare"],
    description:
      "Makes quality generic medicines available at affordable prices through Jan Aushadhi Kendras — same efficacy as branded medicines at 50–90% lower cost.",
    benefit:
      "Generic medicines at 50–90% lower price; 1,700+ medicines and 300+ surgical items; 10,000+ kendras across India",
    eligibility:
      "All Indian citizens; buy at any Jan Aushadhi Kendra (Pradhan Mantri Bhartiya Janaushadhi Kendra)",
    documents: "No application needed — walk in to any kendra with prescription",
    portal: "janaushadhi.gov.in",
    badge: "Healthcare",
    isNew: false,
    applyLink: "https://janaushadhi.gov.in/",
  },
  {
    id: 51,
    name: "Startup India Initiative 2026",
    ministry: "Ministry of Commerce & Industry / DPIIT",
    category: ["Business & MSME", "Employment & Skills"],
    description:
      "Flagship initiative to build a strong startup ecosystem with simplified regulations, tax benefits, funding support and a massive action plan.",
    benefit:
      "Tax exemption for 3 years; patent fee waiver; self-certification; ₹10,000 crore Fund of Funds; free legal assistance",
    eligibility:
      "Entities incorporated < 10 years; annual turnover < ₹100 crore; working on innovation/technology",
    documents: "DPIIT recognition (online), incorporation certificate, innovation description",
    portal: "startupindia.gov.in",
    badge: "Business & MSME",
    isNew: false,
    applyLink:
      "https://www.startupindia.gov.in/content/sih/en/recognition-application.html",
  },
  {
    id: 52,
    name: "PM Internship Scheme 2026",
    ministry: "Ministry of Corporate Affairs",
    category: ["Employment & Skills", "Education"],
    description:
      "New 2026 scheme providing 1 crore internships to youth in top 500 Indian companies with ₹5,000/month stipend and ₹6,000 one-time grant.",
    benefit:
      "₹5,000/month stipend (₹4,500 from govt + ₹500 from company) + ₹6,000 one-time joining grant; 12-month real work experience",
    eligibility:
      "Youth aged 21–24; passed Class 10; not in full-time employment/education; annual family income < ₹8 LPA",
    documents: "Aadhaar, educational certificates, bank account, income certificate",
    portal: "pminternship.mca.gov.in",
    badge: "Employment & Skills",
    isNew: true,
    applyLink: "https://pminternship.mca.gov.in/",
  },
  {
    id: 53,
    name: "Pradhan Mantri Jan Arogya Yojana – Ayushman Vay Vandana Card",
    ministry: "Ministry of Health & Family Welfare",
    category: ["Healthcare", "Social Security"],
    description:
      "Special Ayushman card for ALL senior citizens aged 70+ for free cashless treatment up to ₹5 lakh/year regardless of income — launched 2026.",
    benefit:
      "₹5 lakh/year free hospitalization at empanelled hospitals; top-up over family PM-JAY card",
    eligibility: "ALL Indian citizens aged 70 years and above — NO income criteria",
    documents: "Aadhaar, age proof (any ID showing DOB)",
    portal: "beneficiary.nha.gov.in",
    badge: "Healthcare",
    isNew: true,
    applyLink: "https://beneficiary.nha.gov.in/",
  },
  {
    id: 54,
    name: "PMEGP – PM Employment Generation Programme",
    ministry: "Ministry of MSME / KVIC",
    category: ["Business & MSME", "Employment & Skills"],
    description:
      "Credit-linked subsidy program for generating self-employment opportunities through micro-enterprises in non-farm sectors.",
    benefit:
      "25–35% subsidy (margin money) on project cost up to ₹50 lakh (manufacturing) and ₹20 lakh (services); bank loan for balance",
    eligibility:
      "Any Indian aged 18+ with Class 8 pass for projects > ₹10 lakh; SHGs, trusts, charitable institutions also eligible",
    documents: "Aadhaar, educational certificate, project report, bank account, caste certificate",
    portal: "kviconline.gov.in",
    badge: "Business & MSME",
    isNew: false,
    applyLink: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
  },
  {
    id: 55,
    name: "e-SHRAM Portal – Unorganized Worker Registration",
    ministry: "Ministry of Labour & Employment",
    category: ["Social Security", "Employment & Skills"],
    description:
      "National database of unorganized workers providing social security benefits and DBT of welfare funds. Registration gives e-SHRAM card for access to all schemes.",
    benefit:
      "e-SHRAM card; ₹2 lakh accident insurance; priority in all social security schemes; ₹1,000 support during COVID/natural disasters",
    eligibility: "All unorganized workers aged 16–59: construction, domestic, street vendors, farmers, gig workers etc.",
    documents: "Aadhaar linked with mobile, bank account",
    portal: "eshram.gov.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://eshram.gov.in/",
  },
  {
    id: 56,
    name: "Deendayal Antyodaya Yojana – DAY-NRLM (SHG)",
    ministry: "Ministry of Rural Development",
    category: ["Women & Girls", "Business & MSME", "Finance & Banking"],
    description:
      "Mobilizes rural poor into Self Help Groups (SHGs) to improve livelihoods through financial inclusion, skill development and market linkages.",
    benefit:
      "Interest subvention (7% loans for SHGs, 3% for prompt repayers); seed capital ₹10,000–₹15,000; revolving fund ₹10,000–₹15,000",
    eligibility:
      "Rural poor women (priority) for SHG membership; households with annual income < ₹1.5 lakh",
    documents: "Aadhaar, bank account, SHG group formation documents",
    portal: "aajeevika.gov.in",
    badge: "Women & Girls",
    isNew: false,
    applyLink: "https://aajeevika.gov.in/",
  },
  {
    id: 57,
    name: "PM SHRI Schools (PM Schools for Rising India)",
    ministry: "Ministry of Education",
    category: ["Education"],
    description:
      "Develops 14,500+ schools as exemplar institutions showcasing National Education Policy 2020 implementation with smart classrooms and modern infrastructure.",
    benefit:
      "Students get: smart classrooms, digital libraries, labs, vocational training, sports facilities — all free",
    eligibility: "Students enrolled in selected PM SHRI government schools across India",
    documents: "Normal school enrollment; no separate application",
    portal: "pmshrischools.education.gov.in",
    badge: "Education",
    isNew: true,
    applyLink: "https://pmshrischools.education.gov.in/",
  },
  {
    id: 58,
    name: "One Nation One Ration Card (ONORC)",
    ministry: "Ministry of Food & Public Distribution",
    category: ["Social Security"],
    description:
      "Allows NFSA beneficiaries to claim subsidized food grains from any Fair Price Shop in India using their existing ration card — portability across states.",
    benefit:
      "Claim food grain entitlement from any FPS anywhere in India; useful for migrant workers",
    eligibility:
      "All NFSA ration cardholders across India; especially migrant workers",
    documents: "Existing ration card with Aadhaar seeding",
    portal: "impds.nic.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://impds.nic.in/portal/",
  },
  {
    id: 59,
    name: "Gold Monetization Scheme (GMS)",
    ministry: "Ministry of Finance",
    category: ["Finance & Banking"],
    description:
      "Allows households to deposit idle gold with banks and earn interest on it while the gold is used productively by the government and jewellers.",
    benefit:
      "2.25–2.50% interest on gold deposits; no capital gains or wealth tax on interest; keeps gold safe",
    eligibility: "Any resident Indian individual, HUF, trust, MF, ETF, company with physical gold",
    documents: "Aadhaar, PAN, KYC documents, gold assay certificate from BIS-certified centre",
    portal: "rbi.org.in",
    badge: "Finance & Banking",
    isNew: false,
    applyLink: "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=108",
  },
  {
    id: 60,
    name: "Saansad Adarsh Gram Yojana (SAGY)",
    ministry: "Ministry of Rural Development",
    category: ["Social Security", "Housing"],
    description:
      "MPs adopt villages and work to develop them into Adarsh Grams (model villages) with all infrastructure, social development and governance improvements.",
    benefit:
      "Village gets: roads, electricity, water, health centre, school upgrades, livelihood programs, digital facilities",
    eligibility: "Villages adopted by MPs; all residents of adopted villages benefit",
    documents: "Residents submit needs to Gram Panchayat/MP office",
    portal: "saanjhi.gov.in",
    badge: "Housing",
    isNew: false,
    applyLink: "https://saanjhi.gov.in/",
  },
  {
    id: 61,
    name: "NSAP – Indira Gandhi National Widow Pension",
    ministry: "Ministry of Rural Development",
    category: ["Social Security", "Women & Girls"],
    description:
      "Monthly financial assistance to BPL widows to provide social security and reduce poverty among widowed women.",
    benefit:
      "₹300/month (centre) + state top-up; varies by state (₹500–₹2,000+ in many states)",
    eligibility: "BPL widows aged 40–79 (centre); specific state criteria vary",
    documents: "BPL/SECC card, husband's death certificate, age proof, bank account",
    portal: "nsap.nic.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://nsap.nic.in/",
  },
  {
    id: 62,
    name: "Ayushman Bharat Digital Mission (ABDM)",
    ministry: "Ministry of Health & Family Welfare",
    category: ["Healthcare", "Digital India"],
    description:
      "Creates digital health IDs (ABHA) for every Indian to store and share health records digitally across hospitals and healthcare providers.",
    benefit:
      "Free ABHA (Ayushman Bharat Health Account) 14-digit health ID; digital health locker; seamless record sharing",
    eligibility: "All Indian citizens — create ABHA ID online in minutes",
    documents: "Aadhaar or driving license or PAN",
    portal: "abdm.gov.in",
    badge: "Healthcare",
    isNew: true,
    applyLink: "https://abha.abdm.gov.in/abha/v3/register",
  },
  {
    id: 63,
    name: "Har Ghar Tiranga Campaign",
    ministry: "Ministry of Culture",
    category: ["Digital India"],
    description:
      "Mass movement encouraging every Indian to hoist the national flag at home and register online to show their patriotism — continues in 2026.",
    benefit: "Free Tricolor delivery; digital certificate; India flag pinning on national map",
    eligibility: "All Indian citizens",
    documents: "Mobile number for registration",
    portal: "harghartiranga.com",
    badge: "Digital India",
    isNew: false,
    applyLink: "https://harghartiranga.com/",
  },
  {
    id: 64,
    name: "National Rural Livelihood Mission – NRLM / DAY-NRLM",
    ministry: "Ministry of Rural Development",
    category: ["Employment & Skills", "Women & Girls"],
    description:
      "Poverty reduction mission mobilizing rural poor into SHGs, providing financial literacy, skill training, and market access for sustainable livelihoods.",
    benefit:
      "Interest-free revolving funds; subsidized bank credit; training; market linkage; community resource persons",
    eligibility:
      "Rural poor households, especially women; priority to SC/ST/minorities/PWD households",
    documents: "Aadhaar, bank account, SECC/BPL identification",
    portal: "aajeevika.gov.in",
    badge: "Employment & Skills",
    isNew: false,
    applyLink: "https://aajeevika.gov.in/",
  },
  {
    id: 65,
    name: "PM Poshan Shakti Nirman (POSHAN 2.0)",
    ministry: "Ministry of Women & Child Development",
    category: ["Healthcare", "Women & Girls"],
    description:
      "Addresses malnutrition among children under 6, pregnant women and lactating mothers through nutrition interventions, counseling and supplementary nutrition.",
    benefit:
      "Supplementary nutrition; growth monitoring; nutrition counseling at Anganwadi centres; VHND activities",
    eligibility:
      "Children 0–6 years, pregnant women, lactating mothers — register at nearest Anganwadi centre",
    documents: "Aadhaar, mother-child protection card",
    portal: "wcd.nic.in",
    badge: "Healthcare",
    isNew: false,
    applyLink: "https://icds-wcd.nic.in/",
  },
  {
    id: 66,
    name: "Pradhan Mantri Awas Yojana – Urban 2.0 (PMAY-U 2.0) 2024–29",
    ministry: "Ministry of Housing & Urban Affairs",
    category: ["Housing"],
    description:
      "New phase of urban housing scheme targeting 1 crore additional urban households from EWS and LIG for housing assistance till 2029.",
    benefit:
      "₹1–₹2.5 lakh direct grant; interest subsidy on home loans; beneficiary-led construction support",
    eligibility:
      "Urban EWS (< ₹3 LPA) and LIG (< ₹6 LPA) families without pucca house; slum dwellers",
    documents: "Aadhaar, income proof, land/property documents, bank account",
    portal: "pmay-urban.gov.in",
    badge: "Housing",
    isNew: true,
    applyLink: "https://pmay-urban.gov.in/",
  },
  {
    id: 67,
    name: "Kisan Drones Scheme",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: ["Farmers", "Digital India"],
    description:
      "Subsidy for purchase of agricultural drones for pesticide spraying, crop monitoring and field mapping to modernize Indian agriculture.",
    benefit:
      "40–100% subsidy on drone purchase for SC/ST/small-marginal/women farmers; 40% for others (max ₹4 lakh)",
    eligibility:
      "All farmers; higher subsidy for SC/ST, women, small/marginal farmers",
    documents: "Land records, Aadhaar, bank account, farmer registration",
    portal: "agri-tech.dac.gov.in",
    badge: "Farmers",
    isNew: true,
    applyLink: "https://agriwelfare.gov.in/en/HiTech",
  },
  {
    id: 68,
    name: "National Livelihood Mission – Urban (NULM)",
    ministry: "Ministry of Housing & Urban Affairs",
    category: ["Employment & Skills", "Business & MSME"],
    description:
      "Reduces poverty and vulnerability of urban poor by enabling access to gainful employment, skill development and self-employment opportunities.",
    benefit:
      "Free skill training (35 days–3 months); ₹2 lakh micro-enterprise loan; SHG formation support; shelter for urban homeless",
    eligibility:
      "Urban poor, especially homeless, rag pickers, street vendors, beggars, construction workers",
    documents: "Aadhaar, residence proof, bank account",
    portal: "nulm.gov.in",
    badge: "Employment & Skills",
    isNew: false,
    applyLink: "https://nulm.gov.in/",
  },
  {
    id: 69,
    name: "Atal Innovation Mission (AIM) – Atal Tinkering Labs",
    ministry: "NITI Aayog",
    category: ["Education", "Digital India"],
    description:
      "Establishes Atal Tinkering Labs in schools to foster creativity and problem-solving among students through STEM tools like 3D printers, robotics, IoT kits.",
    benefit:
      "₹20 lakh grant per school over 5 years; STEM innovation equipment; mentorship from industry experts",
    eligibility:
      "Government and private schools Class 6–12; students at ATL schools; applications open for new schools",
    documents: "School registration, infrastructure proof, principal letter",
    portal: "aim.gov.in",
    badge: "Education",
    isNew: false,
    applyLink: "https://aim.gov.in/atal-tinkering-labs.php",
  },
  {
    id: 70,
    name: "Startup India Seed Fund 2.0 – 2026",
    ministry: "DPIIT / Ministry of Commerce",
    category: ["Business & MSME"],
    description:
      "Enhanced seed fund scheme for startups in deep tech, clean energy, agritech and health tech sectors with increased funding limits in 2026.",
    benefit:
      "₹20 lakh (validation stage) up to ₹50 lakh (commercialization stage) via DPIIT-selected incubators",
    eligibility:
      "DPIIT-recognized startups < 2 years old; not received > ₹10 lakh funding; incorporated post 01/04/2016",
    documents: "DPIIT recognition, incubator recommendation, incorporation documents",
    portal: "seedfund.startupindia.gov.in",
    badge: "Business & MSME",
    isNew: true,
    applyLink: "https://seedfund.startupindia.gov.in/",
  },
  {
    id: 71,
    name: "PM Annadata Aay SanraksHan Abhiyan (PM-AASHA)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: ["Farmers"],
    description:
      "Ensures farmers get MSP (Minimum Support Price) for their produce through procurement and price deficiency payment mechanisms.",
    benefit:
      "Guaranteed MSP for notified crops; price deficiency payment if market price < MSP; procurement from farmers",
    eligibility:
      "All farmers growing notified crops in states that have adopted the scheme components",
    documents: "Land records, Aadhaar, bank account, crop registration",
    portal: "agri-welfare.gov.in",
    badge: "Farmers",
    isNew: false,
    applyLink: "https://agriwelfare.gov.in/",
  },
  {
    id: 72,
    name: "Har Ghar Bijli (Saubhagya Scheme)",
    ministry: "Ministry of Power",
    category: ["Housing", "Environment & Energy"],
    description:
      "Universal household electrification — provides free electricity connections to BPL households and subsidized connections to others.",
    benefit:
      "Free electricity connection for BPL households; ₹500 connection fee for others in instalments",
    eligibility: "Un-electrified rural and urban households; BPL households get free connection",
    documents: "Aadhaar, BPL card (for free connection), proof of residence",
    portal: "saubhagya.gov.in",
    badge: "Housing",
    isNew: false,
    applyLink: "https://saubhagya.gov.in/",
  },
  {
    id: 73,
    name: "National Pension System (NPS) – All Citizens",
    ministry: "Ministry of Finance / PFRDA",
    category: ["Finance & Banking", "Social Security"],
    description:
      "Market-linked voluntary pension scheme for all Indian citizens with low cost, flexible contributions and tax benefits for retirement security.",
    benefit:
      "Tax deduction up to ₹2 lakh; market-linked returns; 60% lump sum at 60 (tax free) + 40% annuity",
    eligibility: "Any Indian citizen aged 18–70 (both resident and NRI); Tier I (pension) and Tier II (savings)",
    documents: "Aadhaar, PAN, bank account",
    portal: "npscra.nsdl.co.in",
    badge: "Finance & Banking",
    isNew: false,
    applyLink: "https://enps.nsdl.com/eNPS/NationalPensionSystem.html",
  },
  {
    id: 74,
    name: "Agnipath Scheme (Agniveer)",
    ministry: "Ministry of Defence",
    category: ["Employment & Skills"],
    description:
      "Short-term military service scheme for youth to serve in Indian Armed Forces for 4 years as Agniveers with skill development and financial package.",
    benefit:
      "₹30,000–₹40,000/month package; ₹11.71 lakh corpus after 4 years; Skill India certificate; 25% retained for permanent service",
    eligibility:
      "Youth aged 17.5–21 years for Army/Navy/Air Force; Class 10/12 pass depending on category",
    documents: "Class 10/12 certificates, Aadhaar, birth certificate, medical fitness",
    portal: "joinindianarmy.nic.in",
    badge: "Employment & Skills",
    isNew: false,
    applyLink: "https://agnipathscheme.cdac.in/",
  },
  {
    id: 75,
    name: "PM Matsya Sampada Yojana (PMMSY)",
    ministry: "Ministry of Fisheries, Animal Husbandry & Dairying",
    category: ["Farmers", "Business & MSME"],
    description:
      "Flagship scheme for sustainable and responsible development of fisheries sector with ₹20,050 crore investment over 5 years.",
    benefit:
      "40–60% subsidy on fisheries infrastructure; boat/equipment support; insurance; ₹5 lakh accident insurance for fishermen",
    eligibility:
      "Fishermen, fish farmers, SHGs in fisheries sector; SC/ST and women get higher subsidy",
    documents: "Aadhaar, land/water body documents, bank account, fishing license",
    portal: "pmmsy.dof.gov.in",
    badge: "Farmers",
    isNew: false,
    applyLink: "https://pmmsy.dof.gov.in/",
  },
  {
    id: 76,
    name: "National Hydrogen Mission (Green H2)",
    ministry: "Ministry of New & Renewable Energy",
    category: ["Environment & Energy", "Business & MSME"],
    description:
      "India's mission to become a global hub for green hydrogen production, aiming to produce 5 MMT by 2030 with incentives for producers and users.",
    benefit:
      "Production incentives for green hydrogen/ammonia; infrastructure support; R&D grants for startups in clean energy",
    eligibility: "Energy companies, green hydrogen producers, clean energy startups",
    documents: "Company incorporation, project proposal, technology certifications",
    portal: "mnre.gov.in",
    badge: "Environment & Energy",
    isNew: true,
    applyLink: "https://mnre.gov.in/green-hydrogen/",
  },
  {
    id: 77,
    name: "Jeevan Pramaan – Digital Life Certificate",
    ministry: "Ministry of Electronics & IT",
    category: ["Digital India", "Social Security"],
    description:
      "Digital Life Certificate service for pensioners allowing them to submit annual life certificate online using Aadhaar biometric — no need to visit bank.",
    benefit:
      "Submit life certificate from home via mobile/computer; continues pension uninterrupted",
    eligibility: "All Central Government pensioners; state pensioners in many states",
    documents: "Aadhaar linked with pension account; biometric device or face authentication",
    portal: "jeevanpramaan.gov.in",
    badge: "Digital India",
    isNew: false,
    applyLink: "https://jeevanpramaan.gov.in/",
  },
  {
    id: 78,
    name: "Rashtriya Vayoshri Yojana (RVY)",
    ministry: "Ministry of Social Justice & Empowerment",
    category: ["Social Security", "Healthcare"],
    description:
      "Provides physical aids and assisted-living devices to senior citizens belonging to BPL category to counteract age-related disabilities.",
    benefit:
      "Free walking sticks, elbow crutches, wheelchairs, hearing aids, spectacles, dentures for BPL seniors",
    eligibility: "Senior citizens aged 60+ belonging to BPL category with age-related disabilities",
    documents: "BPL card, age proof, disability certificate, Aadhaar",
    portal: "socialjustice.gov.in",
    badge: "Social Security",
    isNew: false,
    applyLink: "https://socialjustice.gov.in/schemelist/RVY",
  },
  {
    id: 79,
    name: "Rozgar Mela – PM Rozgar Mela 2026",
    ministry: "Ministry of Labour & Employment",
    category: ["Employment & Skills"],
    description:
      "Mega employment fairs conducted by PM himself to hand over appointment letters to newly recruited central government employees in various departments.",
    benefit:
      "Direct govt job appointment; 10 lakh+ appointment letters distributed; transparent fast-track hiring",
    eligibility:
      "Candidates selected through SSC/UPSC/Railway Recruitment Board and other central recruitment boards",
    documents: "Appointment letter, Aadhaar, qualification certificates",
    portal: "labour.gov.in",
    badge: "Employment & Skills",
    isNew: true,
    applyLink: "https://www.labour.gov.in/",
  },
  {
    id: 80,
    name: "myScheme Portal – One-Stop Scheme Finder",
    ministry: "Ministry of Electronics & IT / NIC",
    category: ["Digital India", "Social Security"],
    description:
      "Government's official one-stop platform to discover all central and state government schemes you are eligible for based on your profile.",
    benefit:
      "Find all eligible schemes in one place; online applications; scheme status tracking; 800+ central & state schemes",
    eligibility:
      "All Indian citizens — enter your profile details to see eligible schemes",
    documents: "No documents needed to search; vary by scheme applied for",
    portal: "myscheme.gov.in",
    badge: "Digital India",
    isNew: true,
    applyLink: "https://www.myscheme.gov.in/",
  }
]

