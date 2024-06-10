import * as React from "react";
import AppContext from "../../context/app-context";
import { Aircraft } from "../../types";
import { formatDecimalAsPercent } from "../../helpers/formatters";

interface AircraftCardProps {
  aircraft: Aircraft;
  onClick: () => void;
}
export const AircraftCard = ({ aircraft, onClick }: AircraftCardProps) => {
  const { state } = React.useContext(AppContext);
  const isAircraftSelected = state.currAircraftId === aircraft.id;
  return (
    <div
      className={`relative bg-white flex flex-col border py-8 px-4 m-2 cursor-pointer hover:border-blue-300 ${
        isAircraftSelected ? "border-blue-300" : ""
      }`}
      onClick={onClick}
    >
      <div className="justify-between flex cursor-pointer">
        <div className="flex flex-grow md:w-1/3 text-left pr-10 items-center space-x-4">
          <div className="h-full pr-4 border-r border-gray-200 flex flex-shrink items-center">
            <div className="aircraft-id"> {aircraft.id}</div>
          </div>
          <div className="flex text-14 md:text-12 items-center leading-20 font-light whitespace-no-wrap space-x-8 mx-4">
            <div className="aircraft-desc">
              <div className="header">{aircraft.type}</div>
              <div className="footer">Type</div>
            </div>
            <div className="aircraft-desc">
              <div className="header">{aircraft.economySeats}</div>
              <div className="footer">Seats</div>
            </div>
            <div className="aircraft-desc">
              <div className="header">{aircraft.base}</div>
              <div className="footer">Base</div>
            </div>
          </div>
        </div>
        <div className="aircraft-desc">
          <div className="header">
            {formatDecimalAsPercent(aircraft.utilization)}
          </div>
          <div className="footer">{"Utilization (%)"}</div>
        </div>
      </div>
    </div>
  );
};
