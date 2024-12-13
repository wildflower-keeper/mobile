import React, {useEffect, useMemo} from 'react';
import {
  PermissionsAndroid,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import CustomText from '@/components/base/CustomText';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import HomeHeader from '@/components/HomeHeader';
import SleepoverSchedules from '@/components/SleepoverSchedules';
import EmergencyButton from '@/components/EmergencyButton';
import useLocation from '@/hooks/queries/useLocation';
import {colors} from '@/constants';
import {useUserStore} from '@/providers/UserProvider';
import {NavigationProp} from '@react-navigation/native';
import {useAuthStore} from '@/providers/AuthProvider';
import {HomeStackParamList} from '@/types/Stack';

interface HomeProps {
  navigation: NavigationProp<HomeStackParamList>;
}

export type userLocationType = {
  latitude: number;
  longitude: number;
};

const Outing = ({navigation}: HomeProps) => {
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const {data: locationStatusQuery} = useLocation(token);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  const locationStatus = useMemo(() => {
    return locationStatusQuery?.locationStatus;
  }, [locationStatusQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        shelterName={user.shelterName}
        homelessName={user.homelessName}
        navigation={navigation}
      />

      <View style={styles.bodyContainer}>
        <View style={styles.bodyItemContainer}>
          <View style={styles.scheduleHeaderContainer}>
            <CustomText size="large" weight="heavy">
              다가오는 일정
            </CustomText>
            <Pressable onPress={() => navigation.navigate('OvernightList')}>
              <CustomText textColor="weak">
                더보기
                <AntDesignIcon
                  name="right"
                  size={18}
                  color={colors.FONT_WEAK}
                  style={{paddingLeft: 4}}
                />
              </CustomText>
            </Pressable>
          </View>
          <SleepoverSchedules />
        </View>

        <View style={styles.nearOvernightContainer}>
          <Pressable
            onPress={() => navigation.navigate('OvernightRequest')}
            style={styles.nearOvernightButton}>
            <CustomText weight="heavy">외박 신청</CustomText>
            <AntDesignIcon name="right" size={18} color="#616161" />
          </Pressable>
        </View>
      </View>

      <View style={styles.fixedContainer}>
        {locationStatus === 'IN_SHELTER' ? (
          <View style={styles.inShelterButton}>
            <CustomText weight="heavy" textColor="white">
              재실 중
            </CustomText>
          </View>
        ) : (
          <>
            <View style={styles.outShelterButton}>
              <CustomText weight="heavy">외출 중</CustomText>
            </View>
            <EmergencyButton shelterPhoneNumber={user.shelterPhone} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 24,
  },
  bodyItemContainer: {
    flex: 0,
    gap: 24,
  },
  scheduleHeaderContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 1,
    width: '90%',
    marginHorizontal: 10,
    gap: 28,
    marginVertical: 16,
  },

  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    width: '100%',
  },
  nearOvernightContainer: {
    flex: 1,
    gap: 16,
  },
  nearOvernightButton: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  fixedContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  inShelterButton: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.PRIMARY,
    backgroundColor: colors.PRIMARY,
  },
  outShelterButton: {
    flex: 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
  },
});

export default Outing;
