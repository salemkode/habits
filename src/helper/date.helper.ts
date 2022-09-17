// Get start of week
export function getStartWeekDay() {
  // Get today
  const today = getToday();

  // Get day index
  const todayIndex = today.getDay();

  // Get date minus index day to make index day zero
  today.setDate(today.getDate() - todayIndex);

  // return date
  return today;
}

// Get start of week
export function getEndWeekDay() {
  // Get today
  const today = getToday();

  // Get rest index
  const todayIndex = today.getDay();

  // Get rest days of week
  today.setDate(today.getDate() + (6 - todayIndex));

  // return date
  return today;
}

// Get date object without hours
export function getToday() {
  const today = new Date();

  // Reset a Date's time to midnight
  today.setHours(0, 0, 0, 0);

  //
  return today;
}

// Get Day name
export function getDayName(dayIndex: number, isLongName = true) {
  const longDaysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const shortDaysNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return isLongName ? longDaysNames[dayIndex] : shortDaysNames[dayIndex];
}

// Date methods
export function getDaysInMonth(year: number, month: number) {
  // Call the new Date() constructor, passing it 0 for the days.
  // The method will return the date corresponding to the last day of the month.
  return new Date(year, month, 0).getDate();
}

// Get mouth day
// monthIndex start with 0 and end in 11
export function getMonthName(monthIndex: number) {
  const date = new Date(2000, monthIndex);
  return date.toLocaleString("en", { month: "long" });
}

// Get date ring
export function getDayRing(startDate: Date, endDate: Date) {
  const currentDate = startDate;
  const resultRing: string[] = [];
  while (currentDate.getTime() <= endDate.getTime()) {
    // Add new date in result
    resultRing.push(currentDate.toLocaleDateString("en"));

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return resultRing;
}

// Get week days with any day in week
export function getWeekDays(year: number, monthIndex: number, day: number) {
  const date = new Date(year, monthIndex, day);
  const result: Date[] = [];

  // Reset date to first day in week
  date.setDate(date.getDate() - date.getDay());

  // Make loop from start day to end day in week
  for (let i = 0; i < 7; i++) {
    // Add new day to list
    result.push(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)
    );
  }

  //
  return result;
}

// Get date after number of days
export function getDateAfter(_date: Date, countOfDays: number) {
  // Clone date
  const date = new Date(_date);

  // Add count of days to date
  date.setDate((_date.getDate() + countOfDays) | 0);

  // Return date
  return date;
}

// Get date after number of days
export function getDifferenceDays(startDate: Date, endDate: Date) {
  //
  const differenceMs = endDate.getTime() - startDate.getTime();

  // Return date
  return differenceMs / 1000 / 60 / 60 / 24;
}
