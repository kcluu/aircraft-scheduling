import { SECONDS_IN_A_DAY } from "../types/constants";

export const formatDaySecondsAsPercent = (seconds: number) => {
  // 86400 seconds in a day
  return seconds / SECONDS_IN_A_DAY;
};

export const formatSecondsAsDateObj = (seconds: number) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setSeconds(seconds);
  return tomorrow;
};

export const formatDecimalAsPercent = (decimal: number): string => {
  return `${(decimal * 100).toFixed(2)}%`;
};

export const calculateFlightDurationFromSeconds = (seconds: number) => {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);

  var hDisplay = h !== 0 ? h + "h " : "";
  var mDisplay = m !== 0 ? m + "m" : "";
  return `${hDisplay}${mDisplay}`;
};

export const getTomorrowDateString = () => {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  var weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var weekday = weekdays[currentDate.getDay()];
  var month = months[currentDate.getMonth()];

  var day = currentDate.getDate();

  var dateString = weekday + ", " + month + " " + day;
  return dateString;
};

export const getStandardDateTimeFromSeconds = (seconds: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setSeconds(seconds);
  return today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
