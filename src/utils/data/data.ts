import { differenceInDays } from "date-fns";
import { OvernightListResponseType } from "../api/type";
import { formatUpdateTime } from "../date/date";
import { format } from 'date-fns';
import { Dispatch, SetStateAction } from "react";
import { disableOptionType } from "../type/type";

export const mapSleepoverData = (sleepovers: OvernightListResponseType[]) => {
    return sleepovers?.map(
        ({ startDate: startDateStr, endDate: endDateStr, ...props }) => {
            const startDate = new Date(startDateStr);
            return {
                dayDiff: differenceInDays(startDate, new Date()),
                startDate: formatUpdateTime(startDate),
                endDate: formatUpdateTime(new Date(endDateStr)),
                ...props,
            };
        },
    );
}


export const getDateRange = (startDateStr: string, endDateStr: string): string[] => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const dateArray: string[] = [];

    // 날짜가 유효한지 확인
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
    }

    let currentDate = startDate;

    // 종료 날짜까지 반복
    while (currentDate <= endDate) {
        dateArray.push(format(currentDate, 'yyyy-MM-dd')); // 원하는 형식으로 날짜 추가
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1); // 하루 증가
    }
    return dateArray;
};


export const generateDisabledDate = (startDateStr: string, endDateStr: string, setDisabledDates: Dispatch<SetStateAction<disableOptionType>>) => {
    const dateRange = getDateRange(startDateStr, endDateStr);
    dateRange.map((date) => {
      setDisabledDates((prev) => ({
        ...prev, [date]: {
          disabled: true
        }
      }))
    });
  };

  