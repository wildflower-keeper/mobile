import InputField from '@/components/InputField';
import CustomButton from '@/components/base/CustomButton';
import CustomText from '@/components/base/CustomText';
import {colors} from '@/constants';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';
import calendarLocationConfig from '@/config/calendarConfig';
import {backendAxiosInstance} from '@/utils/api/api';
import getDeviceID from '@/utils/getDeviceID/getDeviceID';
import {getToken} from '@/utils/tokenStorage/tokenStorage';

interface OvernightRequestProps {}

const buttonTextList = ['가족', '모임', '일', '운동', '기타'];

type selectOvernightType = {
  [day: string]: calenderOptionType;
};

type calenderOptionType = {
  startingDay?: boolean;
  endingDay?: boolean;
  color: string;
  textColor: string;
};

LocaleConfig.locales.kr = calendarLocationConfig;
LocaleConfig.defaultLocale = 'kr';

const OvernightRequest = ({navigation}: OvernightRequestProps) => {
  const [isNext, setIsNext] = useState<boolean>(false);
  const [overnightValues, setOvernightValues] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
  });
  console.log(overnightValues);
  const [selectDate, setSelectDate] = useState<selectOvernightType>({});
  const selectOvernight = (day: DateData) => {
    if (!Object.keys(selectDate).length) {
      setSelectDate({
        ...selectDate,
        [day.dateString]: {
          startingDay: true,
          endingDay: true,
          color: colors.PRIMARY,
          textColor: colors.WHITE,
        },
      });
      setOvernightValues({
        ...overnightValues,
        startDate: day.dateString,
        endDate: day.dateString,
      });
    }
    if (Object.keys(selectDate).length === 1) {
      const firstDayKey = Object.keys(selectDate)[0];
      const firstDay = selectDate[firstDayKey];
      firstDay.endingDay = false;
      setSelectDate({
        [firstDayKey]: firstDay,
        [day.dateString]: {
          startingDay: false,
          endingDay: true,
          color: colors.PRIMARY,
          textColor: colors.WHITE,
        },
      });
      setOvernightValues({
        ...overnightValues,
        endDate: day.dateString,
      });
    }
    // {
    //   ...selectDate,
    //   [day.dateString]: {
    //     endingDay: true,
    //     color: colors.PRIMARY,
    //     textColor: colors.WHITE
    //   },
    // }
  };

  const handlePrev = () => {
    if (isNext) {
      setIsNext(false);
      return;
    }
    navigation.navigate('Home');
  };
  const handleNext = () => {
    if (isNext) {
      getDeviceID().then(async result => {
        try {
          const token = await getToken(result);
          console.log('t', token);
          const res = await backendAxiosInstance({
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: '*/*',
              'auth-token': token,
            },
            url: '/api/v1/homeless-app/sleepover',
            data: JSON.stringify(overnightValues),
          });
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      });
    }
    setIsNext(true);
  };

  const selectReasonHandler = (value: string) => {
    setOvernightValues({
      ...overnightValues,
      reason: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0, alignItems: 'center'}}>
        <CustomText size="xLarge">외박을 신청하는</CustomText>
        <CustomText size="xLarge">{`${
          !isNext ? '이유를' : '기간을'
        } 선택해주세요.`}</CustomText>
      </View>
      {!isNext ? (
        <>
          <View>
            <CustomText size="small" textColor="weak">
              아래의 이유 중 선택해주세요.
            </CustomText>
          </View>
          <View style={styles.optionContainer}>
            {buttonTextList.map(text => {
              return (
                <Pressable
                  key={text}
                  style={[
                    styles.optionItem,
                    text === overnightValues.reason
                      ? styles.selectPress
                      : styles.defaultPress,
                  ]}
                  onPress={() => selectReasonHandler(text)}>
                  <CustomText>{text}</CustomText>
                </Pressable>
              );
            })}
          </View>
          <InputField
            labelName="기타 사유"
            placeholder="사유를 입력해주세요."
            border={false}
          />
        </>
      ) : (
        <View style={{width: '90%'}}>
          <Calendar
            markingType={'period'}
            monthFormat={'yyyy년 M월'}
            onDayPress={day => selectOvernight(day)}
            markedDates={selectDate}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          label="이전"
          variant="outlined"
          size="sm"
          onPress={handlePrev}
        />
        <CustomButton label="계속" size="sm" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 60,
    marginTop: 72,
    marginBottom: 80,
  },
  optionContainer: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: 30,
  },
  optionItem: {
    width: '30%',
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 8,
  },
  defaultPress: {
    borderColor: colors.BORDER_COLOR,
  },
  selectPress: {
    backgroundColor: colors.PRIMARY,
    borderColor: colors.WHITE,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    gap: 20,
    marginTop: 'auto',
  },
});

export default OvernightRequest;
