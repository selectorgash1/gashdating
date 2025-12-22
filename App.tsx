
import React, { useState, useEffect } from 'react';
import { AppScreen, SiteConfig } from './types';
import { supabase, getMyProfile, getSiteConfig } from './services/supabase';
import { MOCK_USERS } from './constants';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import DashboardScreen from './screens/DashboardScreen';
import BrowseScreen from './screens/BrowseScreen';
import MatchesScreen from './screens/MatchesScreen';
import ChatScreen from './screens/ChatScreen';
import EventsScreen from './screens/EventsScreen';
import GroupsScreen from './screens/GroupsScreen';
import ProfileScreen from './screens/ProfileScreen';
import PremiumScreen from './screens/PremiumScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';
import SafetyScreen from './screens/SafetyScreen';
import AdminDashboard from './screens/AdminDashboard';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import AdBanner from './components/AdBanner';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.WELCOME);
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [viewingUser, setViewingUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      // Fetch dynamic config first
      const config = await getSiteConfig();
      setSiteConfig(config);

      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      if (initialSession) await checkStatus(initialSession.user.id);
      
      // Artificial delay for branding splash
      setTimeout(() => setIsLoading(false), 1500);
    };

    initializeApp();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkStatus(session.user.id);
      } else {
        setCurrentScreen(AppScreen.WELCOME);
        setUserProfile(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkStatus = async (userId: string) => {
    const { profile } = await getMyProfile(userId);
    if (profile) {
      setUserProfile(profile);
      if (profile.profile_completion < 100) {
        setCurrentScreen(AppScreen.SIGNUP);
      } else if ([AppScreen.WELCOME, AppScreen.SIGNIN, AppScreen.SIGNUP].includes(currentScreen)) {
        setCurrentScreen(AppScreen.DASHBOARD);
      }
    } else {
      setCurrentScreen(AppScreen.SIGNUP);
    }
  };

  const navigateTo = (screen: AppScreen, params?: any) => {
    if (screen === AppScreen.CHAT && params?.matchId) {
      setActiveChatId(params.matchId);
    }
    if (screen === AppScreen.USER_DETAIL && params?.user) {
      setViewingUser(params.user);
    }
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const onSignInComplete = (admin: boolean = false) => {
    if (admin) {
      setIsAdmin(true);
      setCurrentScreen(AppScreen.ADMIN);
    } else {
      setCurrentScreen(AppScreen.DASHBOARD);
    }
  };

  const refreshConfig = async () => {
    const config = await getSiteConfig();
    setSiteConfig(config);
  };

  const renderContent = () => {
    if (isLoading) return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-20 h-20 bg-rose-500 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(225,29,72,0.4)] mb-8">
            <span className="text-4xl text-white font-black">G</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter">Gash Dating</h1>
          <p className="text-rose-500 font-black uppercase text-[10px] tracking-[0.4em] mt-2">Connecting Worlds</p>
        </div>
      </div>
    );

    switch (currentScreen) {
      case AppScreen.WELCOME:
        return <WelcomeScreen config={siteConfig} onStart={() => navigateTo(AppScreen.SIGNUP)} onSignIn={() => navigateTo(AppScreen.SIGNIN)} />;
      case AppScreen.SIGNUP:
        return <SignUpScreen onComplete={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.SIGNIN:
        return <SignInScreen onComplete={onSignInComplete} onBack={() => navigateTo(AppScreen.WELCOME)} />;
      case AppScreen.DASHBOARD:
        return <DashboardScreen siteConfig={siteConfig} onSelectUser={(id) => navigateTo(AppScreen.USER_DETAIL, { user: MOCK_USERS.find(u => u.id === id) })} />;
      case AppScreen.BROWSE:
        return <BrowseScreen siteConfig={siteConfig} onSelectUser={(user) => navigateTo(AppScreen.USER_DETAIL, { user })} />;
      case AppScreen.MATCHES:
        return <MatchesScreen siteConfig={siteConfig} onChat={(id) => navigateTo(AppScreen.CHAT, { matchId: id })} />;
      case AppScreen.CHAT:
        return <ChatScreen matchId={activeChatId || '1'} onBack={() => navigateTo(AppScreen.MATCHES)} />;
      case AppScreen.EVENTS:
        return <EventsScreen onOpenGroups={() => navigateTo(AppScreen.GROUPS)} />;
      case AppScreen.GROUPS:
        return <GroupsScreen onBack={() => navigateTo(AppScreen.EVENTS)} />;
      case AppScreen.PROFILE:
        return <ProfileScreen onUpgrade={() => navigateTo(AppScreen.PREMIUM)} onOpenSafety={() => navigateTo(AppScreen.SAFETY)} />;
      case AppScreen.PREMIUM:
        return <PremiumScreen onSuccess={() => navigateTo(AppScreen.PROFILE)} />;
      case AppScreen.SAFETY:
        return <SafetyScreen onBack={() => navigateTo(AppScreen.PROFILE)} />;
      case AppScreen.ADMIN:
        return <AdminDashboard initialConfig={siteConfig} onUpdateConfig={refreshConfig} />;
      case AppScreen.USER_DETAIL:
        return viewingUser ? (
          <ProfileDetailScreen 
            user={viewingUser} 
            onBack={() => navigateTo(AppScreen.DASHBOARD)} 
            onLike={() => navigateTo(AppScreen.DASHBOARD)}
            onPass={() => navigateTo(AppScreen.DASHBOARD)}
          />
        ) : <DashboardScreen siteConfig={siteConfig} onSelectUser={() => {}} />;
      default:
        return <DashboardScreen siteConfig={siteConfig} onSelectUser={() => {}} />;
    }
  };

  const isOnboarding = currentScreen === AppScreen.SIGNUP;
  const isAuth = [AppScreen.WELCOME, AppScreen.SIGNIN].includes(currentScreen);
  const isImmersive = [AppScreen.CHAT, AppScreen.USER_DETAIL, AppScreen.PREMIUM, AppScreen.SAFETY, AppScreen.GROUPS, AppScreen.ADMIN].includes(currentScreen);
  const showNav = (session || isAdmin) && !isAuth && !isOnboarding && !isImmersive;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden font-sans text-slate-900 selection:bg-rose-100">
      {showNav && <TopNav currentScreen={currentScreen} notificationsCount={1} onNavigate={navigateTo} />}
      {showNav && <AdBanner config={siteConfig} />}
      <main className={`flex-grow flex flex-col ${showNav ? 'pt-20 pb-20' : ''}`}>
        {renderContent()}
      </main>
      {showNav && <BottomNav currentScreen={currentScreen} onNavigate={navigateTo} isPremium={userProfile?.is_premium} />}
      
      {/* Admin Quick Entry */}
      {isAdmin && currentScreen !== AppScreen.ADMIN && (
        <button 
          onClick={() => setCurrentScreen(AppScreen.ADMIN)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-slate-950 text-white rounded-[1.5rem] shadow-2xl z-[100] flex items-center justify-center border-2 border-rose-500 active:scale-90 transition-all"
        >
          <span className="text-xl font-black italic">A</span>
        </button>
      )}
    </div>
  );
};

export default App;
