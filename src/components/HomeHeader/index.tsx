import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomText from '../base/CustomText';
import {colors} from '@/constants';
import {formatUpdateTime} from '@/utils/date/date';

interface HomeHeaderProps {
  shelterName: string;
  homelessName: string;
  today: Date;
}

const HomeHeader = ({shelterName, homelessName, today}: HomeHeaderProps) => {
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
        <View style={styles.weatherContainer}>
          <View style={styles.weatherFlexContainer}>
          </View>
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
    gap: 8
  },
  headContainer: {
    flex: 0,
    gap: 6,
  },
  weatherContainer: {
    flex: 0,
    alignItems: 'center',
  },
  weatherFlexContainer: {flex: 0, flexDirection: 'row', gap: 12},
});

export default HomeHeader;
