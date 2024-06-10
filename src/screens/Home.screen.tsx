import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '../components/base/CustomText';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@/components/base/CustomButton';
import {backendAxiosInstance, weatherAxiosInstance} from '@/utils/api/api';
import {colors, days} from '@/constants';
import {WEATHER_API_KEY} from '@env';
import {getToken} from '@/utils/tokenStorage/tokenStorage';
import getDeviceID from '@/utils/getDeviceID/getDeviceID';
interface HomeProps {}

const today = new Date();

type planedSleepoverType = {
  sleepoverId: number;
  startDate: string;
  endDate: string;
};

type userInfoType = {
  id: number;
  name: string;
  shelterName: string;
  planedSleepover: planedSleepoverType;
};

const Home = ({navigation}: HomeProps) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 37,
    longitude: 124,
  });
  const [currentWeather, setCurrentWeather] = useState({
    weather: '',
    temp: 0,
  });
  const [isUserLocationError, setIsUserLocationError] =
    useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<userInfoType>({
    id: 0,
    name: '',
    shelterName: '',
    planedSleepover: {
      sleepoverId: 0,
      startDate: '',
      endDate: '',
    },
  });
  console.log(userInfo);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        getDeviceID().then(async (result: string) => {
          console.log(result);
          const token = await getToken(result);
          const res = await backendAxiosInstance({
            headers: {'auth-token': token, accept: '*/*'},
            method: 'GET',
            url: '/api/v1/homeless-app/homeless',
          });
          setUserInfo(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);
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
    const getWeather = async () => {
      try {
        const {latitude, longitude} = userLocation;
        const res = await weatherAxiosInstance({
          method: 'GET',
          url: `/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`,
        });
        setCurrentWeather({
          weather: res.data.weather[0].description,
          temp: Math.round(res.data.main.temp),
        });
      } catch (error) {
        throw error;
      }
    };
    getWeather();
  }, [userLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <CustomText textColor="weak">{`${userInfo.shelterName} -`}</CustomText>
        <CustomText size="xLarge">{`${userInfo.name}님, 반갑습니다.`}</CustomText>
      </View>
      <View style={styles.weatherContainer}>
        <CustomText>{`${today.getMonth() + 1}월 ${today.getDate()}일 ${
          days.WEEK[today.getDay()]
        }요일`}</CustomText>
        <CustomText>위치</CustomText>
        <View style={{flex: 0, flexDirection: 'row', gap: 10}}>
          <CustomText>{currentWeather.weather}</CustomText>
          <CustomText size="temp">{currentWeather.temp}&#176;</CustomText>
        </View>
      </View>
      <View style={styles.medicationContainer}>
        <CustomText textColor="weak" size="large">
          복약권유
        </CustomText>
        <CustomText textColor="weak">복약정보, 1회필요량, 복약률 </CustomText>
      </View>
      <CustomButton
        size="xl"
        label="외박 신청하기"
        onPress={() => navigation.navigate('OvernightRequest')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 72,
    flex: 1,
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 30,
  },
  headContainer: {
    flex: 0,
    alignItems: 'center',
  },
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
  },
  medicationContainer: {
    flex: 0,
    alignItems: 'center',
    borderColor: colors.BORDER_COLOR,
    borderWidth: 6,
    borderRadius: 10,
    padding: 16,
    width: '100%',
  },
});

export default Home;
