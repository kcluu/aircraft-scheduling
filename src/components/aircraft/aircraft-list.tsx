import * as React from "react";
import AppContext from "../../context/app-context";
import { Aircraft, AppState } from "../../types";
import { AircraftCard } from "./aircraft-card";

export const Aircrafts = () => {
  const { state, setState } = React.useContext(AppContext);
  const aircrafts = state.allAircrafts;
  const onClick = (aircraft: Aircraft, index: number) => {
    const newState = {
      ...state,
      currAircraftId: aircraft.id,
      currAircraftIndex: index,
    } as AppState;
    setState(newState);
  };
  return (
    <>
      {aircrafts.map((aircraft, i) => {
        return (
          <AircraftCard
            key={i}
            aircraft={aircraft}
            onClick={() => onClick(aircraft, i)}
          />
        );
      })}
    </>
  );
};
