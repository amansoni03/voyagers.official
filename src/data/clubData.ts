/**
 * Centralized Brand & Club Data for VOYAGERS Student Club, SMS Lucknow
 * Editable configuration for official records and statistics.
 */

export interface ClubMetric {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: 'trophy' | 'calendar' | 'users' | 'star';
  isEditablePlaceholder?: boolean;
}

export const CLUB_CONFIG = {
  name: 'VOYAGERS',
  subname: 'Student Club',
  institution: 'School of Management Sciences (SMS)',
  location: 'Lucknow, Uttar Pradesh, India',
  campusAddress: 'Kasimpur Biruha, Sultanpur Road, P.O. Gosainganj, Lucknow - 226501',
  tagline: 'Explore. Create. Achieve.',
  heroKicker: 'STUDENT CLUB OF SMS LUCKNOW',
  description:
    'A premier student-led technical, cultural, and innovation collective uniting aspiring leaders, engineers, and visionaries to explore new frontiers and shape tomorrow.',
  email: 'voyagers.club@smslucknow.ac.in',
  phone: '+91 522 281 7891 / +91 95060 33170',
  socials: {
    instagram: 'https://instagram.com/voyagers_sms',
    linkedin: 'https://linkedin.com/school/sms-lucknow',
    github: 'https://github.com/voyagers-sms',
    youtube: 'https://youtube.com/@smslucknowofficial',
  },
  established: 2021,
  motto: 'Per Scientiam Ad Astra — Beyond Boundaries, Beyond Expectations',
};

export const CLUB_STATISTICS: ClubMetric[] = [
  {
    id: 'awards',
    value: 15,
    suffix: '+',
    label: 'Prestigious Awards',
    sublabel: 'National hackathons & inter-college podiums',
    icon: 'trophy',
    isEditablePlaceholder: true,
  },
  {
    id: 'events',
    value: 20,
    suffix: '+',
    label: 'Events & Summits',
    sublabel: 'Workshops, hackathons & flagship conferences',
    icon: 'calendar',
    isEditablePlaceholder: true,
  },
  {
    id: 'members',
    value: 500,
    suffix: '+',
    label: 'Active Members',
    sublabel: 'Passionate student innovators across departments',
    icon: 'users',
    isEditablePlaceholder: true,
  },
  {
    id: 'vision',
    value: 1,
    suffix: ' Unified',
    label: 'Vision to Excel',
    sublabel: 'Empowering future leaders with global standards',
    icon: 'star',
    isEditablePlaceholder: false,
  },
];

export const ABOUT_PILLARS = [
  {
    id: 'vision',
    title: 'Our Vision',
    summary: 'A transformative incubator of talent that bridges classroom theory with real-world technological and creative innovation.',
    points: [
      'Nurture inquisitive minds to pioneer solutions in AI, engineering, and digital arts',
      'Foster interdisciplinary collaboration across management and technical streams',
      'Establish SMS Lucknow as a premier hub for collegiate hackathon winners and creators',
    ],
  },
  {
    id: 'mission',
    title: 'Our Mission',
    summary: 'To provide students with a launchpad for boundless experimentation, peer-to-peer mentorship, and national competitive excellence.',
    points: [
      'Conduct regular masterclasses, code sprints, and hands-on hardware workshops',
      'Organize the flagship annual national tech summit and inter-college symposium',
      'Cultivate industry networks, internship pathways, and alumni mentorship programs',
    ],
  },
  {
    id: 'distinct',
    title: 'What Makes Voyagers Different',
    summary: 'A culture anchored in the royal institutional traditions of SMS Lucknow, propelled by modern cutting-edge ambition.',
    points: [
      'Student-driven autonomy backed by dedicated faculty guidance',
      'Equal emphasis on technical precision, design aesthetics, and public leadership',
      'Real funding and resources for student prototype development',
    ],
  },
];
