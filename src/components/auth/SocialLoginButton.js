import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const providerConfig = {
  google: {
    name: 'Google',
    icon: '🔍',
    backgroundColor: '#ffffff',
    textColor: '#4285F4',
  },
  apple: {
    name: 'Apple',
    icon: '🍎',
    backgroundColor: '#000000',
    textColor: '#ffffff',
  },
  kakao: {
    name: 'Kakao',
    icon: '💬',
    backgroundColor: '#FEE500',
    textColor: '#000000',
  },
  naver: {
    name: 'Naver',
    icon: '🟢',
    backgroundColor: '#03C75A',
    textColor: '#ffffff',
  },
};

export const SocialLoginButton = ({ provider, onPress, language }) => {
  const config = providerConfig[provider];
  
  const getButtonText = () => {
    if (language === 'ko') {
      return `${config.name}로 시작하기`;
    }
    return `Continue with ${config.name}`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: config.backgroundColor }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{config.icon}</Text>
      </View>
      <Text style={[styles.text, { color: config.textColor }]}>
        {getButtonText()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.md,
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
});