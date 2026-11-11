export interface ClubEvent {
  id: string;
  title: string;
  tagline: string;
  category: 'Hackathon' | 'Workshop' | 'Symposium' | 'Robotics' | 'Cultural' | 'Ceremony' | 'Competition';
  status: 'upcoming' | 'completed';
  date: string;
  time: string;
  venue: string;
  image: string;
  description: string;
  highlights: string[];
  speakers: string[];
  registrationOpen: boolean;
  registrationLink?: string;
}

export const EVENTS: ClubEvent[] = [
  {
    id: 'evt-badge-2026',
    title: 'Voyagers Badge Ceremony 2K26',
    tagline: 'Badges On, Journeys Begin — Where Identity Meets Responsibility',
    category: 'Ceremony',
    status: 'completed',
    date: 'September 30, 2026',
    time: '11:00 AM - 02:30 PM IST',
    venue: 'SMS Main Auditorium & Conference Hall, SMS Lucknow',
    image: '/images/events/badge_ceremony_2026.jpg',
    description:
      'The official Voyagers Club Badge Ceremony 2K26 held on September 30, 2026 at SMS Lucknow. Official badges were formally pinned on the newly elected 2026–2027 Core Council, Student Coordinators, and Wing Members across Technical, Cultural, Editorial, R&D, and Sports wings.',
    highlights: [
      'Official 2K26 Badge Pinning Ceremony honoring new student leaders and coordinators',
      'Formal induction of 21 new student coordinators across all 6 specialized wings',
      'Keynote addresses on leadership and responsibility by Dr. Niyati Gaur and Dean Dr. Mohd. Hussain',
      'Presidential address by Aman Soni unveiling the 2026–2027 annual club roadmap',
    ],
    speakers: ['Dr. Niyati Gaur (Club Coordinator)', 'Dr. Mohd. Hussain (Dean Engineering)', 'Aman Soni (President, Voyagers)'],
    registrationOpen: false,
  },
  {
    id: 'evt-abhyas-phase1',
    title: 'ABHYAS 2026 — Phase 1: Aptitude & Reasoning Challenge',
    tagline: 'A Multi-Round Analytical Test for 2nd Year Engineers',
    category: 'Competition',
    status: 'completed',
    date: 'September 15, 2026',
    time: '01:30 PM - 04:00 PM IST',
    venue: 'B.Tech Academic Block, SMS Lucknow',
    image: '/images/events/abhyas_aptitude.jpg',
    description:
      'The opening stage of the ABHYAS 2026 evaluation series designed specifically for 2nd Year B.Tech students, focusing on quantitative aptitude, logical reasoning, and rapid analytical deduction.',
    highlights: [
      '120+ 2nd Year B.Tech students contested across engineering departments',
      'Evaluated quantitative mathematics, algorithmic logic, and critical thinking',
      'Merit badges awarded to top scoring students',
      'Fast-track qualification for Voyagers technical wings and project teams',
    ],
    speakers: ['Technical Team Leads', 'Editorial Wing Mentors'],
    registrationOpen: false,
  },
  {
    id: 'evt-abhyas-phase2',
    title: 'ABHYAS 2026 — Phase 2: Machine Coding Test',
    tagline: 'A Test of Code, Syntax, and Algorithmic Grit',
    category: 'Hackathon',
    status: 'completed',
    date: 'October 02, 2026',
    time: '11:00 AM - 03:00 PM IST',
    venue: 'Central Computer Labs, SMS Lucknow',
    image: '/images/events/abhyas_machine_test.jpg',
    description:
      'A rigorous live programming test hosted in SMS computer labs for 3rd Year B.Tech students, testing their data structure implementation, algorithmic complexity, and syntax troubleshooting under time pressure.',
    highlights: [
      'Timed competitive programming challenges on live terminal IDEs',
      'Automated test suite execution evaluating memory and time limits',
      'Mentorship and real-time guidance from Voyagers senior developers',
      'Certificate of Algorithmic Excellence awarded to top performers',
    ],
    speakers: ['Aman Soni (President)', 'Technical Coordinators'],
    registrationOpen: false,
  },
  {
    id: 'evt-abhyas-phase3',
    title: 'ABHYAS 2026 — Phase 3: Communication Drive',
    tagline: '2 Minutes, One Voice, Endless Possibilities',
    category: 'Cultural',
    status: 'completed',
    date: 'October 12 - 20, 2026',
    time: '02:00 PM - 05:00 PM IST',
    venue: 'Engineering Seminar Hall & Amphitheatre, SMS Lucknow',
    image: '/images/events/abhyas_communication.jpg',
    description:
      'A thrilling extempore and public speaking battle organized by the Cultural & Editorial wings, challenging students to step up to the podium and showcase articulation, persuasive reasoning, and leadership confidence.',
    highlights: [
      'Strict 2-minute extempore speaking format on spontaneous topics',
      'Evaluated by faculty on poise, diction, clarity, and analytical depth',
      'Live audience cheering and interactive peer evaluation',
      'Voyagers Orator Laurels awarded to standout speakers',
    ],
    speakers: ['Editorial Team Leads', 'Cultural Wing Mentors'],
    registrationOpen: false,
  },
  {
    id: 'evt-research-lecture',
    title: 'R&D Conclave: Expert Lecture on Research Papers',
    tagline: 'Demystifying Academic Research, IEEE/Scopus Indexing & Paper Writing',
    category: 'Workshop',
    status: 'completed',
    date: 'October 05, 2026',
    time: '12:00 PM - 03:00 PM IST',
    venue: 'SMS Conference Hall, Lucknow',
    image: '/images/events/research_paper_lecture.jpg',
    description:
      'An insightful technical conclave conducted by the Voyagers R&D Wing featuring an expert masterclass by Dr. Mohd. Hussain (Dean Engineering) on formulating hypotheses, writing peer-reviewed papers, and indexing in IEEE/Springer journals.',
    highlights: [
      'Comprehensive breakdown of research paper structure and methodology',
      'Guidance on literature review, citation tools (Zotero/Mendeley), and plagiarism ethics',
      'R&D Wing support initiative for student-led patent and paper submissions',
      'Interactive Q&A session with Dean of Engineering',
    ],
    speakers: ['Dr. Mohd. Hussain (Dean Engineering, SMS Lucknow)'],
    registrationOpen: false,
  },
  {
    id: 'evt-hcl-visit',
    title: 'HCLTech 10-Year Celebration Delegation',
    tagline: 'Voyagers Students in Presence of Hon’ble CM Yogi Adityanath Ji',
    category: 'Symposium',
    status: 'completed',
    date: 'October 12, 2026',
    time: '10:00 AM - 04:00 PM IST',
    venue: 'HCLTech IT City Campus, Lucknow',
    image: '/images/events/hcl_celebration.jpg',
    description:
      'A high-profile industrial delegation where Voyagers members and final year engineering students represented SMS Lucknow at HCLTech Lucknow’s 10th anniversary milestone in the gracious presence of Hon’ble Chief Minister Yogi Adityanath Ji.',
    highlights: [
      'Privilege of attending keynote address by Hon’ble CM Yogi Adityanath Ji',
      'Interactive tour of state-of-the-art enterprise software & AI operations',
      'Direct interactions with senior HCL executives and engineering architects',
      'Strengthened campus placement and corporate mentorship relationships',
    ],
    speakers: ['Hon’ble Chief Minister Yogi Adityanath Ji', 'HCLTech Leadership Team'],
    registrationOpen: false,
  },
  {
    id: 'evt-ingenuity-fest',
    title: 'INGENUITY 2K24: Annual Tech & Cultural Mega-Fest',
    tagline: 'TechTrek Hackathon, RoboRumble, InnovateX, Arts & Sports Conclave',
    category: 'Hackathon',
    status: 'completed',
    date: 'October 04 - 06, 2024',
    time: '09:00 AM - 08:00 PM Daily',
    venue: 'SMS Lucknow Campus & Auditorium Grounds',
    image: '/images/events/ingenuity_techtrek.jpg',
    description:
      'The largest multi-domain collegiate festival organized by the Department of Engineering and Voyagers Club, bringing together coding marathons, robotics combat, startup pitching, performing arts, and track sports under one grand banner.',
    highlights: [
      'TechTrek 24-Hour Hackathon & LeetQuest Competitive Programming',
      'RoboRumble Arena battle featuring autonomous and manual bot duels',
      'InnovateX Student Startup Pitch with prototype demonstrations',
      'Lucknow Got Talent, Suro k Sartaj (Singing), Jhoom Barabar Jhoom (Dance)',
      'Inter-departmental Volleyball, Relay Race, Javelin Throw, and Rangoli Arts',
    ],
    speakers: ['Faculty Coordinators', 'Industry Jury Panel'],
    registrationOpen: false,
  },
  {
    id: 'evt-codeathon-hackverse',
    title: 'Code-A-Thon & HackVerse: Winter Tech Sprint',
    tagline: 'The First Landmark Hackathon by the Voyagers Technical Team',
    category: 'Hackathon',
    status: 'completed',
    date: 'January 09 - 10, 2024',
    time: '10:00 AM - 05:00 PM IST',
    venue: 'SMS Computer Science Lab 1 & 2',
    image: '/images/events/codeathon_hackverse.jpg',
    description:
      'The inaugural competitive coding and software development hackathon organized by the newly formed Voyagers Technical Team, sparking a campus-wide culture of collaborative problem-solving and algorithmic programming.',
    highlights: [
      'Over 30 collegiate teams built functional web and algorithmic prototypes',
      'Rigorous code reviews by senior engineering faculty',
      'Grand valedictory and trophy distribution ceremony',
      'Established the annual tradition of Voyagers hackathons',
    ],
    speakers: ['Technical Coordinators', 'Faculty Mentors'],
    registrationOpen: false,
  },
  {
    id: 'evt-diwali-night',
    title: 'Diwali Grand Gala & Dandiya Night 2026',
    tagline: '11,000 Diyas, Traditional Dandiya & Live Powerhouse DJs',
    category: 'Cultural',
    status: 'completed',
    date: 'November 03, 2026',
    time: '05:30 PM - 10:00 PM IST',
    venue: 'SMS Central Courtyard & Grand Amphitheatre',
    image: '/images/events/diwali_dandiya_gala.jpg',
    description:
      'An unforgettable celebration of light and unity featuring the lighting of 11,000 diyas across campus, high-energy Dandiya Garba dancing, student music acts, and two powerhouse DJs lighting up the night.',
    highlights: [
      'Spectacular campus illumination with 11,000 traditional earthen diyas',
      'Live sets by 2 renowned powerhouse DJs with stage lighting and effects',
      'Inter-branch traditional Dandiya dance showcase and best-dressed awards',
      'Festive banquet and music performances by student cultural artists',
    ],
    speakers: ['Cultural Team Coordinators', 'Executive Council'],
    registrationOpen: false,
  },
];
