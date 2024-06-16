import {colors} from '@/constants';

const calendarLocationConfig = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

const calenderThemeConfig = {
  arrowColor: colors.PRIMARY,
  arrowHeight: 24,
  arrowWidth: 24,
  todayTextColor: colors.PRIMARY,
  textSectionTitleColor: colors.FONT_DEFAULT,
  textDisabledColor: colors.FONT_WEAK,
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      color: 'red',
    },
    dayTextAtIndex6: {
      color: 'blue',
    },
  },
};

export {calendarLocationConfig, calenderThemeConfig};
