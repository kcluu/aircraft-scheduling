import * as React from "react";
import "./App.css";
import { getAllAircraftsAndFlights } from "./api/aircrafts-service";
import { AppContextProvider } from "./context/app-context";
import { AppState } from "./types";
import { Aircrafts } from "./components/aircraft/aircraft-list";
import { RotationSchedule } from "./components/rotation/rotation-schedule";
import { Flights } from "./components/flight/flight-list";
import { FlightHeader } from "./components/flight/flight-header";
import { RotationHeader } from "./components/rotation/rotation-header";
import { Header } from "./components/header";
import { TimeFormat } from "./types/constants";

export const AppContainer = () => {
  const defaultState = {
    allAircrafts: [],
    allFlights: [],
    originalFlightData: [],
    currAircraftId: "",
    currAircraftIndex: 0,
    showTimeConflictError: false,
    timeFormat: TimeFormat.Standard,
  } as AppState;
  const [initialState, setInitialState] =
    React.useState<AppState>(defaultState);
  React.useEffect(() => {
    setUpInitialState();
  }, []);
  const setUpInitialState = async () => {
    const { aircrafts, flights } = await getAllAircraftsAndFlights();
    const initialStateRes = {
      allAircrafts: aircrafts,
      allFlights: flights,
      originalFlightData: flights,
      currAircraftId: defaultState.currAircraftId,
      currAircraftIndex: defaultState.currAircraftIndex,
      showTimeConflictError: defaultState.showTimeConflictError,
      timeFormat: defaultState.timeFormat,
    } as AppState;
    setInitialState(initialStateRes);
  };

  return (
    <AppContextProvider value={initialState!}>
      <div className="h-screen">
        <div className="w-full flex justify-center">
          <Header />
        </div>
        <div className="dashboard">
          <div className="section w-1/3">
            <div className="flex px-8 md:px-4 border-b">
              <div className="py-4 flex-grow text-gray-150 font-light text-18 text-center">
                <div className="section-header">Aircrafts</div>
              </div>
            </div>
            <div
              className="py-2"
              style={{ height: "calc(100vh - 220px)", overflowY: "auto" }}
            >
              <Aircrafts />
            </div>
          </div>
          <div className="section w-1/3">
            <div className="px-8 md:px-4 border-b">
              <RotationHeader />
            </div>
            <RotationSchedule />
          </div>
          <div className="section w-1/3">
            <div className="px-8 md:px-4 border-b">
              <FlightHeader />
            </div>
            <div
              className="py-2"
              style={{ height: "calc(100vh - 320px)", overflowY: "auto" }}
            >
              <Flights />
            </div>
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
};
