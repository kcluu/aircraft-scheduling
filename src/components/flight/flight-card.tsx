import * as React from "react";
import AppContext from "../../context/app-context";
import { Flight } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import {
  calculateFlightDurationFromSeconds,
  getStandardDateTimeFromSeconds,
} from "../../helpers/formatters";
import { TimeFormat } from "../../types/constants";

interface FlightCardProps {
  flight: Flight;
  onClick: () => void;
}
export const FlightCard = ({ flight, onClick }: FlightCardProps) => {
  const { state, setState } = React.useContext(AppContext);
  const isStandardTime = state.timeFormat === TimeFormat.Standard;
  const isFlightAvailable = !(flight.scheduledAircraft !== undefined);
  return (
    <div
      className={`rotation-card-container border ${
        isFlightAvailable
          ? "cursor-pointer hover:border-blue-300"
          : "cursor-default medium-gray"
      }`}
      onClick={isFlightAvailable ? onClick : () => {}}
    >
      <div className="flight-id">{flight.id}</div>

      <div className={`justify-between flex`}>
        <div className="detail-container">
          <div className="header">{flight.origin}</div>
          <div className="footer">
            {isStandardTime
              ? getStandardDateTimeFromSeconds(flight.departureInSeconds)
              : flight.readableDepartureTime}
          </div>
        </div>
        <div className="detail-container">
          <div>
            <FontAwesomeIcon
              icon={faPlane}
              size="lg"
              className="text-center w-full"
            />
            <div className="footer">
              {calculateFlightDurationFromSeconds(flight.durationInSeconds)}
            </div>
          </div>
        </div>
        <div className="detail-container">
          <div className="header">{flight.destination}</div>
          <div className="footer">
            {isStandardTime
              ? getStandardDateTimeFromSeconds(flight.arrivalInSeconds)
              : flight.readableArrivalTime}
          </div>
        </div>
      </div>
    </div>
  );
};
