import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../base/CustomText';
import noticeIcon from '@/assets/icon/bell.png';
import {NavigationProp} from '@react-navigation/native';

interface HomeHeaderProps {
  shelterName: string;
  homelessName: string;
  navigation: NavigationProp<any>;
}

const HomeHeader = ({
  shelterName,
  homelessName,
  navigation,
}: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headContainer}>
          <CustomText size="xLarge" weight="heavy">
            {homelessName}
          </CustomText>
          <CustomText size="small" weight="thin" textColor="weak">
            {shelterName}
          </CustomText>
        </View>

        <Pressable
          onPress={() => navigation.navigate('notice')}
          style={styles.noticeContainer}>
          <Image source={noticeIcon} style={styles.noticeIcon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: '100%',
  },
  headerContainer: {
    paddingHorizontal: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  headContainer: {
    flex: 0,
    gap: 6,
  },
  noticeContainer: {
    flex: 0,
    paddingTop: 10,
  },
  noticeIcon: {
    width: 27,
    height: 27,
  },
});

export default HomeHeader;
