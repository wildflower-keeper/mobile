const getNextDay = (selectDate: string) => {
  const nextDay = new Date(selectDate);
  nextDay.setDate(nextDay.getDate() + 1);
  return makeDateString(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
  );
};

const makeDateString = (year: number, month: number, day: number) => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
    2,
    '0',
  )}`;
};

function getDatesBetween(startDate: Date, endDate: Date) {
  let dates = [];
  let currentDate = new Date(startDate.getTime());

  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export {getNextDay, getDatesBetween};
