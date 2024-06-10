import * as React from "react";
import AppContext from "../../context/app-context";
import { AppState, Flight } from "../../types";
import { FlightCard } from "./flight-card";
import { checkForTimeConflict } from "../../helpers/validations";
import { getNewUtilization } from "../../helpers/calc-utilization";
import {
  hideScheduledFlights,
  search,
  sortBySortType,
} from "../../helpers/filter";
import { ErrorWarning } from "../error-warning";

export const Flights = () => {
  const { state, setState } = React.useContext(AppContext);
  const [showTimeConflictError, setShowTimeConflictError] =
    React.useState<boolean>(false);
  React.useState<boolean>(false);
  const flights = () => {
    let allFlights = state.originalFlightData;
    if (state.flightFilters) {
      if (state.flightFilters.search) {
        const searchVal = state.flightFilters.search;
        allFlights = search(searchVal, allFlights);
      }
      if (state.flightFilters.sortType) {
        const sortType = state.flightFilters.sortType;
        allFlights = sortBySortType(sortType, allFlights);
      }
      if (state.flightFilters.hideScheduledFlights) {
        const hide = state.flightFilters.hideScheduledFlights;
        allFlights = hideScheduledFlights(hide, allFlights);
      }
    }
    return allFlights;
  };
  const isAircraftSelected = state.currAircraftId !== "";
  const currRotation = isAircraftSelected
    ? state.allAircrafts[state.currAircraftIndex].rotation
    : [];
  const onClick = (flight: Flight, index: number) => {
    // Validate flight to be added's time with current rotation for conflicts:
    const hasTimeConflict = checkForTimeConflict(
      currRotation,
      flight.departureInSeconds,
      flight.arrivalInSeconds
    );

    // If validated, add flight to current aircraft's rotation:
    if (!hasTimeConflict) {
      currRotation.push(flight);
      currRotation.sort((a, b) => a.departureInSeconds - b.departureInSeconds);
      const scheduledAircraft = state.allAircrafts[state.currAircraftIndex];
      const newUtilization = getNewUtilization(currRotation);
      const updatedAllAircrafts = state.allAircrafts.map((aircraft) => {
        if (aircraft.id === scheduledAircraft.id) {
          return {
            ...aircraft,
            rotation: currRotation,
            utilization: newUtilization,
          };
        } else {
          return aircraft;
        }
      });
      const updatedAllFlights = state.originalFlightData.map((x) => {
        if (x.id === flight.id) {
          return {
            ...x,
            scheduledAircraft,
          };
        } else {
          return x;
        }
      });
      const newState = {
        ...state,
        allAircrafts: updatedAllAircrafts,
        allFlights: updatedAllFlights,
        originalFlightData: updatedAllFlights,
      } as AppState;
      setState(newState);
    } else {
      setShowTimeConflictError(true);
    }
  };
  return (
    <>
      {isAircraftSelected ? (
        flights().map((flight, i) => {
          return (
            <div key={i} className="bg-white">
              <FlightCard flight={flight} onClick={() => onClick(flight, i)} />
            </div>
          );
        })
      ) : (
        <p className="flex m-6 justify-center">
          Please select an aircraft to view available flights.
        </p>
      )}
      {showTimeConflictError && (
        <ErrorWarning onClose={() => setShowTimeConflictError(false)} />
      )}
    </>
  );
};
