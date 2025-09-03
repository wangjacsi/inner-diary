import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // 저장된 언어 설정 불러오기
    loadLanguage();
    
    // 인증 상태 확인
    checkAuthStatus();
    
    // 인증 상태 변경 리스너
    const { data: authListener } = authService.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const saveLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('userLanguage', lang);
      setLanguage(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        await loadUserProfile(currentUser.id);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId) => {
    try {
      const profile = await authService.getUserProfile(userId);
      if (profile) {
        setUserProfile(profile);
        if (profile.language) {
          setLanguage(profile.language);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const signInWithProvider = async (provider) => {
    try {
      const { success, data, error } = await authService.signInWithProvider(provider);
      
      if (success && data?.user) {
        // 프로필 생성/업데이트
        const profileData = {
          email: data.user.email,
          provider: provider,
          language: language,
          username: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
        };
        
        await authService.upsertUserProfile(data.user.id, profileData);
      }
      
      return { success, error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      const { success } = await authService.signOut();
      if (success) {
        setUser(null);
        setUserProfile(null);
      }
      return { success };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    try {
      const { success, data } = await authService.upsertUserProfile(user.id, updates);
      if (success) {
        setUserProfile(data);
      }
      return { success, data };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    language,
    saveLanguage,
    signInWithProvider,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};