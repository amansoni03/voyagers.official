export interface ClubEvent {
  id: string;
  title: string;
  tagline: string;
  category: 'Hackathon' | 'Workshop' | 'Symposium' | 'Robotics' | 'Cultural';
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
    id: 'evt-1',
    title: 'VoyageHacks 2026: National Hackathon',
    tagline: '36 Hours of Non-stop Innovation, Code & Prototypes',
    category: 'Hackathon',
    status: 'upcoming',
    date: 'November 20 - 22, 2026',
    time: '09:00 AM IST onwards',
    venue: 'SMS Main Auditorium & Innovation Lab, SMS Lucknow',
    image: '/src/assets/images/voyagers_hackathon_summit_1793430500132.jpg',
    description:
      'The flagship 36-hour collegiate innovation sprint inviting 100+ multidisciplinary teams from across India to solve critical challenges in generative AI, urban sustainability, and smart logistics.',
    highlights: [
      '₹1,50,000+ Total Prize Pool with Seed Funding Opportunities',
      'Mentorship from top tech leads from Microsoft, Google, and Amazon',
      'Direct interview fast-tracks for top 5 finalist teams',
      '24/7 high-speed fiber network and dedicated hardware testing lab',
    ],
    speakers: ['Dr. R. K. Singh (Dean Academics)', 'Aman Verma (Staff AI Engineer)', 'Pooja Tiwari (VC Partner)'],
    registrationOpen: true,
  },
  {
    id: 'evt-2',
    title: 'AI & Edge Robotics Masterclass',
    tagline: 'From Microcontrollers to Computer Vision Pipelines',
    category: 'Robotics',
    status: 'upcoming',
    date: 'December 05, 2026',
    time: '10:30 AM - 04:30 PM IST',
    venue: 'Electronics & Embedded Systems Lab, SMS Campus',
    image: '/src/assets/images/voyagers_robotics_workshop_1793430500043.jpg',
    description:
      'An intensive hands-on lab on integrating ESP32 and Raspberry Pi cameras with lightweight ONNX neural models for real-time edge obstacle detection.',
    highlights: [
      'Complete hardware component kit provided to every attendee',
      'Hands-on deployment of real-time computer vision models',
      'Take-home autonomous robotic chassis project',
      'Certification of Completion backed by SMS Lucknow',
    ],
    speakers: ['Er. Ashutosh Dwivedi (Robotics Specialist)', 'Simran Kaur (Hardware Lead)'],
    registrationOpen: true,
  },
  {
    id: 'evt-3',
    title: 'Horizon Leadership Conclave & Tech Gala',
    tagline: 'Celebrating Student Excellence, Innovation & Community',
    category: 'Symposium',
    status: 'upcoming',
    date: 'January 18, 2027',
    time: '05:00 PM - 09:30 PM IST',
    venue: 'SMS Grand Amphitheatre, Lucknow',
    image: '/src/assets/images/voyagers_annual_gala_1793430497265.jpg',
    description:
      'An evening of visionary keynote addresses, induction of incoming Voyagers office bearers, presentation of the Annual Excellence Awards, and alumni networking banquet.',
    highlights: [
      'Keynote addresses by prominent enterprise leaders and alumni',
      'Conferral of the Voyagers Gold Honor to outstanding student contributors',
      'Launch of the 2027 Voyagers Research Journal',
      'Formal dinner and cultural musical performance',
    ],
    speakers: ['Prof. (Dr.) B. R. Singh (Director, SMS)', 'Distinguished Alumni Panelists'],
    registrationOpen: true,
  },
  {
    id: 'evt-4',
    title: 'Voyagers Web & 3D Spatial Jam 2025',
    tagline: 'Pushing the Canvas: WebGL, Three.js & Creative Frontend',
    category: 'Workshop',
    status: 'completed',
    date: 'August 14, 2025',
    time: '11:00 AM - 05:00 PM IST',
    venue: 'Computer Science Lab 3, SMS Lucknow',
    image: '/src/assets/images/voyagers_about_heritage_1793430498991.jpg',
    description:
      'A full-day intensive creative coding sprint where 80+ students built interactive 3D WebGL experiences using Three.js and modern animation engines.',
    highlights: [
      'Explored GPU shaders, procedural textures, and orbital physics',
      'Showcased 24 completed interactive web prototypes by evening',
      '1st prize awarded to historical 3D Lucknow monuments archive',
    ],
    speakers: ['Aman Soni (President, Voyagers)', 'Web Guild Mentors'],
    registrationOpen: false,
  },
  {
    id: 'evt-5',
    title: 'CodeSprint Inter-College Marathon',
    tagline: 'Algorithm Mastery, Competitive Programming & Data Structures',
    category: 'Hackathon',
    status: 'completed',
    date: 'April 22, 2025',
    time: '10:00 AM - 06:00 PM IST',
    venue: 'SMS High-Performance Computing Center',
    image: '/src/assets/images/voyagers_hackathon_summit_1793430500132.jpg',
    description:
      'A grueling algorithmic competition featuring dynamic programming, graph traversal, and mathematical puzzles contested by 45 collegiate teams.',
    highlights: [
      '3 rounds of increasing algorithmic complexity',
      'Real-time automated test runner & scoreboard',
      'Trophies and certificates presented by Dean of Engineering',
    ],
    speakers: ['Dr. Saurabh Srivastava (HOD, CS/IT)'],
    registrationOpen: false,
  },
];
