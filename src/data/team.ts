export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tier: 'faculty' | 'executive' | 'core';
  department: string;
  bio: string;
  avatarColor: string;
  image?: string;
  links: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
  isEditablePlaceholder?: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'fac-1',
    name: 'Prof. (Dr.) B. R. Singh',
    role: 'Chief Patron & Director',
    tier: 'faculty',
    department: 'School of Management Sciences, Lucknow',
    bio: 'Guiding the visionary growth of SMS Lucknow with over three decades of academic leadership and research stewardship.',
    avatarColor: 'from-[#C5A052] to-[#0A1E3B]',
    links: {
      email: 'director@smslucknow.ac.in',
      linkedin: 'https://linkedin.com/school/sms-lucknow',
    },
    isEditablePlaceholder: true,
  },
  {
    id: 'fac-2',
    name: 'Dr. Dharmendra Singh',
    role: 'Faculty Coordinator & Chief Advisor',
    tier: 'faculty',
    department: 'Department of Computer Science & Engineering',
    bio: 'Dedicated faculty mentor driving student technical clubs, competitive hackathon teams, and industry incubation programs.',
    avatarColor: 'from-[#E6C77A] to-[#07182F]',
    links: {
      email: 'coordinator.voyagers@smslucknow.ac.in',
      linkedin: 'https://linkedin.com',
    },
    isEditablePlaceholder: true,
  },
  {
    id: 'lead-1',
    name: 'Aman Soni',
    role: 'Club President',
    tier: 'executive',
    department: 'Computer Science & Engineering',
    bio: 'Leading club vision, strategic partnerships, and technical delegations across national hackathons and symposiums.',
    avatarColor: 'from-[#C5A052] to-[#0A1E3B]',
    links: {
      linkedin: 'https://linkedin.com/in/aman-soni',
      github: 'https://github.com/aman-soni',
      email: 'president.voyagers@smslucknow.ac.in',
    },
    isEditablePlaceholder: false,
  },
  {
    id: 'lead-2',
    name: 'Priya Sharma',
    role: 'Vice President & Head of Operations',
    tier: 'executive',
    department: 'Management & IT',
    bio: 'Overseeing club operations, member recruitment, inter-departmental synergy, and external institutional alliances.',
    avatarColor: 'from-[#E6C77A] to-[#122849]',
    links: {
      linkedin: 'https://linkedin.com',
      email: 'vp.voyagers@smslucknow.ac.in',
    },
    isEditablePlaceholder: true,
  },
  {
    id: 'core-1',
    name: 'Rohan Verma',
    role: 'Technical & Robotics Lead',
    tier: 'core',
    department: 'Electronics & Communication',
    bio: 'Architecting hardware labs, autonomous rovers, and guiding teams in robotics and IoT hackathons.',
    avatarColor: 'from-[#8FA8CB] to-[#07182F]',
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    isEditablePlaceholder: true,
  },
  {
    id: 'core-2',
    name: 'Ananya Srivastava',
    role: 'Head of Creative & Media',
    tier: 'core',
    department: 'Computer Applications',
    bio: 'Directing the visual identity, digital publications, 3D media, and official creative assets of Voyagers.',
    avatarColor: 'from-[#C5A052] to-[#16355F]',
    links: {
      linkedin: 'https://linkedin.com',
    },
    isEditablePlaceholder: true,
  },
  {
    id: 'core-3',
    name: 'Vikas Maurya',
    role: 'Lead — Events & Logistics',
    tier: 'core',
    department: 'Mechanical Engineering',
    bio: 'Ensuring seamless execution of annual flagship conclaves, workshops, stage acoustics, and hospitality.',
    avatarColor: 'from-[#E6C77A] to-[#0A1E3B]',
    links: {
      linkedin: 'https://linkedin.com',
    },
    isEditablePlaceholder: true,
  },
  {
    id: 'core-4',
    name: 'Shreya Pandey',
    role: 'Public Relations & Outreach Lead',
    tier: 'core',
    department: 'Business Administration',
    bio: 'Managing corporate sponsorships, community engagement, press releases, and collegiate outreach.',
    avatarColor: 'from-[#C5A052] to-[#07182F]',
    links: {
      linkedin: 'https://linkedin.com',
    },
    isEditablePlaceholder: true,
  },
];
