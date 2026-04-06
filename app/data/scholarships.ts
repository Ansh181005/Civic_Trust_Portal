export interface ScholarshipEntry {
  id: number;
  name: string;
  provider: string;
  category: string[];
  description: string;
  amount: string;
  deadline: string;
  status: string;
  eligibility: string;
  applyLink: string;
}

export const scholarships: ScholarshipEntry[] = [
  {
    "id": 1,
    "name": "ICCR A2A Scholarship 2026–27",
    "provider": "Indian Council for Cultural Relations, Govt. of India",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "640 scholarship slots for international students to study at Indian universities under the Atal Bihari Vajpayee General Scholarship Scheme.",
    "amount": "Full tuition + Monthly stipend ₹31,000",
    "deadline": "April 30, 2026",
    "status": "OPEN",
    "eligibility": "International students applying to study in India at ICCR-empanelled universities",
    "applyLink": "https://a2ascholarships.iccr.gov.in/"
  },
  {
    "id": 2,
    "name": "Doctoral Fellowship in India for ASEAN 2025",
    "provider": "Government of India",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "Doctoral fellowships for ASEAN students to pursue PhD research at IITs across India.",
    "amount": "₹31,000/month stipend + Study grant up to ₹1,70,000",
    "deadline": "April 20, 2026",
    "status": "OPEN",
    "eligibility": "Students from ASEAN countries applying for PhD at any IIT in India",
    "applyLink": "https://www.education.gov.in/scholarships"
  },
  {
    "id": 3,
    "name": "Central Sector Scheme of Scholarships (CSS) 2026",
    "provider": "Ministry of Education, Govt. of India",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "For meritorious students from families with income below ₹4.5 LPA to pursue higher education. Applications reopen August 2026 for new cycle.",
    "amount": "₹10,000 – ₹20,000/year",
    "deadline": "December 31, 2026 (new cycle opens August 2026)",
    "status": "OPEN",
    "eligibility": "12th pass in top 20 percentile, family income < ₹4.5 LPA",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 4,
    "name": "Nirman Shramik Kalyan Yojana 2026",
    "provider": "Government of Odisha",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "Financial assistance for children of construction workers in Odisha pursuing school to postgraduate education.",
    "amount": "Financial Assistance",
    "deadline": "April 30, 2026",
    "status": "OPEN",
    "eligibility": "Children of registered construction workers in Odisha, Class 7 to PG",
    "applyLink": "https://scholarship.odisha.gov.in/"
  },
  {
    "id": 5,
    "name": "PMRF – PM Research Fellowship 2026",
    "provider": "Ministry of Education, Govt. of India",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "Prestigious fellowship for direct PhD admission at IITs/IISc/IISERs. New cycle opens mid-2026.",
    "amount": "₹70,000 – ₹80,000/month + ₹2 lakh/year research grant",
    "deadline": "July 31, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "B.Tech/Integrated M.Tech/MSc graduates from top institutions",
    "applyLink": "https://www.pmrf.in/"
  },
  {
    "id": 6,
    "name": "INSPIRE-SHE Scholarship 2026",
    "provider": "Department of Science & Technology (DST)",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "Attracts youth into natural and basic sciences with scholarship for higher education. New cycle opens mid-2026.",
    "amount": "₹80,000/year + ₹20,000 mentorship grant",
    "deadline": "September 30, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "Top 1% in Class 12, pursuing B.Sc/Integrated M.Sc in Natural Sciences",
    "applyLink": "https://online-inspire.gov.in/"
  },
  {
    "id": 7,
    "name": "NSP Pre-Matric Scholarship 2026–27",
    "provider": "Ministry of Education, Govt. of India",
    "category": [
      "Government",
      "SC/ST",
      "OBC"
    ],
    "description": "For SC/ST/OBC/Minority students in Class 1–10. NSP opens fresh applications every August–October.",
    "amount": "₹1,000 – ₹10,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Class 1–10 students from SC/ST/OBC/Minority communities",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 8,
    "name": "NSP Post-Matric Scholarship 2026–27",
    "provider": "Ministry of Education, Govt. of India",
    "category": [
      "Government",
      "SC/ST",
      "OBC"
    ],
    "description": "Supports Class 11 and above students from SC/ST/OBC/Minority backgrounds for higher education.",
    "amount": "₹2,000 – ₹20,000/year",
    "deadline": "November 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Class 11 and above, SC/ST/OBC/Minority students",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 9,
    "name": "PM YASASVI Scholarship 2026–27",
    "provider": "Ministry of Social Justice & Empowerment",
    "category": [
      "Government",
      "OBC"
    ],
    "description": "For OBC, EBC and DNT students. Entrance test conducted by NTA. Next cycle opens mid-2026.",
    "amount": "₹75,000 – ₹1,25,000/year",
    "deadline": "September 30, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "OBC/EBC/DNT students in Class 9 & 11",
    "applyLink": "https://yet.nta.ac.in/"
  },
  {
    "id": 10,
    "name": "Pragati Scholarship AICTE 2026–27",
    "provider": "All India Council for Technical Education (AICTE)",
    "category": [
      "Government",
      "Women"
    ],
    "description": "For girl students pursuing technical education (degree/diploma). New applications open August 2026.",
    "amount": "₹50,000/year + ₹30,000 contingency",
    "deadline": "November 15, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Girl students in AICTE-approved technical institutions",
    "applyLink": "https://www.aicte-pragati-saksham-gov.in/"
  },
  {
    "id": 11,
    "name": "Saksham Scholarship AICTE 2026–27",
    "provider": "All India Council for Technical Education (AICTE)",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "For differently-abled students in technical education. Next cycle opens August 2026.",
    "amount": "₹50,000/year + ₹30,000 contingency",
    "deadline": "November 15, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Differently-abled students with 40%+ disability in AICTE-approved institutions",
    "applyLink": "https://www.aicte-pragati-saksham-gov.in/"
  },
  {
    "id": 12,
    "name": "Maulana Azad National Fellowship 2026–27",
    "provider": "Ministry of Minority Affairs, Govt. of India",
    "category": [
      "Government",
      "SC/ST"
    ],
    "description": "Five-year fellowship for minority students pursuing MPhil and PhD. New cycle announced mid-2026.",
    "amount": "₹25,000 – ₹28,000/month + contingency",
    "deadline": "September 30, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "Minority community students for MPhil/PhD",
    "applyLink": "https://maef.net.in/"
  },
  {
    "id": 13,
    "name": "NMMS Scholarship 2026–27",
    "provider": "Ministry of Education, Govt. of India",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "For meritorious Class 8 students from economically weaker sections. Exam held Nov 2026.",
    "amount": "₹12,000/year",
    "deadline": "October 15, 2026 (exam November 2026)",
    "status": "OPENING SOON",
    "eligibility": "Class 8 students, family income < ₹3.5 LPA",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 14,
    "name": "GATE Fellowship / MHRD Scholarship 2026",
    "provider": "Ministry of Education, Govt. of India",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "Monthly stipend for GATE-qualified students admitted to M.Tech at IITs/NITs. Admission-based — ongoing.",
    "amount": "₹12,400/month",
    "deadline": "Ongoing — based on GATE 2026 admission",
    "status": "OPEN",
    "eligibility": "GATE 2026 qualified candidates admitted to M.Tech programs",
    "applyLink": "https://gate2026.iitr.ac.in/"
  },
  {
    "id": 15,
    "name": "CSIR-UGC NET JRF 2026",
    "provider": "Council of Scientific & Industrial Research (CSIR)",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "Junior Research Fellowship for PhD aspirants in science. Exam twice a year — June 2026 cycle open.",
    "amount": "₹37,000/month + HRA",
    "deadline": "April 15, 2026 (June 2026 exam)",
    "status": "OPEN",
    "eligibility": "MSc or equivalent graduates, for PhD in science",
    "applyLink": "https://csirnet.nta.ac.in/"
  },
  {
    "id": 16,
    "name": "DBT-JRF Fellowship 2026",
    "provider": "Department of Biotechnology (DBT)",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "Junior Research Fellowship for PhD in Biotechnology. Next exam cycle opens mid-2026.",
    "amount": "₹37,000/month + 30% HRA",
    "deadline": "June 30, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "MSc Biotechnology/Life Sciences graduates",
    "applyLink": "https://www.dbtjrf.gov.in/"
  },
  {
    "id": 17,
    "name": "Top Class Education Scheme for SC Students 2026–27",
    "provider": "Ministry of Social Justice & Empowerment",
    "category": [
      "Government",
      "SC/ST"
    ],
    "description": "Full support for SC students at top 266 identified institutions. NSP applications open August 2026.",
    "amount": "Full tuition + ₹2,220/month living",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "SC students admitted to notified top institutions",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 18,
    "name": "Begum Hazrat Mahal National Scholarship 2026–27",
    "provider": "Maulana Azad Education Foundation",
    "category": [
      "Government",
      "Women"
    ],
    "description": "For meritorious minority girl students in Class 9–12. New applications open August 2026.",
    "amount": "₹5,000 – ₹6,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Minority girl students, Class 9–12, above 50% marks",
    "applyLink": "https://maef.net.in/"
  },
  {
    "id": 19,
    "name": "Vigyan Jyoti Scholarship 2026–27",
    "provider": "Department of Science & Technology (DST)",
    "category": [
      "Government",
      "Women"
    ],
    "description": "Encourages girl students in JNVs to take up STEM careers. New cycle opens August 2026.",
    "amount": "₹1,25,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Girl students in Jawahar Navodaya Vidyalayas, Class 9–12",
    "applyLink": "https://www.vigyaniisc.res.in/"
  },
  {
    "id": 20,
    "name": "Ishan Uday Scholarship NER 2026–27",
    "provider": "University Grants Commission (UGC)",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "For students from North Eastern Region. New cycle opens August 2026 via NSP.",
    "amount": "₹5,400 – ₹7,800/month",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Students from 8 NE states pursuing UG programs",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 21,
    "name": "Dr. Ambedkar Post-Matric Scholarship 2026–27",
    "provider": "Ministry of Social Justice & Empowerment",
    "category": [
      "Government",
      "SC/ST",
      "OBC"
    ],
    "description": "Financial support to SC/OBC post-matric students. New cycle opens August–September 2026.",
    "amount": "₹2,000 – ₹20,000/year",
    "deadline": "November 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "SC/OBC students, post-Class 10 education",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 22,
    "name": "National Fellowship for OBC Students UGC 2026",
    "provider": "University Grants Commission (UGC)",
    "category": [
      "Government",
      "OBC"
    ],
    "description": "For OBC students pursuing MPhil and PhD. Next notification expected July 2026.",
    "amount": "₹25,000 – ₹28,000/month",
    "deadline": "September 30, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "OBC students pursuing MPhil/PhD at Indian universities",
    "applyLink": "https://ugcnetonline.in/"
  },
  {
    "id": 23,
    "name": "Rajiv Gandhi National Fellowship SC/ST 2026",
    "provider": "University Grants Commission (UGC)",
    "category": [
      "Government",
      "SC/ST"
    ],
    "description": "For SC/ST MPhil/PhD students. New cycle opens via NSP in August 2026.",
    "amount": "₹25,000 – ₹28,000/month + contingency",
    "deadline": "October 15, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "SC/ST students pursuing MPhil/PhD",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 24,
    "name": "Ministry of Tribal Affairs Scholarship 2026–27",
    "provider": "Ministry of Tribal Affairs, Govt. of India",
    "category": [
      "Government",
      "SC/ST"
    ],
    "description": "Comprehensive scholarship for ST students at all levels. Opens on NSP in August 2026.",
    "amount": "₹2,500 – ₹30,000/year",
    "deadline": "November 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Scheduled Tribe students at all education levels",
    "applyLink": "https://scholarships.gov.in/"
  },
  {
    "id": 25,
    "name": "UP Post-Matric Scholarship 2026–27",
    "provider": "Government of Uttar Pradesh",
    "category": [
      "Government",
      "SC/ST",
      "OBC"
    ],
    "description": "State scholarship for UP students from SC/ST/OBC/Minority communities. Opens August 2026.",
    "amount": "₹2,000 – ₹15,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "UP domicile, SC/ST/OBC/Minority, post-Class 10",
    "applyLink": "https://scholarship.up.gov.in/"
  },
  {
    "id": 26,
    "name": "Australia Awards Scholarship 2026",
    "provider": "Australian Government – DFAT",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "Long-term development awards for students from developing countries to study in Australia. Currently open for 2026 intake.",
    "amount": "Full tuition + living + health + travel",
    "deadline": "April 30, 2026",
    "status": "OPEN",
    "eligibility": "Indian citizens for undergraduate or postgraduate programs in Australia",
    "applyLink": "https://www.australiaawardsindia.org/apply/"
  },
  {
    "id": 27,
    "name": "Inlaks Shivdasani Scholarship 2026",
    "provider": "Inlaks Foundation",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For exceptional Indians to study at top US/UK/European universities. Interviews scheduled May 2026.",
    "amount": "Up to $100,000 covering tuition and living",
    "deadline": "Currently in Review — Interviews May 2026",
    "status": "IN REVIEW",
    "eligibility": "Indian citizens under 30, for PG at top world universities",
    "applyLink": "https://inlaksfoundation.org/opportunities/scholarship/"
  },
  {
    "id": 28,
    "name": "SINGA – Singapore International Graduate Award 2026",
    "provider": "A*STAR, NUS, NTU, SUTD – Singapore",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "PhD scholarship to conduct research in Singapore's world-class research institutes.",
    "amount": "SGD 2,000/month + tuition + settling-in allowance",
    "deadline": "June 1, 2026",
    "status": "OPEN",
    "eligibility": "Graduates with excellent academic record from any country for PhD in Singapore",
    "applyLink": "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa"
  },
  {
    "id": 29,
    "name": "GREAT Scholarship 2026 – UK",
    "provider": "British Council & UK Universities",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "£10,000 scholarship for Indian students pursuing one-year postgraduate courses at UK universities.",
    "amount": "£10,000 tuition contribution",
    "deadline": "May 31, 2026",
    "status": "OPEN",
    "eligibility": "Indian passport holders for 1-year PG course at participating UK universities",
    "applyLink": "https://www.britishcouncil.in/study-uk/scholarships/great-scholarships"
  },
  {
    "id": 30,
    "name": "Narotam Sekhsaria Scholarship 2026",
    "provider": "Narotam Sekhsaria Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Loans-cum-scholarship for Indian students admitted to top 30 global universities for postgraduate studies.",
    "amount": "Up to ₹20 lakhs",
    "deadline": "May 31, 2026",
    "status": "OPEN",
    "eligibility": "Indian students admitted to top 30 global universities for PG",
    "applyLink": "https://pg.nsfoundation.co.in/"
  },
  {
    "id": 31,
    "name": "Education Future International Scholarship 2026",
    "provider": "Education Future Organisation",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "Scholarship for meritorious Indian students studying at top universities globally. Rolling admissions — apply early.",
    "amount": "₹2 lakh – ₹10 lakh",
    "deadline": "August 30, 2026 (Rolling)",
    "status": "OPEN",
    "eligibility": "Indian students pursuing UG/PG at top universities outside India, 60%+ in Class 10 & 12",
    "applyLink": "https://www.education-future.org/"
  },
  {
    "id": 32,
    "name": "GyanDhan Scholarship 2026",
    "provider": "GyanDhan",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Test-based scholarship for Indian students pursuing higher education in India or abroad. No minimum GPA required.",
    "amount": "₹2.5 lakh per winner",
    "deadline": "May 31, 2026",
    "status": "OPEN",
    "eligibility": "Students pursuing UG/PG in India or abroad (STEM, Business, Liberal Arts)",
    "applyLink": "https://www.gyandhan.com/scholarships/gd-scholarship"
  },
  {
    "id": 33,
    "name": "NUS Research Scholarship 2026",
    "provider": "National University of Singapore (NUS)",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For international students pursuing MPhil/PhD research programs at NUS Singapore.",
    "amount": "SGD 2,000/month + tuition waiver",
    "deadline": "April 30, 2026",
    "status": "OPEN",
    "eligibility": "International students applying for MPhil/PhD at NUS",
    "applyLink": "https://nusgs.nus.edu.sg/scholarships/"
  },
  {
    "id": 34,
    "name": "Fulbright-Nehru Master's Fellowship 2027",
    "provider": "United States-India Educational Foundation (USIEF)",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "Prestigious US government fellowship for Indian students for Master's at US universities. Next cycle opens May 2026.",
    "amount": "Full funding – tuition, airfare, living stipend",
    "deadline": "July 15, 2026 (next cycle opens May 2026)",
    "status": "OPENING SOON",
    "eligibility": "Indian citizens with Bachelor's degree and 3 years work experience",
    "applyLink": "https://www.usief.org.in/Fellowships/Fulbright-Nehru-Master-Fellowships.aspx"
  },
  {
    "id": 35,
    "name": "Chevening Scholarship 2027–28",
    "provider": "UK Foreign, Commonwealth & Development Office",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "UK's most prestigious scholarship for future leaders. Applications for 2027-28 open September 2026.",
    "amount": "Full tuition + living + travel + visa",
    "deadline": "November 2026 (opens September 2026)",
    "status": "OPENING SOON",
    "eligibility": "Indian citizens with 2+ years work experience for 1-year Master's in UK",
    "applyLink": "https://www.chevening.org/apply/"
  },
  {
    "id": 36,
    "name": "DAAD Scholarship 2026–27",
    "provider": "German Academic Exchange Service (DAAD)",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For Indian graduates to pursue Master's or PhD at German universities. Next cycle opens August 2026.",
    "amount": "€934/month + travel + health insurance",
    "deadline": "November 15, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Indian graduates with excellent academic record for study in Germany",
    "applyLink": "https://www.daad.in/en/find-funding/"
  },
  {
    "id": 37,
    "name": "MEXT Scholarship 2027 – Japan",
    "provider": "Ministry of Education, Japan",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "Japanese Government full scholarship for international students. Embassy route opens May 2026.",
    "amount": "¥117,000 – ¥145,000/month + tuition waived",
    "deadline": "May 31, 2026 (Embassy route)",
    "status": "OPENING SOON",
    "eligibility": "Indian citizens aged 17–34 for undergraduate/postgraduate/research in Japan",
    "applyLink": "https://www.in.emb-japan.go.jp/itpr_en/scholarship.html"
  },
  {
    "id": 38,
    "name": "Korean Government Scholarship KGSP 2027",
    "provider": "NIIED, South Korea",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "Full scholarship for international students to study in South Korea. Embassy route opens February 2027.",
    "amount": "Full tuition + KRW 900,000/month living",
    "deadline": "March 2027 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "Indian citizens under age 25 (UG) or 40 (PG) for study in Korea",
    "applyLink": "https://www.studyinkorea.go.kr/en/sub/gks/allnew_gks_u.do"
  },
  {
    "id": 39,
    "name": "Chinese Government Scholarship CSC 2026–27",
    "provider": "China Scholarship Council (CSC)",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "Fully funded scholarship for international students at Chinese universities. Next round opens December 2026.",
    "amount": "Full tuition + CNY 2,500 – 3,500/month",
    "deadline": "March 2027 (next cycle opens December 2026)",
    "status": "OPENING SOON",
    "eligibility": "Indian citizens for UG/PG/PhD in China",
    "applyLink": "https://www.campuschina.org/scholarships/index.html"
  },
  {
    "id": 40,
    "name": "Swiss Government Excellence Scholarship 2027",
    "provider": "Federal Commission for Scholarships (FCS), Switzerland",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For postgraduate researchers to work in Switzerland. Next cycle opens September 2026.",
    "amount": "CHF 1,920/month + tuition + accommodation",
    "deadline": "December 2026 (next cycle opens September 2026)",
    "status": "OPENING SOON",
    "eligibility": "Postgraduate students with Master's degree for research/PhD in Switzerland",
    "applyLink": "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html"
  },
  {
    "id": 41,
    "name": "Eiffel Excellence Scholarship – France 2027",
    "provider": "Campus France / French Ministry",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For top international students to pursue Master's or PhD in France. Opens October 2026 for next cycle.",
    "amount": "€1,181 – €1,400/month + accommodation + travel",
    "deadline": "January 2027 (next cycle opens October 2026)",
    "status": "OPENING SOON",
    "eligibility": "Students under age 30 (Master's) or 35 (PhD) for study in France",
    "applyLink": "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence"
  },
  {
    "id": 42,
    "name": "Gates Cambridge Scholarship 2027",
    "provider": "Bill & Melinda Gates Foundation / University of Cambridge",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "Full-cost Cambridge scholarship for non-UK students. Next cycle opens September 2026.",
    "amount": "Full tuition + living + travel + extras",
    "deadline": "December 2026 (next cycle opens September 2026)",
    "status": "OPENING SOON",
    "eligibility": "Non-UK citizens applying to the University of Cambridge for postgraduate study",
    "applyLink": "https://www.gatescambridge.org/apply/"
  },
  {
    "id": 43,
    "name": "Rhodes Scholarship India 2027",
    "provider": "Rhodes Trust, University of Oxford",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "World's oldest international scholarship for study at Oxford. India applications open June 2026.",
    "amount": "Full tuition + living stipend + travel + health insurance",
    "deadline": "August 31, 2026",
    "status": "OPENING SOON",
    "eligibility": "Indian citizens aged 19–25, outstanding academic and leadership record",
    "applyLink": "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/apply/"
  },
  {
    "id": 44,
    "name": "Vanier Canada Graduate Scholarship 2027",
    "provider": "Government of Canada",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For world-class doctoral students at Canadian universities. Next cycle opens September 2026.",
    "amount": "CAD 50,000/year for 3 years",
    "deadline": "November 2026 (next cycle opens September 2026)",
    "status": "OPENING SOON",
    "eligibility": "Doctoral students at eligible Canadian universities",
    "applyLink": "https://vanier.gc.ca/en/home-accueil.html"
  },
  {
    "id": 45,
    "name": "Hong Kong PhD Fellowship Scheme 2026–27",
    "provider": "Research Grants Council (RGC), Hong Kong",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For outstanding students worldwide to pursue PhD in Hong Kong. Next round opens September 2026.",
    "amount": "HKD 27,600/month + conference travel grant",
    "deadline": "December 2026 (next cycle opens September 2026)",
    "status": "OPENING SOON",
    "eligibility": "Students from any country applying for PhD at HK universities",
    "applyLink": "https://cerg1.ugc.edu.hk/hkpfs/index.html"
  },
  {
    "id": 46,
    "name": "Aga Khan Foundation International Scholarship 2027",
    "provider": "Aga Khan Foundation",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For outstanding students from developing countries for postgraduate studies. Next cycle opens January 2027.",
    "amount": "50% loan + 50% grant covering all expenses",
    "deadline": "March 2027 (next cycle opens January 2027)",
    "status": "OPENING SOON",
    "eligibility": "Citizens of select developing countries including India for PG programs",
    "applyLink": "https://www.akdn.org/our-agencies/aga-khan-foundation/international-scholarship-programme"
  },
  {
    "id": 47,
    "name": "Hubert H. Humphrey Fellowship 2027",
    "provider": "US Department of State / Fulbright",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "Non-degree program for mid-career professionals in the USA. Next cycle opens May 2026.",
    "amount": "Full funding – tuition, living, travel, health insurance",
    "deadline": "September 15, 2026 (opens May 2026)",
    "status": "OPENING SOON",
    "eligibility": "Indian professionals with 5+ years experience for non-degree program in USA",
    "applyLink": "https://www.usief.org.in/Fellowships/Humphrey-Fellowship-Program.aspx"
  },
  {
    "id": 48,
    "name": "ADB-Japan Scholarship Program 2026",
    "provider": "Asian Development Bank & Government of Japan",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For citizens of ADB developing member countries for postgraduate study. Apply via ADB partner universities.",
    "amount": "Full tuition + living + health + travel allowance",
    "deadline": "Varies by institution — check portal",
    "status": "OPEN",
    "eligibility": "Citizens of ADB developing member countries with 2+ years work experience",
    "applyLink": "https://www.adb.org/work-with-us/careers/japan-scholarship-program"
  },
  {
    "id": 49,
    "name": "Rotary Foundation Global Grant Scholarship 2026",
    "provider": "Rotary International",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For graduate-level study related to Rotary's six areas of focus. District deadlines vary.",
    "amount": "Minimum $30,000 USD",
    "deadline": "July – August 2026 (district deadlines)",
    "status": "OPENING SOON",
    "eligibility": "Students pursuing vocational training or graduate programs abroad",
    "applyLink": "https://www.rotary.org/en/our-programs/scholarships"
  },
  {
    "id": 50,
    "name": "Commonwealth Scholarship 2027",
    "provider": "Commonwealth Scholarship Commission (UK)",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For Commonwealth country students to study in the UK. Applications open September 2026.",
    "amount": "Full tuition + living allowance + airfare",
    "deadline": "October 2026 (next cycle opens September 2026)",
    "status": "OPENING SOON",
    "eligibility": "Citizens of Commonwealth countries including India for Master's and PhD in UK",
    "applyLink": "https://cscuk.fcdo.gov.uk/apply/"
  },
  {
    "id": 51,
    "name": "Hongirana Scholarship 2026",
    "provider": "Hongirana Charitable Trust",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Financial assistance for students from Class 10 to engineering and medical programs.",
    "amount": "Financial Assistance",
    "deadline": "June 30, 2026",
    "status": "OPEN",
    "eligibility": "Students in Class 10, 11, 12, Engineering, Medical, Bachelors programs",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 52,
    "name": "IIP SLG Scholarship 2026",
    "provider": "IIP Academy",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Financial assistance for diploma, undergraduate and postgraduate students.",
    "amount": "Financial Assistance",
    "deadline": "March 31, 2026",
    "status": "OPEN",
    "eligibility": "Diploma, Bachelors and Masters students",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 53,
    "name": "Sun Pharma Science Foundation Research Fellowship 2026",
    "provider": "Sun Pharma Science Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Research fellowship for postdoctoral researchers in pharmaceutical and life sciences.",
    "amount": "₹75,000/month",
    "deadline": "March 31, 2026",
    "status": "OPEN",
    "eligibility": "Postdoctoral researchers in pharmaceutical/life sciences",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 54,
    "name": "Ashraya Welfare Trust Scholarship 2026",
    "provider": "Ashraya Welfare Trust",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Financial support for engineering and undergraduate students from economically weaker backgrounds.",
    "amount": "Financial Assistance",
    "deadline": "July 31, 2026",
    "status": "OPEN",
    "eligibility": "Engineering and Bachelors students from low-income families",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 55,
    "name": "Vision Divyang Foundation Scholarship 2026",
    "provider": "Vision Divyang Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Scholarship for differently-abled students in primary and middle school education.",
    "amount": "₹4,000",
    "deadline": "April 30, 2026",
    "status": "OPEN",
    "eligibility": "Differently-abled students in Class 1–9",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 56,
    "name": "Tamil Nadu Foundation Scholarship 2026",
    "provider": "Tamil Nadu Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Open scholarship for all students at any level of education.",
    "amount": "Financial Assistance",
    "deadline": "June 30, 2026",
    "status": "OPEN",
    "eligibility": "All students at any level",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 57,
    "name": "Kiran Foundation Scholarship 2026",
    "provider": "Kiran Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Financial support for middle school students from underprivileged backgrounds.",
    "amount": "Financial Assistance",
    "deadline": "April 30, 2026",
    "status": "OPEN",
    "eligibility": "Students in Class 7–9 from underprivileged families",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 58,
    "name": "Dr. Moni Bhaumik Educational Foundation Scholarship 2026",
    "provider": "Dr. Moni Bhaumik Educational Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Financial assistance for engineering, medical and undergraduate students.",
    "amount": "Financial Assistance",
    "deadline": "September 30, 2026",
    "status": "OPEN",
    "eligibility": "Engineering, Medical and Bachelors students",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 59,
    "name": "Smarter India Scholarship 2026",
    "provider": "Smarter India",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Aptitude and logical reasoning based scholarship open to all students across India.",
    "amount": "₹1,00,000",
    "deadline": "April 10, 2026",
    "status": "OPEN",
    "eligibility": "All students at any level",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 60,
    "name": "Manjrekar Foundation Scholarship 2026",
    "provider": "Manjrekar Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Open scholarship for all students across India at all levels of education.",
    "amount": "Financial Assistance",
    "deadline": "December 31, 2026",
    "status": "OPEN",
    "eligibility": "All students at any level",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 61,
    "name": "Tata Capital Pankh Scholarship 2026–27",
    "provider": "Tata Capital Limited",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Helps meritorious and underprivileged UG students. New cycle opens August 2026.",
    "amount": "Up to ₹50,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Class 12 pass, family income < ₹4 LPA, pursuing UG",
    "applyLink": "https://www.tatacapital.com/about-us/csr/pankh-scholarship.html"
  },
  {
    "id": 62,
    "name": "HDFC Bank Parivartan ECS Scholarship 2026–27",
    "provider": "HDFC Bank Limited",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Educational support for meritorious students from economically weaker sections. Opens August 2026.",
    "amount": "₹25,000 – ₹75,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Class 11, UG, PG students; family income < ₹5 LPA",
    "applyLink": "https://www.buddy4study.com/scholarships"
  },
  {
    "id": 63,
    "name": "Kotak Kanya Scholarship 2026–27",
    "provider": "Kotak Education Foundation",
    "category": [
      "Private",
      "Women"
    ],
    "description": "Empowers meritorious girl students for higher education. New cycle opens August 2026.",
    "amount": "Up to ₹1,50,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Girl students scored 85%+ in Class 10, family income < ₹3 LPA",
    "applyLink": "https://kotakeducation.org/scholarship/kotak-kanya-scholarship/"
  },
  {
    "id": 64,
    "name": "Sitaram Jindal Foundation Scholarship 2026–27",
    "provider": "Sitaram Jindal Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For meritorious and economically backward students. Applications open July 2026.",
    "amount": "₹500 – ₹2,000/month",
    "deadline": "August 31, 2026 (opens July 2026)",
    "status": "OPENING SOON",
    "eligibility": "Students from Class 11 to PG level, income criteria applies",
    "applyLink": "https://www.sitaramjindalfoundation.org/scholarships.html"
  },
  {
    "id": 65,
    "name": "L'Oréal India For Young Women in Science 2027",
    "provider": "L'Oréal India & UNESCO",
    "category": [
      "Private",
      "Women"
    ],
    "description": "Fellowships for women PhD researchers in sciences. Next cycle opens November 2026.",
    "amount": "₹2,50,000 fellowship",
    "deadline": "December 2026 (next cycle opens November 2026)",
    "status": "OPENING SOON",
    "eligibility": "Women PhD students in sciences under age 30",
    "applyLink": "https://www.forwomeninscience.com/en/fellowships"
  },
  {
    "id": 66,
    "name": "Reliance Foundation Scholarship 2026–27",
    "provider": "Reliance Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For outstanding UG/PG students in STEM and humanities. New cycle opens August 2026.",
    "amount": "Up to ₹6 lakh/year",
    "deadline": "December 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Students in top colleges in STEM/Humanities streams",
    "applyLink": "https://scholarships.reliancefoundation.org/"
  },
  {
    "id": 67,
    "name": "LIC Golden Jubilee Scholarship 2026–27",
    "provider": "LIC Golden Jubilee Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For meritorious students from economically weaker sections. Opens October 2026.",
    "amount": "₹20,000/year",
    "deadline": "October 15, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "Class 12 pass with 60%+, family income < ₹2 LPA",
    "applyLink": "https://licindia.in/Home/Golden-Jubilee-Foundation"
  },
  {
    "id": 68,
    "name": "SBI Asha Scholarship Program 2026–27",
    "provider": "SBI Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For meritorious students from lower income families for UG education. Opens August 2026.",
    "amount": "₹15,000 – ₹50,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Class 12 passed, pursuing UG, family income < ₹3 LPA",
    "applyLink": "https://www.sbifoundation.in/scholarship"
  },
  {
    "id": 69,
    "name": "ONGC Scholarship 2026–27",
    "provider": "Oil & Natural Gas Corporation (ONGC)",
    "category": [
      "Private",
      "SC/ST",
      "OBC"
    ],
    "description": "For SC/ST/OBC students in engineering, medical, MBA. New cycle opens August 2026.",
    "amount": "₹48,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "SC/ST/OBC students in 1st year of engineering/medical/MBA",
    "applyLink": "https://www.ongcindia.com/web/eng/scholarship"
  },
  {
    "id": 70,
    "name": "IOCL Scholarship 2026–27",
    "provider": "Indian Oil Corporation Limited",
    "category": [
      "Private",
      "SC/ST"
    ],
    "description": "For SC/ST/OBC students in professional courses. New applications open August 2026.",
    "amount": "₹24,000 – ₹48,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "SC/ST/OBC students in 1st year of engineering/medical/management with 60%+",
    "applyLink": "https://iocl.com/scholarship"
  },
  {
    "id": 71,
    "name": "SAIL Scholarship 2026–27",
    "provider": "Steel Authority of India Limited (SAIL)",
    "category": [
      "Private",
      "SC/ST"
    ],
    "description": "For SC/ST students in engineering, medical and management. Opens October 2026.",
    "amount": "₹30,000/year",
    "deadline": "October 31, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "SC/ST students in 1st year of professional courses",
    "applyLink": "https://sail.co.in/en/scholarship"
  },
  {
    "id": 72,
    "name": "Vidyasaarathi Scholarship Platform 2026",
    "provider": "NSDL e-Governance Infrastructure Ltd.",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "India's major corporate scholarship portal. Multiple schemes open throughout the year with rolling deadlines.",
    "amount": "Varies by scheme (₹10,000 – ₹1,00,000)",
    "deadline": "Multiple — check portal (always open)",
    "status": "OPEN",
    "eligibility": "Students at various levels; eligibility varies by scheme",
    "applyLink": "https://www.vidyasaarathi.co.in/"
  },
  {
    "id": 73,
    "name": "Buddy4Study Scholarship Portal 2026",
    "provider": "Buddy4Study India Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "India's largest scholarship aggregator with hundreds of active schemes from corporates and NGOs.",
    "amount": "Varies by scheme",
    "deadline": "Multiple — always active schemes on portal",
    "status": "OPEN",
    "eligibility": "Students at all levels across India",
    "applyLink": "https://www.buddy4study.com/scholarships"
  },
  {
    "id": 74,
    "name": "Nanotam Sekhsaria PG Scholarship 2026",
    "provider": "Narotam Sekhsaria Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Currently open for Indian students admitted to top 30 global universities. Apply by May 31.",
    "amount": "Up to ₹20 lakhs",
    "deadline": "May 31, 2026",
    "status": "OPEN",
    "eligibility": "Indian students admitted to top global universities for postgraduate study",
    "applyLink": "https://pg.nsfoundation.co.in/"
  },
  {
    "id": 75,
    "name": "KC Mahindra Scholarship for PG Studies Abroad 2026",
    "provider": "K.C. Mahindra Education Trust",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Loan scholarship for Indians at reputed foreign universities for Master's. Opens April 2026.",
    "amount": "Up to ₹8 lakh (loan scholarship)",
    "deadline": "April 30, 2026",
    "status": "OPEN",
    "eligibility": "Indian citizens admitted to reputed foreign universities for Master's",
    "applyLink": "https://kcmet.org/scholarship-post-graduate-studies-abroad.aspx"
  },
  {
    "id": 76,
    "name": "Wipro Scholarship 2026–27",
    "provider": "Wipro Limited",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For engineering students from EWS backgrounds at top institutes. Opens August 2026.",
    "amount": "₹30,000 – ₹60,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Engineering students at AICTE-approved colleges, family income < ₹4 LPA",
    "applyLink": "https://www.wipro.com/sustainability/education/"
  },
  {
    "id": 77,
    "name": "Piramal Foundation Scholarship 2026–27",
    "provider": "Piramal Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For meritorious rural students for higher education at quality institutions. New cycle August 2026.",
    "amount": "₹60,000 – ₹1,00,000/year",
    "deadline": "August 31, 2026 (opens June 2026)",
    "status": "OPENING SOON",
    "eligibility": "Rural India students, 80%+ in Class 12",
    "applyLink": "https://www.piramalfoundation.org/programs/education/"
  },
  {
    "id": 78,
    "name": "Mahindra All India Talent Scholarship 2026–27",
    "provider": "K.C. Mahindra Education Trust",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For diploma/polytechnic students across India. Opens August 2026.",
    "amount": "₹12,000 – ₹20,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "1st year diploma/polytechnic students, 70%+ in Class 10",
    "applyLink": "https://kcmet.org/scholarship-mahindra-all-india-talent.aspx"
  },
  {
    "id": 79,
    "name": "Azim Premji Foundation Scholarship 2026",
    "provider": "Azim Premji University",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Need-cum-merit scholarship for students at Azim Premji University. Admission-based.",
    "amount": "Up to 100% tuition fee waiver",
    "deadline": "March 2027 (with admission — opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Students admitted to Azim Premji University programs",
    "applyLink": "https://azimpremjiuniversity.edu.in/admissions/financial-aid"
  },
  {
    "id": 80,
    "name": "National e-Scholarship Odisha 2026–27",
    "provider": "Government of Odisha",
    "category": [
      "Government",
      "SC/ST",
      "OBC"
    ],
    "description": "For SC/ST/OBC students in Odisha at all education levels. Opens August 2026.",
    "amount": "₹2,000 – ₹15,000/year",
    "deadline": "November 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Odisha domicile SC/ST/OBC students at all levels",
    "applyLink": "https://scholarship.odisha.gov.in/"
  },
  {
    "id": 81,
    "name": "Swami Vivekananda Merit-cum-Means WB 2026–27",
    "provider": "Government of West Bengal",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "West Bengal state scholarship for higher education. Opens August 2026.",
    "amount": "₹1,000 – ₹5,000/month",
    "deadline": "November 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "West Bengal domicile students, Class 11 to PG",
    "applyLink": "https://svmcm.wbhed.gov.in/"
  },
  {
    "id": 82,
    "name": "Bihar Post-Matric Scholarship 2026–27",
    "provider": "Government of Bihar",
    "category": [
      "Government",
      "SC/ST",
      "OBC"
    ],
    "description": "Bihar state scholarship for SC/ST/OBC/EBC students. New cycle opens August 2026.",
    "amount": "₹2,000 – ₹10,000/year",
    "deadline": "November 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Bihar domicile SC/ST/OBC/EBC students from Class 11 onwards",
    "applyLink": "https://pmsonline.bih.nic.in/"
  },
  {
    "id": 83,
    "name": "KVPY / INSPIRE-SHE 2026–27",
    "provider": "IISc / Department of Science & Technology",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "National fellowship for science students to develop research aptitude. New cycle August 2026.",
    "amount": "₹5,000 – ₹7,000/month + annual contingency",
    "deadline": "August 31, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "Class 11 to 1st year BSc/BS/Int.MSc students",
    "applyLink": "https://kvpy.iisc.ac.in/main/index.htm"
  },
  {
    "id": 84,
    "name": "UGC Merit Scholarship for University Rank Holders 2026",
    "provider": "University Grants Commission (UGC)",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "For 1st and 2nd rank holders at university UG final exams. Applied via college.",
    "amount": "₹3,100/month",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "1st and 2nd rank holders in university final UG examinations",
    "applyLink": "https://www.ugc.gov.in/page/Scholarships.aspx"
  },
  {
    "id": 85,
    "name": "Padho Pardesh Scheme 2026",
    "provider": "Ministry of Minority Affairs, Govt. of India",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "Interest subsidy on education loans for minority students studying abroad. Ongoing via banks.",
    "amount": "Full interest subsidy on education loan",
    "deadline": "Ongoing — apply through nationalized banks",
    "status": "OPEN",
    "eligibility": "Minority students with family income < ₹6 LPA for abroad studies",
    "applyLink": "https://minorityaffairs.gov.in/"
  },
  {
    "id": 86,
    "name": "Google Generation Scholarship 2026",
    "provider": "Google",
    "category": [
      "Private",
      "Women",
      "Merit-based"
    ],
    "description": "For women and underrepresented groups in CS and tech. Next India cycle opens October 2026.",
    "amount": "$1,000 + Google mentorship",
    "deadline": "December 2026 (next cycle opens October 2026)",
    "status": "OPENING SOON",
    "eligibility": "Women students in CS/tech degree at Indian universities",
    "applyLink": "https://buildyourfuture.withgoogle.com/scholarships"
  },
  {
    "id": 87,
    "name": "NTPC Scholarship Scheme 2026–27",
    "provider": "NTPC Limited",
    "category": [
      "Private",
      "SC/ST"
    ],
    "description": "For SC/ST students from NTPC project areas in professional courses. Opens October 2026.",
    "amount": "₹20,000 – ₹50,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "SC/ST students from NTPC project areas in professional courses",
    "applyLink": "https://www.ntpc.co.in/en/human-resources/scholarship-schemes"
  },
  {
    "id": 88,
    "name": "Coal India Scholarship 2026–27",
    "provider": "Coal India Limited",
    "category": [
      "Private",
      "SC/ST"
    ],
    "description": "For SC/ST wards of Coal India employees in higher education. Opens October 2026.",
    "amount": "₹10,000 – ₹30,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "SC/ST wards of Coal India employees in higher education",
    "applyLink": "https://www.coalindia.in/en-us/company/scholarships.aspx"
  },
  {
    "id": 89,
    "name": "Samsung Star Scholar Program 2026–27",
    "provider": "Samsung India",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For innovative engineering students at top colleges. New cycle opens August 2026.",
    "amount": "₹1,00,000 + internship opportunity",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "1st/2nd year engineering students at top engineering colleges",
    "applyLink": "https://research.samsung.com/star"
  },
  {
    "id": 90,
    "name": "Young India Fellowship Ashoka 2026–27",
    "provider": "Ashoka University",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Interdisciplinary postgraduate diploma with scholarship for exceptional Indians. Opens October 2026.",
    "amount": "Partial to full scholarship based on merit and need",
    "deadline": "January 15, 2027 (opens October 2026)",
    "status": "OPENING SOON",
    "eligibility": "Indian graduates for 1-year interdisciplinary PG diploma at Ashoka University",
    "applyLink": "https://www.ashoka.edu.in/yif"
  },
  {
    "id": 91,
    "name": "KSPC Trust Interest Free Loan Scholarship 2026",
    "provider": "Kadur Seetharamaiah Parvathamma Charitable Trust",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Interest-free loan scholarship for diploma, engineering, medical and professional students.",
    "amount": "Financial Assistance (interest-free loan)",
    "deadline": "December 31, 2026",
    "status": "OPEN",
    "eligibility": "Diploma, Engineering, Medical, Bachelors, Professional course students",
    "applyLink": "https://www.theglobalscholarship.org/scholarships/"
  },
  {
    "id": 92,
    "name": "Maulana Azad National Fellowship 2026 (UGC-MANF)",
    "provider": "Ministry of Minority Affairs / UGC",
    "category": [
      "Government",
      "Merit-based"
    ],
    "description": "For minority MPhil/PhD students. New notification expected July 2026.",
    "amount": "₹25,000 – ₹28,000/month + contingency",
    "deadline": "September 30, 2026 (next cycle)",
    "status": "OPENING SOON",
    "eligibility": "Minority community (Muslim/Christian/Sikh/Buddhist/Jain/Parsi) MPhil/PhD students",
    "applyLink": "https://maef.net.in/"
  },
  {
    "id": 93,
    "name": "Ford Foundation Fellowship 2026–27",
    "provider": "Ford Foundation / National Academies of Sciences",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For PhD students committed to diversity in American academia. Next cycle opens October 2026.",
    "amount": "$27,000 – $45,000/year",
    "deadline": "December 2026 (opens October 2026)",
    "status": "OPENING SOON",
    "eligibility": "US citizens/nationals/resident aliens pursuing PhD",
    "applyLink": "https://sites.nationalacademies.org/PGA/FordFellowships/index.htm"
  },
  {
    "id": 94,
    "name": "VLIR-UOS Scholarship Belgium 2027",
    "provider": "Flemish Interuniversity Council (VLIR-UOS)",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For students from developing countries to study Master's in Belgium. Opens September 2026.",
    "amount": "Full tuition + travel + living allowance",
    "deadline": "February 2027 (opens September 2026)",
    "status": "OPENING SOON",
    "eligibility": "Citizens of select developing countries including India for Master's in Belgium",
    "applyLink": "https://www.vliruos.be/en/scholarships"
  },
  {
    "id": 95,
    "name": "Swedish Institute Scholarship 2027",
    "provider": "Swedish Institute",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For global professionals to study Master's in Sweden. Opens October 2026.",
    "amount": "SEK 11,000/month + tuition waiver + travel",
    "deadline": "February 2027 (opens October 2026)",
    "status": "OPENING SOON",
    "eligibility": "Citizens of select countries with 3,000+ hours work experience for Master's in Sweden",
    "applyLink": "https://si.se/en/apply/scholarships/"
  },
  {
    "id": 96,
    "name": "Erasmus+ Scholarship 2026–27",
    "provider": "European Commission",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "EU scholarship program for study, training and volunteering in Europe. Ongoing through universities.",
    "amount": "€1,000 – €2,500/month",
    "deadline": "Varies by program — check portal",
    "status": "OPEN",
    "eligibility": "Students from any country for study/training in Europe",
    "applyLink": "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students"
  },
  {
    "id": 97,
    "name": "Naandi Foundation Scholarship 2026–27",
    "provider": "Naandi Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For underprivileged meritorious students to access quality higher education. Opens June 2026.",
    "amount": "₹40,000 – ₹80,000/year",
    "deadline": "September 30, 2026 (opens June 2026)",
    "status": "OPENING SOON",
    "eligibility": "Students with 80%+ in Class 10/12 from underprivileged background",
    "applyLink": "https://www.naandi.org/scholarship/"
  },
  {
    "id": 98,
    "name": "Maruti Suzuki Scholarship 2026–27",
    "provider": "Maruti Suzuki India Limited",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For auto/mechanical engineering students from EWS. Opens August 2026.",
    "amount": "₹20,000 – ₹40,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Automobile/mechanical engineering students, income criteria applies",
    "applyLink": "https://www.marutisuzuki.com/corporate/csr"
  },
  {
    "id": 99,
    "name": "Bank of Baroda Scholarship 2026–27",
    "provider": "Bank of Baroda",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For meritorious UG/PG students with financial need. Opens August 2026.",
    "amount": "₹25,000 – ₹50,000/year",
    "deadline": "October 31, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "UG/PG students with 65%+ marks, family income < ₹3 LPA",
    "applyLink": "https://www.bankofbaroda.in/about-us/corporate-social-responsibility"
  },
  {
    "id": 100,
    "name": "Dr. Reddy's Foundation LABS Scholarship 2026–27",
    "provider": "Dr. Reddy's Foundation",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For youth from marginalized communities for skill and livelihood training. Opens June 2026.",
    "amount": "Up to ₹50,000/year",
    "deadline": "October 31, 2026 (opens June 2026)",
    "status": "OPENING SOON",
    "eligibility": "Youth aged 18–25 from underprivileged backgrounds for skill training",
    "applyLink": "https://www.drf.foundation/initiatives/labs"
  },
  {
    "id": 101,
    "name": "Central Bank of India Centenary Scholarship 2026–27",
    "provider": "Central Bank of India",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For rural meritorious students pursuing higher education. Opens August 2026.",
    "amount": "₹15,000 – ₹25,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Rural students in UG/PG with 70%+ marks",
    "applyLink": "https://www.centralbankofindia.co.in/en/scholarship"
  },
  {
    "id": 102,
    "name": "ITC Scholarship 2026–27",
    "provider": "ITC Limited",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "For meritorious underprivileged students in ITC's operational areas. Opens August 2026.",
    "amount": "₹25,000 – ₹50,000/year",
    "deadline": "September 30, 2026 (opens August 2026)",
    "status": "OPENING SOON",
    "eligibility": "Students from ITC operational districts, family income < ₹3 LPA",
    "applyLink": "https://www.itcportal.com/sustainability/social-investment.aspx"
  },
  {
    "id": 103,
    "name": "Byju's Scholarship Program 2026",
    "provider": "Byju's – The Learning App",
    "category": [
      "Private",
      "Merit-based"
    ],
    "description": "Free premium learning access + cash grants for meritorious underprivileged students. Ongoing.",
    "amount": "Free subscription worth ₹18,000 + cash grant",
    "deadline": "Ongoing — rolling applications",
    "status": "OPEN",
    "eligibility": "Class 6–12 students from low-income families",
    "applyLink": "https://byjus.com/scholarship/"
  },
  {
    "id": 104,
    "name": "Joint Japan/World Bank Graduate Scholarship 2026",
    "provider": "World Bank & Government of Japan",
    "category": [
      "International",
      "Merit-based"
    ],
    "description": "For development professionals from developing countries to study development-related fields abroad.",
    "amount": "Full tuition + living + health + travel",
    "deadline": "April 30, 2026",
    "status": "OPEN",
    "eligibility": "Citizens of World Bank member developing countries with 3+ years work experience",
    "applyLink": "https://www.worldbank.org/en/programs/scholarships"
  }
];
