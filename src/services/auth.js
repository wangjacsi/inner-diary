import { supabase } from './supabase';

export const authService = {
  // 소셜 로그인
  async signInWithProvider(provider) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: 'inner-diary://auth-callback',
          skipBrowserRedirect: true,
        },
      });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Social login error:', error);
      return { success: false, error: error.message };
    }
  },

  // 현재 사용자 가져오기
  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // 세션 가져오기
  async getSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  },

  // 로그아웃
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  // 사용자 프로필 생성/업데이트
  async upsertUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          id: userId,
          ...profileData,
        })
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Upsert user profile error:', error);
      return { success: false, error: error.message };
    }
  },

  // 사용자 프로필 가져오기
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  },

  // 인증 상태 리스너
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};