import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

export const MyDiaryScreen = () => {
  const { language } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === 'ko' ? '나의 일기' : 'My Diary'}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>
          {language === 'ko' 
            ? '일기 목록이 여기에 표시됩니다.' 
            : 'Your diary entries will appear here.'}
        </Text>
      </View>
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
  placeholder: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    opacity: 0.6,
    textAlign: 'center',
  },
});