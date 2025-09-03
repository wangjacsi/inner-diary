import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MyDiaryScreen } from '../../screens/MyDiaryScreen';
import { PublicDiaryScreen } from '../../screens/PublicDiaryScreen';
import { SponsorScreen } from '../../screens/SponsorScreen';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { language } = useAuth();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarStyle: {
            backgroundColor: theme.colors.white,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            paddingTop: 5,
            paddingBottom: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.medium,
          },
        }}
      >
        <Tab.Screen
          name="MyDiary"
          component={MyDiaryScreen}
          options={{
            tabBarLabel: language === 'ko' ? '나의 일기' : 'My Diary',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="📔" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="PublicDiary"
          component={PublicDiaryScreen}
          options={{
            tabBarLabel: language === 'ko' ? '우리의 일기' : 'Public Diary',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="🌍" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Sponsor"
          component={SponsorScreen}
          options={{
            tabBarLabel: language === 'ko' ? '후원하기' : 'Support',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="💝" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const TabIcon = ({ icon, focused }) => (
  <Text style={{ 
    fontSize: 24, 
    opacity: focused ? 1 : 0.6,
  }}>
    {icon}
  </Text>
);

// Text 컴포넌트를 import해야 합니다
import { Text } from 'react-native';