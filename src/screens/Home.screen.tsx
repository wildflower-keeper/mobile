import React, {useEffect, useMemo} from 'react';
import {Linking, Pressable, SafeAreaView, StyleSheet, View, Text, ScrollView} from 'react-native';
import CustomText from '../components/base/CustomText';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@/components/base/CustomButton';
import {useGetUserInfo} from '@/hooks/queries/useAuth';
import {getWeather} from '@/utils/api/weather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import useUserInfoStore from '@/stores/useUserInfo';
import HomeHeader from '@/components/HomeHeader';
import SleepoverSchedule from '@/components/SleepoverSchedule';
import emergencyCall from '@/utils/api/emergency';
import useLocation from '@/hooks/queries/useLocation';
import useSleepovers from '@/hooks/queries/useSleepovers';
import {formatUpdateTime, getDaysDifferenceFromToday} from '@/utils/date/date';
import {ImageSlider} from '@/components/ImageSlider';
interface HomeProps {}

const today = new Date();

export type userLocationType = {
  latitude: number;
  longitude: number;
};

//TODO : home screen 리팩토링 필요
const Home = ({navigation}: HomeProps) => {
  const {data, isSuccess} = useGetUserInfo();
  const {userInfo, setUserInfo} = useUserInfoStore();
  useEffect(() => {
    if (isSuccess) {
      setUserInfo({...data});
    }
  }, [data, isSuccess]);

  const {data: locationStatusQuery} = useLocation();
  const locationStatus = useMemo(() => {
    return locationStatusQuery?.locationStatus;
  }, [locationStatusQuery]);

  const { data : sleepoversQuery } = useSleepovers();
  const sleepovers = useMemo(() => {
    return sleepoversQuery?.map(({startDate, endDate, ...props}) => ({
      dayDiff: getDaysDifferenceFromToday(new Date(startDate)),
      startDate: formatUpdateTime(new Date(startDate)),
      endDate: formatUpdateTime(new Date(endDate)),
      ...props
    }));
  }, [data]);

  const handlePressEmergency = () => {
    const phoneNumber = userInfo.shelterPhone;
    const url = `tel:${phoneNumber}`;
    emergencyCall();
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSuccess && (
        <HomeHeader
          shelterName={data.shelterName}
          homelessName={data.homelessName}
          today={today}
        />
      )}

      <View style={styles.bodyContainer}>
        <View style={styles.bodyItemContainer}>
          <View style={styles.scheduleHeaderContainer}>
            <CustomText weight="heavy">다가오는 일정</CustomText>
            <Pressable onPress={() => navigation.navigate('OvernightList')}>
              <CustomText style={{textColor:"#616161", fontSize: 18}}>
                더보기
                <AntDesignIcon name="right" size={18} color="#616161" style={{ paddingLeft:4 }}/>
              </CustomText>
            </Pressable>
          </View>
          <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.scheduleListContainer}>
            {sleepovers?.map(sleepover => (
              <View style={styles.scheduleContainer} key={sleepover.sleepoverId}>
                <Text style={{color : '#19C23D', textAlign: 'right', fontSize: 18}}>
                  {sleepover.dayDiff}일 남았습니다.
                </Text>
                <View style={styles.scheduleRowContainer}>
                  <CustomText>시작</CustomText>
                  <CustomText weight="heavy">{sleepover.startDate}</CustomText>
                </View>
                <View style={styles.scheduleRowContainer}>
                  <CustomText>종료</CustomText>
                  <CustomText weight="heavy">{sleepover.endDate}</CustomText>
                </View>
                <View style={styles.scheduleRowContainer}>
                  <CustomText>일정</CustomText>
                  <CustomText weight="heavy">{sleepover.reason}</CustomText>
                </View>
              </View>
            ))}
          </ScrollView>
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
        {locationStatus === 'IN_SHELTER'? (
            <View style={styles.inShelterButton}>
              <CustomText weight="heavy" textColor="white">재실 중</CustomText>
            </View>
          ):(
          <>
            <View style={styles.outShelterButton}>
              <CustomText weight="heavy">외출 중</CustomText>
            </View>
            <Pressable
              onPress={handlePressEmergency}
              style={styles.emergencyButton}>
              <CustomText weight="heavy" textColor="white">
                긴급 도움
              </CustomText>
            </Pressable>
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
  scheduleHeaderContainer : {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleListContainer: {
    flexDirection: 'row',
  },
  scheduleContainer : {
    flex: 1,
    flexDirection: 'col',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    width: 240,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
    marginRight: 16,
  },
  scheduleRowContainer : {
    flex : 0,
    flexDirection : 'row',
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
    gap: 16
  },
  inShelterButton: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#19C23D',
    backgroundColor: '#19C23D'
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
  emergencyButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FF3D00',
    backgroundColor: '#FF3D00'
  },
});

export default Home;
