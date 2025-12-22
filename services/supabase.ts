
import { createClient } from '@supabase/supabase-js';
import { Profile, ProfileDetails, Preference, Match, Message, AppNotification, SiteConfig } from '../types';

const supabaseUrl = 'https://kzavfljlydxoyvimniph.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6YXZmbGpseWR4b3l2aW1uaXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0Mjk5OTAsImV4cCI6MjA4MjAwNTk5MH0.hTbNwHhaFJCQDBf7zT9nbTpfmsPe8fyi3mKZK8aFhoI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Site Config / CMS APIs ---
export const getSiteConfig = async (): Promise<SiteConfig> => {
  const { data, error } = await supabase.from('site_config').select('*').single();
  if (error || !data) {
    return {
      hero_title: "Beyond Borders",
      hero_subtitle: "The global elite dating platform for serious professionals.",
      hero_image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=1200&q=80",
      show_ads: false,
      ad_content: "Upgrade to Gash Plus for a global reach.",
      ad_image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
      custom_sections: []
    };
  }
  return data as SiteConfig;
};

export const updateSiteConfig = async (config: Partial<SiteConfig>) => {
  return supabase.from('site_config').upsert({ id: 1, ...config });
};

// --- Profile APIs ---
export const getMyProfile = async (userId: string) => {
  const profile = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  const details = await supabase.from('profile_details').select('*').eq('user_id', userId).maybeSingle();
  const preferences = await supabase.from('preferences').select('*').eq('user_id', userId).maybeSingle();
  const photos = await supabase.from('photos').select('*').eq('user_id', userId);

  return { 
    profile: profile.data, 
    details: details.data, 
    preferences: preferences.data,
    photos: photos.data || [],
    error: profile.error 
  };
};

export const updateFullProfile = async (
  userId: string,
  profileData: Partial<Profile>,
  detailsData: Partial<ProfileDetails> = {},
  prefData: Partial<Preference> = {}
) => {
  const promises = [];
  if (Object.keys(profileData).length > 0) promises.push(supabase.from('profiles').upsert({ id: userId, ...profileData }));
  if (Object.keys(detailsData).length > 0) promises.push(supabase.from('profile_details').upsert({ user_id: userId, ...detailsData }));
  if (Object.keys(prefData).length > 0) promises.push(supabase.from('preferences').upsert({ user_id: userId, ...prefData }));
  return Promise.all(promises);
};

export const updateProfileCompletion = async (userId: string, percentage: number) => {
  return supabase.from('profiles').update({ profile_completion: percentage }).eq('id', userId);
};

// --- Monetization ---
export const upgradeToPremium = async (userId: string) => {
  return supabase.from('profiles').update({ is_premium: true }).eq('id', userId);
};

// --- Notifications ---
export const getNotifications = async (userId: string) => {
  return supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

export const markNotificationRead = async (id: string) => {
  return supabase.from('notifications').update({ read: true }).eq('id', id);
};

// --- Discovery & Interaction (Step 3 Match Logic) ---
export const likeUser = async (fromUserId: string, toUserId: string, type: 'like' | 'super_like' = 'like') => {
  // 1. Record the like
  const { error: likeError } = await supabase.from('likes').insert({
    from_user: fromUserId,
    to_user: toUserId,
    type
  });

  if (likeError) throw likeError;

  // 2. Check for mutual like (Atomic Match Creation)
  const { data: mutualLike } = await supabase
    .from('likes')
    .select('id')
    .eq('from_user', toUserId)
    .eq('to_user', fromUserId)
    .maybeSingle();

  if (mutualLike) {
    const { data: match, error: matchError } = await supabase
      .from('matches')
      .insert({ user1: fromUserId, user2: toUserId })
      .select()
      .single();
    
    if (matchError) throw matchError;
    return { match, isNewMatch: true };
  }

  return { isNewMatch: false };
};

// --- Messaging APIs ---
export const fetchMatches = async (userId: string) => {
  const { data, error } = await supabase
    .from('matches')
    .select('*, user1(*), user2(*)')
    .or(`user1.eq.${userId},user2.eq.${userId}`);
  
  return { data: data as any[], error };
};

export const getMessages = async (matchId: string) => {
  return supabase
    .from('messages')
    .select('*')
    .eq('match_id', matchId)
    .order('created_at', { ascending: true });
};

export const sendMessage = async (matchId: string, senderId: string, content: string, type: 'text' | 'voice' | 'image' = 'text') => {
  return supabase.from('messages').insert({
    match_id: matchId,
    sender_id: senderId,
    content,
    message_type: type,
    created_at: new Date().toISOString()
  });
};
