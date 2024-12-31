import {
  calendarLocationConfig,
  calenderThemeConfig,
} from '@/config/calendarConfig';
import { colors } from '@/constants';
import useGetOvernightAbleSchedule from '@/hooks/queries/useGetOvernightAbleSchedule';
import useSleepovers, { OvernightListResponseType } from '@/hooks/queries/useSleepovers';
import useOvernightRequestStore from '@/stores/useOverNight';
import { getDatesBetween, getNextDay } from '@/utils/date/date';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

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
  const { overnightRequestValues, setOvernightRequestValues } =
    useOvernightRequestStore();
  const [selectDate, setSelectDate] = useState<selectOvernightType>({});
  const [ableDate] = useGetOvernightAbleSchedule();
  const { data: sleepovers } = useSleepovers();
  useEffect(() => {
    const parseDate = (dateString: string, year: number) => {
      const [monthName, day] = dateString.split(' ');
      const month = getMonthNumber(monthName);
      const dayNumber = parseInt(day.replace('일', ''), 10);

      return new Date(year, month - 1, dayNumber);
    };

    const getMonthNumber = (monthName: string): number => {
      return +monthName.split('월')[0] || 1;
    };

    const generateDisabledDates = (data: OvernightListResponseType[] | undefined) => {
      const disabledDates: any = {};

      if(!data) return {};
      data.forEach(item => {
        const startDate = parseDate(item.startDate);
        const endDate = parseDate(item.endDate);

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const dateString = currentDate.toISOString().split('T')[0];
          disabledDates[dateString] = { disabled: true, textColor: "gray" };
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });

      return disabledDates;
    };

    const disabledDates = generateDisabledDates(sleepovers);
    setSelectDate((prev) => ({
      ...prev, ...disabledDates
    }));
  }, [sleepovers]);
  console.log("셀렉데이트", selectDate)
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
        minDate={ableDate?.[0]}
        maxDate={ableDate?.[ableDate.length - 1]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    width: '100%',
  },
});

export default CalendarContainer;
