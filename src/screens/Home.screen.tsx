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
      <View style={styles.outContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headContainer}>
            <CustomText textColor="weak">
              {isSuccess && `${userInfo.shelterName}`}
            </CustomText>
            <CustomText>{`${today.getMonth() + 1}월 ${today.getDate()}일 ${
              days.WEEK[today.getDay()]
            }요일`}</CustomText>
            <CustomText>
              {isSuccess && `${userInfo.homelessName}님, 반갑습니다.`}
            </CustomText>
          </View>
          <View style={styles.weatherContainer}>
            <View style={{flex: 0, flexDirection: 'row', gap: 10}}>
              <CustomText>{currentWeather.weather}</CustomText>
              <CustomText size="xLarge">{currentWeather.temp}&#176;</CustomText>
            </View>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <CustomText textColor="weak" size="small">
            외출 시 약을 꼭 챙겨주세요!
          </CustomText>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.medicationContainer}>
          <CustomText size="large">긴급 도움 요청 버튼 자리</CustomText>
        </View>
        <View style={styles.medicationContainer}>
          <CustomText textColor="white" size="large">
            복약권유
          </CustomText>
          <CustomText textColor="white">복약정보, 1회필요량, 복약률</CustomText>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            size="md"
            label="외박 신청하기"
            onPress={() => navigation.navigate('OvernightRequest')}
          />
          <CustomButton
            size="md"
            label="외박 신청내역"
            variant="outlined"
            onPress={() => navigation.navigate('OvernightRequest')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 16,
  },
  outContainer: {
    flex: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
    gap: 22,
  },
  messageContainer: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    borderColor: colors.FONT_WEAK,
    borderWidth: 1,
  },
  headerContainer: {
    paddingHorizontal: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 1,
    width: '95%',
    marginHorizontal: 10,
    gap: 10,
    marginVertical: 16,
  },
  headContainer: {
    flex: 0,
    gap: 6,
  },
  weatherContainer: {
    flex: 0,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  medicationContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 16,
    width: '100%',
  },
});

export default Home;
