import { Flight } from "../types";
import { AircraftData, FlightData } from "../types/data";

export const getAllFlights = async (): Promise<FlightData[]> => {
  const response = await fetch(
    `https://recruiting-assessment.alphasights.com/api/flights/`
  );
  const data = (await response.json()) as FlightData[];
  return data;
};

export const getFlightById = async (id: string): Promise<FlightData> => {
  const response = await fetch(
    `https://recruiting-assessment.alphasights.com/api/flights/${id}`
  );
  const data = (await response.json()) as FlightData;
  return data;
};

export const flightMapper = (data: FlightData[], aircrafts: AircraftData[]) => {
  const flights = data.map((flight) => {
    let {
      ident,
      departuretime,
      arrivaltime,
      readable_departure,
      readable_arrival,
      origin,
      destination,
    } = flight;
    const getScheduledAircraft = aircrafts.find(
      (aircraft) => aircraft.ident === flight.ident
    );
    return {
      id: ident,
      origin,
      destination,
      departureInSeconds: departuretime,
      arrivalInSeconds: arrivaltime,
      readableDepartureTime: readable_departure,
      readableArrivalTime: readable_arrival,
      durationInSeconds: arrivaltime - departuretime,
      errors: [],
      scheduledAircraft: getScheduledAircraft
        ? getScheduledAircraft.ident
        : undefined,
    } as Flight;
  });
  return flights;
};
