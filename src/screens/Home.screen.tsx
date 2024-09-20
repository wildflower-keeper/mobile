import React, {useEffect, useState} from 'react';
import {Linking, Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '../components/base/CustomText';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@/components/base/CustomButton';
import {useGetUserInfo} from '@/hooks/queries/useAuth';
import {getWeather} from '@/utils/api/weather';
import LinearGradient from 'react-native-linear-gradient';
import SleepoverScheduleContainer from '@/components/SleepoverScheduleContainer';
import useUserInfoStore from '@/stores/useUserInfo';
import {backendAxiosInstance} from '@/utils/api/api';
import {getAccessToken} from '@/utils/api/auth';
import HomeHeader from '@/components/HomeHeader';
import useLocation from '@/hooks/queries/useLocation';

interface HomeProps {}

const today = new Date();

export type userLocationType = {
  latitude: number;
  longitude: number;
};

//TODO : home screen 리팩토링 필요
const Home = ({navigation}: HomeProps) => {
  const {data, isSuccess} = useGetUserInfo();
  const {setUserInfo} = useUserInfoStore();
  const [userLocation, setUserLocation] = useState<userLocationType>({
    latitude: 37,
    longitude: 124,
  });
  const [currentWeather, setCurrentWeather] = useState({
    weather: '',
    temp: 0,
  });
  const [isUserLocationError, setIsUserLocationError] =
    useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setUserInfo({...data});
    }
  }, [data, isSuccess]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => setIsUserLocationError(true),
      {enableHighAccuracy: true},
    );
  }, []);

  useEffect(() => {
    const weatherItem = getWeather(userLocation);
    weatherItem.then(({weather, temp}) => {
      setCurrentWeather({weather, temp});
    });
  }, [userLocation]);
  // TODO : 긴급도움 요청하기 api 연결해서 test
  const handlePressEmergency = () => {
    const phoneNumber = '01054283576';
    const url = `tel:${phoneNumber}`;

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSuccess && (
        <HomeHeader
          shelterName={data.shelterName}
          homelessName={data.homelessName}
          temp={currentWeather.temp}
          today={today}
        />
      )}

      <View style={styles.bodyContainer}>
        <View style={styles.bodyItemContainer}>
          <CustomText>긴급도움 요청</CustomText>
          <LinearGradient
            colors={['#FF8981', '#FF384D']}
            style={styles.linearGradient}>
            <Pressable
              onPress={handlePressEmergency}
              style={styles.emergencyButton}>
              <CustomText textColor="white">긴급도움 요청하기</CustomText>
            </Pressable>
          </LinearGradient>
        </View>

        <View style={styles.nearOvernightContainer}>
          <CustomText>가까운 외박일정</CustomText>
          <SleepoverScheduleContainer
            upcomingSleepover={data?.upcomingSleepover}
          />
        </View>

        <View style={styles.bodyItemContainer}>
          <CustomText>외박신청</CustomText>
          <View style={styles.buttonContainer}>
            <CustomButton
              size="md"
              label="신청내역"
              variant="outlined"
              onPress={() => navigation.navigate('OvernightList')}
            />
            <CustomButton
              size="md"
              variant="outlined"
              label="외박신청"
              onPress={() => navigation.navigate('OvernightRequest')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 30,
    marginBottom: 60,
  },
  emergencyButton: {
    width: '100%',
    paddingVertical: 'auto',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyItemContainer: {
    flex: 0,
    gap: 16,
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
  linearGradient: {
    flex: 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    height: 'auto',
  },
});

export default Home;
