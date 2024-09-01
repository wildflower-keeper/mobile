import React, {useEffect, useState} from 'react';
import {Linking, Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '../components/base/CustomText';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@/components/base/CustomButton';
import {colors, days} from '@/constants';
import {useGetUserInfo} from '@/hooks/queries/useAuth';
import {getWeather} from '@/utils/api/weather';
import LinearGradient from 'react-native-linear-gradient';
import AntDesignicon from 'react-native-vector-icons/AntDesign';
import SleepoverScheduleContainer from '@/components/SleepoverScheduleContainer';
import useUserInfoStore from '@/stores/useUserInfo';
import {backendAxiosInstance} from '@/utils/api/api';
import {getAccessToken} from '@/utils/api/auth';

interface HomeProps {}

const today = new Date();

export type userLocationType = {
  latitude: number;
  longitude: number;
};

const Home = ({navigation}: HomeProps) => {
  const [fetchedUserInfo, isSuccess] = useGetUserInfo();
  const {userInfo, setUserInfo} = useUserInfoStore();
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
      setUserInfo({...fetchedUserInfo});
    }
  }, [fetchedUserInfo, isSuccess]);

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

  const handlePressEmergency = () => {
    const phoneNumber = '01054283576';
    const url = `tel:${phoneNumber}`;

    Linking.openURL(url);
  };

  const deleteSchedule = async () => {
    const res = await backendAxiosInstance({
      method: 'DELETE',
      url: `/api/v1/homeless-app/sleepover/${userInfo.sleepoverId}`,
      headers: {
        accept: '*/*',
        'auth-token': await getAccessToken(),
      },
    });
    console.log(res);
  };
  console.log(userInfo);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headContainer}>
            <CustomText textColor="white" size="xSmall">
              {isSuccess && `${fetchedUserInfo.shelterName}`}
            </CustomText>
            <CustomText textColor="white" size="small">{`${
              today.getMonth() + 1
            }월 ${today.getDate()}일 ${
              days.WEEK[today.getDay()]
            }요일`}</CustomText>
            <CustomText textColor="white" weight="heavy">
              {isSuccess && `${fetchedUserInfo.homelessName}님, 반갑습니다.`}
            </CustomText>
          </View>
          <View style={styles.weatherContainer}>
            <View style={{flex: 0, flexDirection: 'row', gap: 12}}>
              <CustomText size="xLarge" textColor="white" weight="heavy">
                {currentWeather.temp}&#176;
              </CustomText>
              <AntDesignicon name="cloud" size={70} color={colors.WHITE} />
            </View>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <CustomText isBadge size="small">
            외출 시 약을 꼭 챙겨주세요!
          </CustomText>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyItemContainer}>
          <CustomText>긴급도움 요청</CustomText>
          <LinearGradient
            colors={['#FF8981', '#FF384D']}
            style={styles.linearGradient}>
            <Pressable
              onPress={handlePressEmergency}
              style={{
                width: '100%',
                paddingVertical: 'auto',
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomText textColor="white">긴급도움 요청하기</CustomText>
            </Pressable>
          </LinearGradient>
        </View>

        <View style={styles.nearOvernightContainer}>
          <CustomText>가까운 외박일정</CustomText>
          <SleepoverScheduleContainer
            upcomingSleepover={fetchedUserInfo?.upcomingSleepover}
            onPress={deleteSchedule}
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
  bodyItemContainer: {
    flex: 0,
    gap: 16,
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
    gap: 28,
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
