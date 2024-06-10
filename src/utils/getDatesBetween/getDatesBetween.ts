function getDatesBetween(startDate: Date, endDate: Date) {
  let dates = [];
  let currentDate = new Date(startDate.getTime());

  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export default getDatesBetween;
