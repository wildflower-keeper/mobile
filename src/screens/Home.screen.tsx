import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '../components/base/CustomText';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@/components/base/CustomButton';
import {colors, days} from '@/constants';
import {useGetUserInfo} from '@/hooks/queries/useAuth';
import {getWeather} from '@/utils/api/weather';
interface HomeProps {}

const today = new Date();

export type userLocationType = {
  latitude: number;
  longitude: number;
};

const Home = ({navigation}: HomeProps) => {
  const [userInfo, isSuccess] = useGetUserInfo();
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <CustomText textColor="weak">
          {isSuccess && `${userInfo.shelterName} -`}
        </CustomText>
        <CustomText size="xLarge">
          {isSuccess && `${userInfo.homelessName}님, 반갑습니다.`}
        </CustomText>
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
