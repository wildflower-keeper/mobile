import React, {useEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import CustomText from '../components/base/CustomText';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@/components/base/CustomButton';
import {colors, days} from '@/constants';
import {useGetUserInfo} from '@/hooks/queries/useAuth';
import {getWeather} from '@/utils/api/weather';
import LinearGradient from 'react-native-linear-gradient';

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
            <CustomText textColor="white" size="xSmall" weight="thin">
              {isSuccess && `${userInfo.shelterName}`}
            </CustomText>
            <CustomText textColor="white" size="small">{`${
              today.getMonth() + 1
            }월 ${today.getDate()}일 ${
              days.WEEK[today.getDay()]
            }요일`}</CustomText>
            <CustomText textColor="white" weight="heavy">
              {isSuccess && `${userInfo.homelessName}님, 반갑습니다.`}
            </CustomText>
          </View>
          <View style={styles.weatherContainer}>
            <View style={{flex: 0, flexDirection: 'row', gap: 12}}>
              <CustomText>{currentWeather.weather}</CustomText>
              <CustomText size="xLarge" textColor="white" weight="heavy">
                {currentWeather.temp}&#176;
              </CustomText>
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
        <View style={{flex: 0, gap: 12}}>
          <CustomText>긴급도움 요청</CustomText>
          <Pressable>
            <LinearGradient
              colors={['#FF8981', '#FF384D']}
              style={styles.linearGradient}>
              <CustomText textColor="white">긴급도움 요청하기</CustomText>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={{flex: 1, gap: 12}}>
          <CustomText>가까운 외박일정</CustomText>
          <View style={styles.nearOvernightContainer}>
            <View style={{flex: 0, alignItems: 'center', gap: 10}}>
              <View>
                <CustomText size="large" weight="heavy">
                  6월 25일 X요일 부터
                </CustomText>
                <CustomText size="large" weight="heavy">
                  6월 30일 X요일 까지
                </CustomText>
              </View>

              <CustomText textColor="weak" size="small">
                n박 일정
              </CustomText>
            </View>

            <CustomButton label="현재 진행중" variant="outlined" size="md" />
          </View>
        </View>

        <View style={{flex: 0, gap: 10}}>
          <CustomText>외박신청</CustomText>
          <View style={styles.buttonContainer}>
            <CustomButton
              size="md"
              label="신청내역"
              variant="outlined"
              onPress={() => navigation.navigate('OvernightRequest')}
            />
            <CustomButton
              size="md"
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
    gap: 16,
    marginBottom: 36,
  },
  outContainer: {
    flex: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.BRIGHT_PRIMARY,
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
    width: '90%',
    marginHorizontal: 10,
    gap: 20,
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
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    width: '100%',
  },
  nearOvernightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: 16,
    width: '100%',
    gap: 20,
    borderColor: colors.BORDER_COLOR,
    borderWidth: 2,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  linearGradient: {
    flex: 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
});

export default Home;
