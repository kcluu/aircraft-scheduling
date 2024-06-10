import { SortType, TimeFormat } from "./constants";
import { AircraftData } from "./data";

export interface AppState {
  allAircrafts: Aircraft[];
  allFlights: Flight[];
  originalFlightData: Flight[];
  flightFilters?: Filters;
  currAircraftId: string;
  currAircraftIndex: number;
  showTimeConflictError: boolean;
  timeFormat: TimeFormat;
}
export interface Filters {
  search?: string;
  sortType?: SortType;
  hideScheduledFlights?: boolean;
}
export interface Aircraft {
  id: string;
  type: string;
  economySeats: number;
  base: string;
  utilization: number;
  rotation: Flight[];
  timeline: TimelineBlock[];
}

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  departureInSeconds: number;
  arrivalInSeconds: number;
  readableDepartureTime: string;
  readableArrivalTime: string;
  durationInSeconds: number;
  errors?: string[];
  scheduledAircraft?: Aircraft;
}

export enum TimelineBlockType {
  Scheduled,
  Turnaround,
  Idle,
}

export interface TimelineBlock {
  flightId: string;
  type: TimelineBlockType;
  percentOfDaySeconds: number; // 86400 seconds in a day
}
