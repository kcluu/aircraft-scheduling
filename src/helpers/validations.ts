import { Flight } from "../types";
import { formatSecondsAsDateObj } from "./formatters";

export const checkForTimeConflict = (
  rotation: Flight[],
  desiredDepartingTimeInSeconds: number,
  desiredArrivalTimeInSeconds: number
) => {
  for (let i = 0; i < rotation.length; i++) {
    const scheduledDepartTime = formatSecondsAsDateObj(
      rotation[i].departureInSeconds
    );
    const scheduledArrivalTime = formatSecondsAsDateObj(
      rotation[i].arrivalInSeconds
    );
    const scheduledDepartTimeWithTurnaround = new Date(
      scheduledDepartTime.setMinutes(scheduledDepartTime.getMinutes() - 20)
    );
    const scheduledArrivalTimeWithTurnaround = new Date(
      scheduledArrivalTime.setMinutes(scheduledArrivalTime.getMinutes() + 20)
    );
    const isTimeInRange = (seconds: number) => {
      const time = formatSecondsAsDateObj(seconds);
      return (
        time >= scheduledDepartTimeWithTurnaround &&
        time <= scheduledArrivalTimeWithTurnaround
      );
    };
    const isBeforeDefaultFlight =
      formatSecondsAsDateObj(rotation[0].departureInSeconds) >
      formatSecondsAsDateObj(desiredDepartingTimeInSeconds);
    if (
      isTimeInRange(desiredDepartingTimeInSeconds) ||
      isTimeInRange(desiredArrivalTimeInSeconds) ||
      isBeforeDefaultFlight
    ) {
      return true;
    }
  }
  return false;
};

export const validateOriginAndDestination = (
  rotation: Flight[],
  flightToAdd: Flight
): string[] => {
  const indexOfFlightToAdd = rotation.findIndex(
    (flight) => flight.id === flightToAdd.id
  );
  const prevFlight = rotation[indexOfFlightToAdd - 1];
  const nextFlight = rotation[indexOfFlightToAdd + 1];
  let flightErrors = [];
  if (prevFlight && prevFlight.destination !== flightToAdd.origin) {
    flightErrors.push(`The origin city must match ${prevFlight.destination}`);
  }
  return flightErrors;
};
