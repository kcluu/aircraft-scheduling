import { Flight } from "../types";
import { SortType } from "../types/constants";

export const search = (val: string, allFlights: Flight[]): Flight[] => {
  return allFlights.filter(
    (flight) =>
      flight.origin.toLowerCase().includes(val) ||
      flight.destination.toLowerCase().includes(val) ||
      flight.id.toLowerCase().includes(val)
  );
};

export const sortBySortType = (
  sortType: SortType,
  allFlights: Flight[]
): Flight[] => {
  switch (sortType) {
    case SortType.DepartureAscending:
      return allFlights.sort(
        (a, b) => a.departureInSeconds - b.departureInSeconds
      );
    case SortType.DepartureDescending:
      return allFlights.sort(
        (a, b) => b.departureInSeconds - a.departureInSeconds
      );
    case SortType.ArrivalAscending:
      return allFlights.sort((a, b) => a.arrivalInSeconds - b.arrivalInSeconds);
    case SortType.ArrivalDescending:
      return allFlights.sort((a, b) => b.arrivalInSeconds - a.arrivalInSeconds);
    default:
      return allFlights;
  }
};

export const hideScheduledFlights = (
  hide: boolean,
  allFlights: Flight[]
): Flight[] => {
  if (hide) {
    return allFlights.filter(
      (flight) => flight.scheduledAircraft === undefined
    );
  } else {
    return allFlights;
  }
};
