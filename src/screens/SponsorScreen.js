import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

export const SponsorScreen = () => {
  const { language, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === 'ko' ? '후원하기' : 'Support Us'}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>
          {language === 'ko' 
            ? '내면 일기를 사랑해주셔서 감사합니다!' 
            : 'Thank you for loving Inner Diary!'}
        </Text>
        <Text style={styles.placeholder}>
          {language === 'ko' 
            ? '광고를 시청하여 개발자를 응원해주세요.' 
            : 'Watch ads to support the developer.'}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>
          {language === 'ko' ? '로그아웃' : 'Sign Out'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  message: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  placeholder: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    opacity: 0.6,
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: theme.colors.error,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  signOutText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
});