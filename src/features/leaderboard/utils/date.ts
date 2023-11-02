const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  return date.toLocaleDateString("en-US", options);
};

export const getRelativeDate = (daysAgo: number) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);

  return formatDate(date);
};
