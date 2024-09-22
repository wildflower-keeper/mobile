import {
  calendarLocationConfig,
  calenderThemeConfig,
} from '@/config/calendarConfig';
import {colors} from '@/constants';
import useGetOvernightAbleSchedule from '@/hooks/queries/useGetOvernightAbleSchedule';
import useOvernightRequestStore from '@/stores/useOverNight';
import {getDatesBetween, getNextDay} from '@/utils/date/date';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';

type calenderOptionType = {
  startingDay?: boolean;
  endingDay?: boolean;
  color: string;
  textColor: string;
};

type selectOvernightType = {
  [day: string]: calenderOptionType;
};
LocaleConfig.locales.kr = calendarLocationConfig;
LocaleConfig.defaultLocale = 'kr';

const CalendarContainer = () => {
  const {overnightRequestValues, setOvernightRequestValues} =
    useOvernightRequestStore();
  const [selectDate, setSelectDate] = useState<selectOvernightType>({});
  const [ableDate, isSuccess] = useGetOvernightAbleSchedule();

  /**
   * 외박 신청 된 날짜를 체크하여 적용할 state
   * 추후 사용 될 가능성이 있다고 판단하여 아직 남겨두었습니다.
   */
  // const [markedDate, setMarkedDate] = useState<selectOvernightType>({});

  const selectOvernight = (day: DateData) => {
    /**
     * @param {DateData} day
     * 외박 일정을 선택하는 함수.
     * 최대 2개의 날짜를 선택할 수 있으며, 하나의 날짜가 선택되어 있는 경우,
     * 늦게 선택된 날짜까지의 기간을 구해 중간을 색칠해주는 기능.
     */
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
      if (days.length === 0) {
        setSelectDate({
          [day.dateString]: {
            startingDay: true,
            endingDay: true,
            color: colors.PRIMARY,
            textColor: colors.WHITE,
          },
        });
        return;
      }
      const daysObject: selectOvernightType = {};
      for (const day of days) {
        daysObject[day] = {
          color: colors.PRIMARY,
          textColor: colors.WHITE,
        };
      }
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
  return (
    <View style={styles.container}>
      <Calendar
        markingType={'period'}
        monthFormat={'yyyy년 M월'}
        onDayPress={(day: DateData) => selectOvernight(day)}
        markedDates={selectDate}
        theme={calenderThemeConfig}
        minDate={isSuccess ? ableDate[0] : ''}
        maxDate={isSuccess ? ableDate[ableDate.length - 1] : ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CalendarContainer;
