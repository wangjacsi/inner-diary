import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import { LANGUAGES } from '../../utils/constants';

export const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Language</Text>
      <Text style={styles.subtitle}>언어를 선택해주세요</Text>
      
      <View style={styles.languageContainer}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              selectedLanguage === lang.code && styles.selectedButton,
            ]}
            onPress={() => onSelectLanguage(lang.code)}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text
              style={[
                styles.languageName,
                selectedLanguage === lang.code && styles.selectedText,
              ]}
            >
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: theme.spacing.xl,
  },
  languageContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  languageButton: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    minWidth: 120,
    ...theme.shadow.md,
  },
  selectedButton: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '20',
  },
  flag: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  languageName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  selectedText: {
    color: theme.colors.primary,
  },
});