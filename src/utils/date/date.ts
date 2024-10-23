interface daysType {
  [idx: number]: string;
}

const days: daysType = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

const getNextDay = (selectDate: string) => {
  const nextDay = new Date(selectDate);
  nextDay.setDate(nextDay.getDate() + 1);
  return makeDateString(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
  );
};

const formatUpdateTime = (date: Date) => {
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}월 ${day}일 ${days[date.getDay()]}요일`;
};

const makeDateString = (year: number, month: number, day: number) => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
    2,
    '0',
  )}`;
};

const formatSimpleDate = (date: Date) => {
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}월 ${day}일`;
};

function getDatesBetween(startDate: Date, endDate: Date) {
  let dates = [];
  let currentDate = new Date(startDate.getTime());

  while (currentDate < endDate) {
    const day = new Date(currentDate);
    const daysItem = makeDateString(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
    );
    dates.push(daysItem);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export {getNextDay, getDatesBetween, formatUpdateTime, formatSimpleDate};
