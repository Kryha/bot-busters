export const isYesterday = (date: Date, currentDate: Date): boolean => {
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const isToday = (date: Date, currentDate: Date): boolean => {
  return date.toDateString() === currentDate.toDateString();
};

export const formatTimeIn24Hours = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const isMoreThanAWeekAgo = (date: Date, currentDate: Date): boolean => {
  const weekAgo = new Date(currentDate);
  weekAgo.setDate(currentDate.getDate() - 7);
  return date > weekAgo;
};

export const getDayOfWeek = (date: Date): string => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()] ?? "";
};

export const formatDate = (date: string | number): string => {
  const inputDate = new Date(date);
  const currentDate = new Date();

  if (isYesterday(inputDate, currentDate)) {
    return "Yesterday";
  } else if (isToday(inputDate, currentDate)) {
    return "Today";
  } else if (isMoreThanAWeekAgo(inputDate, currentDate)) {
    return getDayOfWeek(inputDate);
  } else {
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const year = inputDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
};

export const longDateFormat = (timestamp: number) => {
  const inputDate = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date = inputDate.toLocaleDateString("en-US", options);

  return `${formatDate(timestamp)}, ${date}`;
};

const formattedDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  return date.toLocaleDateString("en-US", options);
};
export const getRelativeDate = (daysAgo: number) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);

  return formattedDate(date);
};
