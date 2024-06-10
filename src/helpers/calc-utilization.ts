import { Flight } from "../types";
import { formatDaySecondsAsPercent } from "./formatters";

export const getNewUtilization = (rotation: Flight[]) => {
  let utilizationSum = 0;
  rotation.map(
    (flight) => (utilizationSum = utilizationSum + flight.durationInSeconds)
  );
  return formatDaySecondsAsPercent(utilizationSum);
};
