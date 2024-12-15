import React, {ComponentType} from 'react';
import Waiting from '@/screens/Waiting.screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useMessageService from '@/hooks/useMessageService';
import Home from '@/screens/Home.screen';
import Outing from '@/screens/Outing.screen';
import {IconProps} from '@/types/Icon';
import PeopleIcon from '@/components/icon/PeopleIcon';
import SmileIcon from '@/components/icon/SmileIcon';
import HomeIcon from '@/components/icon/HomeIcon';
import BuildingIcon from '@/components/icon/BuildingIcon';
import HomeFilledIcon from '@/components/icon/HomeFilledIcon';
import BuildingFilledIcon from '@/components/icon/BuildingFilledIcon';

type TabIconProps = {focused: boolean; color: string; size: number};
const renderIcon =
  (Icon: ComponentType<IconProps>, IconFocused?: ComponentType<IconProps>) =>
  ({focused, color, size}: TabIconProps) => {
    // return <Icon size={24} color={focused ? '#00BF40' : '#989BA2'} />;
    if (IconFocused && focused) {
      return <IconFocused size={size} color={color} />;
    }
    return <Icon size={size} color={color} />;
  };

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  useMessageService();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Pretendard',
          fontSize: 16,
          paddingTop: 7,
        },
        tabBarStyle: {
          height: 70,
          gap: 6,
        },
        tabBarActiveTintColor: '#00BF40',
        tabBarInactiveTintColor: '#989BA2',
      }}>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: renderIcon(HomeIcon, HomeFilledIcon),
        }}
      />
      <Tab.Screen
        name="외박/외출"
        component={Outing}
        options={{
          tabBarIcon: renderIcon(BuildingIcon, BuildingFilledIcon),
        }}
      />
      <Tab.Screen
        name="커뮤니티"
        component={Waiting}
        options={{
          tabBarIcon: renderIcon(PeopleIcon),
        }}
      />
      <Tab.Screen
        name="마이"
        component={Waiting}
        options={{
          tabBarIcon: renderIcon(SmileIcon),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
