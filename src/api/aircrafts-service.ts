import { AircraftData, FlightData } from "../types/data";
import { Aircraft, Flight, TimelineBlock, TimelineBlockType } from "../types";
import { formatDaySecondsAsPercent } from "../helpers/formatters";
import { flightMapper, getAllFlights, getFlightById } from "./flights-service";

export const getAllAircraftsAndFlights = async (): Promise<{
  aircrafts: Aircraft[];
  flights: Flight[];
}> => {
  const aircraftsData = await getAllAircrafts();
  const flightsData = await getAllFlights();
  const aircrafts = aircraftMapper(aircraftsData, flightsData);
  const flights = flightMapper(flightsData, aircraftsData);
  const result = { aircrafts, flights };
  return result;
};

export const getAllAircrafts = async (): Promise<AircraftData[]> => {
  const response = await fetch(
    "https://recruiting-assessment.alphasights.com/api/aircrafts"
  );
  const data = await response.json();
  return data as AircraftData[];
};

// Maps aircraft data to the Aircraft VM
export const aircraftMapper = (
  data: AircraftData[],
  flights: FlightData[]
): Aircraft[] => {
  const aircrafts = data.map((aircraft) => {
    let { ident, type, base, economySeats } = aircraft;
    const initialFlightData: FlightData = flights.find(
      (flight) => flight.ident === ident
    )!;
    const initialFlight = flightMapper([initialFlightData], data)[0];
    const rotation: Flight[] = [initialFlight];
    const initialTimelineBlock = {
      flightId: initialFlight.id,
      type: TimelineBlockType.Scheduled,
      percentOfDaySeconds: formatDaySecondsAsPercent(
        initialFlight.arrivalInSeconds - initialFlight.departureInSeconds
      ),
    } as TimelineBlock;
    const timeline = [initialTimelineBlock];
    const utilization = formatDaySecondsAsPercent(
      initialFlight.durationInSeconds
    );
    return {
      id: ident,
      type,
      base,
      economySeats,
      utilization,
      rotation,
      timeline,
    } as Aircraft;
  });

  return aircrafts;
};
