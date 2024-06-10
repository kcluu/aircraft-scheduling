import * as React from "react";
import AppContext from "../../context/app-context";
import { Flight } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  calculateFlightDurationFromSeconds,
  getStandardDateTimeFromSeconds,
} from "../../helpers/formatters";
import { TimeFormat } from "../../types/constants";

interface RotationCardProps {
  flight: Flight;
  onClick: () => void;
  errors: string;
}
export const RotationCard = ({
  flight,
  onClick,
  errors,
}: RotationCardProps) => {
  const { state } = React.useContext(AppContext);
  const isStandardTime = state.timeFormat === TimeFormat.Standard;
  const isDefaultFlight = state.currAircraftId === flight.id;
  const hasError = errors !== "";
  return (
    <div
      className={`rotation-card-container ${
        isDefaultFlight
          ? "cursor-default"
          : "cursor-pointer hover:border-blue-300"
      } ${hasError ? "border border-red-300" : "border"}`}
      onClick={isDefaultFlight ? () => {} : onClick}
    >
      {!isDefaultFlight && (
        <div onClick={onClick} className="hover:cursor-pointer ">
          <FontAwesomeIcon
            icon={faTrashCan}
            size="sm"
            className="absolute top-0 right-0 m-2"
            color="#c20c0c"
          />
        </div>
      )}
      <h3 className="flight-id">{flight.id}</h3>
      {isDefaultFlight && (
        <div className="absolute top-0 left-0 m-2">
          <div className="base-flight">Base Flight</div>
        </div>
      )}
      <div className={`justify-between items-center flex`}>
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
      {!isDefaultFlight && hasError && (
        <p className="validation-error">{errors}</p>
      )}
    </div>
  );
};
