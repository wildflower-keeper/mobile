import InputField from '@/components/InputField';
import CustomButton from '@/components/base/CustomButton';
import CustomText from '@/components/base/CustomText';
import {colors} from '@/constants';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';
import {
  calendarLocationConfig,
  calenderThemeConfig,
} from '@/config/calendarConfig';
import Toast from 'react-native-toast-message';
import {getNextDay} from '@/utils/date/date';
import {useMutateCreateOvernight} from '@/hooks/queries/useMutateCreateOvernight';
import useGetOvernightAbleSchedule from '@/hooks/queries/useGetOvernightAbleSchedule';

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
  const [selectDate, setSelectDate] = useState<selectOvernightType>({});
  const [ableDate, isSuccess] = useGetOvernightAbleSchedule();

  // 외박 신청 된 날짜를 체크하여 적용할 state
  const [markedDate, setMarkedDate] = useState<selectOvernightType>({});
  const overnightPost = useMutateCreateOvernight();
  const selectOvernight = (day: DateData) => {
    if (Object.keys(selectDate).length === 1) {
      const firstDayKey = Object.keys(selectDate)[0];
      const firstDay: calenderOptionType = {
        startingDay: true,
        color: colors.PRIMARY,
        textColor: colors.WHITE,
      };

      setSelectDate({
        [firstDayKey]: firstDay,
        [day.dateString]: {
          endingDay: true,
          color: colors.PRIMARY,
          textColor: colors.WHITE,
        },
      });
      setOvernightValues({
        ...overnightValues,
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
      setOvernightValues({
        ...overnightValues,
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
      overnightPost.mutate(
        {body: overnightValues},
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: '외박 신청이 완료되었습니다.',
              position: 'bottom',
            });
            navigation.navigate('Home');
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1: error.message,
              position: 'bottom',
            });
          },
        },
      );
    }

    if (overnightValues.endDate) {
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
          !isNext ? '기간을' : '이유를'
        } 선택해주세요.`}</CustomText>
      </View>
      {!isNext ? (
        <>
          <View
            style={{
              width: '90%',
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
          {overnightValues.startDate && (
            <View>
              <View>
                <CustomText size="xLarge">
                  {overnightValues.startDate}일 부터
                </CustomText>
              </View>
              <View style={{flex: 0, flexDirection: 'row'}}>
                <CustomText size="xLarge">몇일</CustomText>
                <CustomText size="xLarge">외박</CustomText>
              </View>
            </View>
          )}
        </>
      ) : (
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
    justifyContent: 'space-between',
    marginTop: 60,
    marginBottom: 60,
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
  },
});

export default OvernightRequest;
