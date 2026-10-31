export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hackathons' | 'Workshops' | 'Celebrations' | 'Campus';
  date: string;
  image: string;
  description: string;
  aspect: 'landscape' | 'portrait' | 'standard';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-campus',
    title: 'School of Management Sciences (SMS) Lucknow — Main Academic Facade',
    category: 'Campus',
    date: '2026',
    image: '/sms-lucknow-campus.jpg',
    description: 'The monumental facade and grand amphitheatre steps of SMS Lucknow, the official institute of Voyagers.',
    aspect: 'landscape',
  },
  {
    id: 'gal-1',
    title: 'Voyagers Annual Excellence Gala & Trophy Honors',
    category: 'Celebrations',
    date: 'December 2024',
    image: '/src/assets/images/voyagers_annual_gala_1793430497265.jpg',
    description: 'Celebrating club achievements with faculty mentors and student awardees in the grand auditorium.',
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: 'Collegiate Hackathon Innovation War Room',
    category: 'Hackathons',
    date: 'October 2025',
    image: '/src/assets/images/voyagers_hackathon_summit_1793430500132.jpg',
    description: 'Students collaborating through the midnight hours building AI-driven hardware and software solutions.',
    aspect: 'landscape',
  },
  {
    id: 'gal-3',
    title: 'Advanced Embedded Systems & Robotics Lab',
    category: 'Workshops',
    date: 'March 2025',
    image: '/src/assets/images/voyagers_robotics_workshop_1793430500043.jpg',
    description: 'Calibrating microcontrollers and testing autonomous sensor feedback with student engineers.',
    aspect: 'standard',
  },
  {
    id: 'gal-5',
    title: 'CodeSprint Finale Presentation & Jury Defense',
    category: 'Hackathons',
    date: 'April 2025',
    image: '/src/assets/images/voyagers_hackathon_summit_1793430500132.jpg',
    description: 'Finalists pitching their working software architecture to industry judges and academic leads.',
    aspect: 'standard',
  },
  {
    id: 'gal-6',
    title: 'Robotics Guild Autonomous Rover Calibration',
    category: 'Workshops',
    date: 'February 2025',
    image: '/src/assets/images/voyagers_robotics_workshop_1793430500043.jpg',
    description: 'Hands-on hardware troubleshooting and sensor testing ahead of the North India Robocon challenge.',
    aspect: 'standard',
  },
];
