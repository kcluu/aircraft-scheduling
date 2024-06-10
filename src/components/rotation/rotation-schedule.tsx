import * as React from "react";
import AppContext from "../../context/app-context";
import { AppState, Flight } from "../../types";
import { RotationCard } from "./rotation-card";
import { validateOriginAndDestination } from "../../helpers/validations";
import { Timeline } from "./timeline";
import { getNewUtilization } from "../../helpers/calc-utilization";

export const RotationSchedule = () => {
  const { state, setState } = React.useContext(AppContext);
  const isAircraftSelected = state.currAircraftId !== "";
  const currRotation = isAircraftSelected
    ? state.allAircrafts[state.currAircraftIndex].rotation
    : [];
  const removeFlightFromRotation = (flight: Flight) => {
    const scheduledAircraft = state.allAircrafts[state.currAircraftIndex];
    const currAircraftRotation =
      state.allAircrafts[state.currAircraftIndex].rotation;
    const newAircraftRotation = currAircraftRotation.filter(
      (x) => x.id !== flight.id
    );
    const updatedAllAircrafts = state.allAircrafts.map((aircraft) => {
      if (aircraft.id === scheduledAircraft.id) {
        return {
          ...aircraft,
          rotation: newAircraftRotation,
          utilization: getNewUtilization(newAircraftRotation),
        };
      } else {
        return aircraft;
      }
    });
    const updatedAllFlights = state.originalFlightData.map((x) => {
      if (x.id === flight.id) {
        return {
          ...x,
          scheduledAircraft: undefined,
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
  };
  return (
    <div className="py-2">
      {isAircraftSelected ? (
        <div style={{ height: "calc(100vh - 450px)", overflowY: "auto" }}>
          {currRotation.map((flight, i) => {
            const errors = validateOriginAndDestination(currRotation, flight);
            return (
              <RotationCard
                flight={flight}
                onClick={() => removeFlightFromRotation(flight)}
                errors={errors.length > 0 ? errors.join(", ") : ""}
                key={i}
              />
            );
          })}
        </div>
      ) : (
        <p className="h-full flex items-center justify-center m-6">
          Please select an aircraft to create a rotation.
        </p>
      )}
      {isAircraftSelected && <Timeline rotation={currRotation} />}
    </div>
  );
};
