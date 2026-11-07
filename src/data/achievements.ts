export interface Achievement {
  id: string;
  title: string;
  competition: string;
  position: string;
  category: 'Hackathons' | 'Robotics' | 'Design & Web' | 'Institutional';
  date: string;
  year: string;
  description: string;
  team: string[];
  certificateNumber: string;
  image: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Smart City Automation & IoT Solution',
    competition: 'Smart India Hackathon Regional Conclave',
    position: '1st Place & Grand Champion',
    category: 'Hackathons',
    date: 'October 2025',
    year: '2025',
    description:
      'Engineered an edge-AI IoT sensor network for municipal power grid optimization and automated fault detection, recognized for industrial viability.',
    team: ['Aman Soni', 'Rohan Sharma', 'Priya Verma', 'Devendra Singh'],
    certificateNumber: 'VOY-SIH-2025-01',
    image: '/images/voyagers_hackathon_summit.jpg',
  },
  {
    id: 'ach-2',
    title: 'Autonomous Navigation Rover Championship',
    competition: 'North India Inter-Collegiate Robocon',
    position: 'Gold Trophy — Best Engineering Design',
    category: 'Robotics',
    date: 'March 2025',
    year: '2025',
    description:
      'Designed and programmed a LiDAR-guided omnidirectional rover capable of navigating obstacle-dense subterranean terrains with sub-centimeter accuracy.',
    team: ['Voyagers Robotics Core', 'Lead: Ayush Mehrotra', 'Hardware: Simran Kaur'],
    certificateNumber: 'VOY-ROBO-2025-09',
    image: '/images/voyagers_robotics_workshop.jpg',
  },
  {
    id: 'ach-3',
    title: 'Institutional Excellence & Leadership Shield',
    competition: 'SMS Annual Academic & Club Honors',
    position: 'Best Technical & Innovation Club of the Year',
    category: 'Institutional',
    date: 'December 2024',
    year: '2024',
    description:
      'Awarded the prestigious Director’s Rolling Trophy for exemplary student engagement, hosting 8 state-level symposiums, and raising academic standing.',
    team: ['Voyagers Executive Council', 'Faculty Mentors'],
    certificateNumber: 'SMS-HONOR-2024-C03',
    image: '/images/voyagers_annual_gala.jpg',
  },
  {
    id: 'ach-4',
    title: 'Next-Gen FinTech Portal & Security Sprint',
    competition: 'National Collegiate Cyber Challenge',
    position: '1st Runner Up (Silver Medal)',
    category: 'Hackathons',
    date: 'August 2024',
    year: '2024',
    description:
      'Developed a zero-knowledge proof authentication framework for micro-lending portals with real-time fraud telemetry and sub-second latency.',
    team: ['Shubham Pandey', 'Ananya Gupta', 'Vikas Maurya'],
    certificateNumber: 'VOY-CYBER-2024-22',
    image: '/images/voyagers_hackathon_summit.jpg',
  },
  {
    id: 'ach-5',
    title: 'SMS Lucknow Digital Archive & 3D Interactive Web',
    competition: 'Awadh Digital Design & Web Olympiad',
    position: 'Winner — Outstanding UI/UX Experience',
    category: 'Design & Web',
    date: 'April 2024',
    year: '2024',
    description:
      'Created an immersive 3D digital experience of the School of Management Sciences Lucknow campus using WebGL, spatial audio, and editorial typography.',
    team: ['Voyagers Design Guild', 'UI Architect: Ankit Saxena'],
    certificateNumber: 'VOY-UX-2024-11',
    image: '/sms-lucknow-campus.jpg',
  },
  {
    id: 'ach-6',
    title: 'Predictive Agritech Drone Telemetry',
    competition: 'State Innovation & Startup Fest UP',
    position: 'Top 3 Finalist & Special Jury Award',
    category: 'Robotics',
    date: 'November 2023',
    year: '2023',
    description:
      'Field-tested multispectral crop-health analysis payload on low-cost drone airframes, delivering actionable fertilizer recommendations to local farmers.',
    team: ['Arjun Rastogi', 'Mohit Yadav', 'Neha Mishra'],
    certificateNumber: 'VOY-AGRI-2023-04',
    image: '/images/voyagers_robotics_workshop.jpg',
  },
];
