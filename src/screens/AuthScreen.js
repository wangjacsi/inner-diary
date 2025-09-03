import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LanguageSelector } from '../components/auth/LanguageSelector';
import { SocialLoginButton } from '../components/auth/SocialLoginButton';
import { theme } from '../styles/theme';
import { getAuthProvider } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';

export const AuthScreen = () => {
  const { language, saveLanguage, signInWithProvider } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = async (lang) => {
    await saveLanguage(lang);
  };

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      const { success, error } = await signInWithProvider(provider);
      
      if (!success) {
        Alert.alert(
          language === 'ko' ? '로그인 실패' : 'Login Failed',
          error || (language === 'ko' ? '다시 시도해주세요.' : 'Please try again.'),
          [{ text: language === 'ko' ? '확인' : 'OK' }]
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        language === 'ko' ? '오류' : 'Error',
        language === 'ko' ? '로그인 중 오류가 발생했습니다.' : 'An error occurred during login.',
        [{ text: language === 'ko' ? '확인' : 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const providers = getAuthProvider(language);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {language === 'ko' ? '내면 일기' : 'Inner Diary'}
          </Text>
          <Text style={styles.subtitle}>
            {language === 'ko'
              ? '당신의 이야기를 들려주세요'
              : 'Share your inner thoughts'}
          </Text>
        </View>

        <LanguageSelector
          selectedLanguage={language}
          onSelectLanguage={handleLanguageChange}
        />

        <View style={styles.divider} />

        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>
            {language === 'ko' ? '시작하기' : 'Get Started'}
          </Text>
          
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            providers.map((provider) => (
              <SocialLoginButton
                key={provider}
                provider={provider}
                language={language}
                onPress={() => handleSocialLogin(provider)}
              />
            ))
          )}
        </View>

        <Text style={styles.footer}>
          {language === 'ko'
            ? '로그인하면 서비스 약관에 동의하는 것으로 간주됩니다.'
            : 'By logging in, you agree to our Terms of Service.'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    opacity: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xl,
  },
  loginContainer: {
    marginBottom: theme.spacing.xl,
  },
  loginTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  footer: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    opacity: 0.6,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
});