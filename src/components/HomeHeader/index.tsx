import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from '../base/CustomText';

interface HomeHeaderProps {
  shelterName: string;
  homelessName: string;
}

const HomeHeader = ({shelterName, homelessName}: HomeHeaderProps) => {
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
