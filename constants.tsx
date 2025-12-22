
import { UserProfile, GashEvent } from './types';

export const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    name: 'Elena Vance',
    age: 29,
    location: 'Berlin, Germany',
    bio: 'Senior Product Designer at a Fintech scale-up. I spent 3 years in Singapore and miss the humidity but love the Berlin art scene. Looking for an intellectual equal who values design and global politics.',
    occupation: 'Design Lead',
    education: 'Bauhaus University Weimar',
    interests: ['Contemporary Art', 'Macroeconomics', 'Techno', 'Urban Cycling'],
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    relationshipGoals: 'Serious Relationship',
    languages: ['German', 'English', 'Russian'],
    culturalBackground: 'European / Slavic',
    verified: true,
    matchScore: 96
  },
  {
    id: '2',
    name: 'Marcus Chen',
    age: 34,
    location: 'Vancouver, Canada',
    bio: 'Renewable Energy Consultant. Half-Taiwanese, raised in the UK. I spend my weekends hiking the Rockies or hunting for the best dim sum. Open to relocating for the right person.',
    occupation: 'Sustainability Consultant',
    education: 'LSE / UBC',
    interests: ['Sustainability', 'Hiking', 'Cuisine', 'Bouldering'],
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
    ],
    relationshipGoals: 'Marriage',
    languages: ['English', 'Mandarin'],
    culturalBackground: 'East Asian / British',
    verified: true,
    matchScore: 92
  },
  {
    id: '3',
    name: 'Zara Mensah',
    age: 27,
    location: 'Accra, Ghana',
    bio: 'Tech Founder & Forbes 30u30. Building the future of Pan-African logistics. I travel to London and NYC monthly. Seeking a partner who understands the hustle and the beauty of tradition.',
    occupation: 'CEO & Founder',
    education: 'Ashesi University',
    interests: ['Entrepreneurship', 'Afrobeats', 'High Fashion', 'Venture Capital'],
    photos: [
      'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=800&q=80'
    ],
    relationshipGoals: 'Committed Partnership',
    languages: ['English', 'Twi', 'French'],
    culturalBackground: 'West African',
    verified: true,
    matchScore: 89
  }
];

export const MOCK_EVENTS: GashEvent[] = [
  {
    id: 'e1',
    title: 'Digital Nomad Summit: Bali 2025',
    type: 'Local',
    date: 'Dec 12, 10:00 AM',
    location: 'Canggu, Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=60',
    attendees: 342,
    description: 'The largest gathering of international remote workers on the island. Networking, surfing, and relationship building.'
  },
  {
    id: 'e2',
    title: 'Polyglot Speed Dating',
    type: 'Virtual',
    date: 'Tonight, 9:00 PM',
    location: 'Gash Metaverse Lounge',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=60',
    attendees: 156,
    description: 'A virtual room where you rotate every 5 minutes, speaking a different language each time. Verified professionals only.'
  }
];
