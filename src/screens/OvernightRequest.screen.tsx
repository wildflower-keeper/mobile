import InputField from '@/components/InputField';
import CustomButton from '@/components/base/CustomButton';
import CustomText from '@/components/base/CustomText';
import {colors} from '@/constants';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';
import {
  calendarLocationConfig,
  calenderThemeConfig,
} from '@/config/calendarConfig';
import Toast from 'react-native-toast-message';
import {getDatesBetween, getNextDay} from '@/utils/date/date';
import {useMutateCreateOvernight} from '@/hooks/queries/useMutateCreateOvernight';
import useGetOvernightAbleSchedule from '@/hooks/queries/useGetOvernightAbleSchedule';
import useOvernightRequestStore from '@/stores/useOverNight';

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
  const {overnightRequestValues, setOvernightRequestValues} =
    useOvernightRequestStore();
  const [selectDate, setSelectDate] = useState<selectOvernightType>({});
  const [ableDate, isSuccess] = useGetOvernightAbleSchedule();
  console.log(overnightRequestValues);
  // 외박 신청 된 날짜를 체크하여 적용할 state
  // const [markedDate, setMarkedDate] = useState<selectOvernightType>({});

  const selectOvernight = (day: DateData) => {
    if (overnightRequestValues.startDate === day.dateString) {
      return;
    }
    if (Object.keys(selectDate).length === 1) {
      const firstDayKey = Object.keys(selectDate)[0];
      const firstDay: calenderOptionType = {
        startingDay: true,
        color: colors.PRIMARY,
        textColor: colors.WHITE,
      };
      const days = getDatesBetween(
        new Date(firstDayKey),
        new Date(day.dateString),
      );
      const daysObject: selectOvernightType = {};
      days.forEach(item => {
        daysObject[item] = {
          color: colors.PRIMARY,
          textColor: colors.WHITE,
        };
      });
      setSelectDate({
        ...daysObject,
        [firstDayKey]: firstDay,

        [day.dateString]: {
          endingDay: true,
          color: colors.PRIMARY,
          textColor: colors.WHITE,
        },
      });
      setOvernightRequestValues({
        ...overnightRequestValues,
        endDate: getNextDay(day.dateString),
      });
    } else {
      setSelectDate({
        [day.dateString]: {
          startingDay: true,
          endingDay: true,
          color: colors.PRIMARY,
          textColor: colors.WHITE,
        },
      });
      setOvernightRequestValues({
        ...overnightRequestValues,
        startDate: day.dateString,
        endDate: getNextDay(day.dateString).toString(),
      });
    }
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
      navigation.navigate('FinalConfirmation');
    }

    if (overnightRequestValues.endDate) {
      setIsNext(true);
    } else {
      Toast.show({
        type: 'error',
        text1: '외출 날짜를 선택해주세요',
        position: 'bottom',
      });
    }
  };

  const selectReasonHandler = (value: string) => {
    setOvernightRequestValues({
      ...overnightRequestValues,
      reason: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText size="large" weight="heavy">
          외박 신청기간
        </CustomText>
        <CustomText size="small" textColor="weak">{`${
          !isNext ? '외박을 신청하는 날짜를' : '아래의 신청 이유 중'
        } 선택해주세요.`}</CustomText>
      </View>
      {!isNext ? (
        <>
          <View
            style={{
              width: '100%',
            }}>
            <Calendar
              markingType={'period'}
              monthFormat={'yyyy년 M월'}
              onDayPress={day => selectOvernight(day)}
              markedDates={selectDate}
              theme={calenderThemeConfig}
              minDate={isSuccess ? ableDate[0] : ''}
              maxDate={isSuccess ? ableDate[ableDate?.length - 1] : ''}
            />
          </View>
        </>
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1, paddingTop: 60, gap: 60}}
          behavior="padding"
          enabled>
          <View style={styles.optionContainer}>
            {buttonTextList.map(text => {
              return (
                <Pressable
                  key={text}
                  style={[
                    styles.optionItem,
                    text === overnightRequestValues.reason
                      ? styles.selectPress
                      : styles.defaultPress,
                  ]}
                  onPress={() => selectReasonHandler(text)}>
                  <CustomText
                    textColor={
                      text === overnightRequestValues.reason
                        ? 'white'
                        : 'default'
                    }>
                    {text}
                  </CustomText>
                </Pressable>
              );
            })}
          </View>
          <View style={{width: '100%', flex: 0, gap: 30}}>
            <InputField labelName="기타" placeholder="사유를 입력해주세요." />
            <InputField
              labelName="비상연락망"
              placeholder="비상시 연락할 전화번호를 입력해주세요."
              value={overnightRequestValues.emergencyContact}
              onChangeText={text => {
                setOvernightRequestValues({
                  ...overnightRequestValues,
                  emergencyContact: text,
                });
              }}
            />
          </View>
        </KeyboardAvoidingView>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          label="이전"
          variant="outlined"
          size="md"
          onPress={handlePrev}
        />
        <CustomButton label="계속" size="md" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 60,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomColor: colors.BRIGHT_PRIMARY,
    borderBottomWidth: 1,
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
    gap: 6,
  },
});

export default OvernightRequest;
