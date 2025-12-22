
export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  username?: string;
  birth_date?: string;
  gender?: string;
  location?: string;
  country?: string;
  occupation?: string;
  education_level?: string;
  bio?: string;
  verified: boolean;
  profile_completion: number;
  is_premium: boolean;
  created_at: string;
}

export interface SiteConfig {
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  show_ads: boolean;
  ad_content: string;
  ad_image: string;
  custom_sections: CustomSection[];
}

export interface CustomSection {
  id: string;
  page: string;
  title: string;
  body: string;
  image?: string;
  active: boolean;
}

export interface ProfileDetails {
  user_id: string;
  cultural_background?: string;
  relationship_goal?: string;
  willingness_to_relocate: boolean;
  languages: string[];
  last_active: string;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  occupation: string;
  education: string;
  interests: string[];
  photos: string[];
  relationshipGoals: string;
  languages: string[];
  culturalBackground: string;
  verified: boolean;
  matchScore: number;
}

export interface GashEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  attendees: number;
  type?: 'Virtual' | 'Local';
}

export interface Preference {
  user_id: string;
  distance_km?: number;
  age_min?: number;
  age_max?: number;
  gender_preference?: string;
  created_at?: string;
}

export interface Match {
  id: string;
  user1: string;
  user2: string;
  created_at: string;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'voice' | 'image';
  translatedText?: string;
  created_at: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  type: string;
  content: string;
  read: boolean;
  created_at: string;
}

export enum AppScreen {
  WELCOME = 'welcome',
  SIGNUP = 'signup',
  SIGNIN = 'signin',
  DASHBOARD = 'dashboard',
  BROWSE = 'browse',
  MATCHES = 'matches',
  CHAT = 'chat',
  EVENTS = 'events',
  GROUPS = 'groups',
  PROFILE = 'profile',
  PREMIUM = 'premium',
  USER_DETAIL = 'user_detail',
  SAFETY = 'safety',
  ADMIN = 'admin'
}
