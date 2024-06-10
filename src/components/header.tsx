import * as React from "react";
import { getTomorrowDateString } from "../helpers/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TimeFormat } from "../types/constants";
import AppContext from "../context/app-context";
export const Header = () => {
  const { state, setState } = React.useContext(AppContext);
  const [timeFormat, setTimeFormat] = React.useState<TimeFormat>(
    state.timeFormat
  );
  const timeFormatSetting = () => {
    const timeFormats = [TimeFormat.Standard, TimeFormat.Military];
    const handleTimeFormatChange = (
      event: React.MouseEvent<HTMLElement>,
      format: number
    ) => {
      setTimeFormat(timeFormats[format]);
      setState({ ...state, timeFormat: timeFormats[format] });
    };
    return (
      <ToggleButtonGroup
        color="primary"
        value={timeFormat}
        exclusive
        onChange={handleTimeFormatChange}
        aria-label="Platform"
        size="small"
      >
        <ToggleButton
          value={TimeFormat.Standard}
          sx={{ fontSize: "11px", borderRadius: "2px" }}
        >{`Standard Time`}</ToggleButton>
        <ToggleButton
          value={TimeFormat.Military}
          sx={{ fontSize: "11px", borderRadius: "2px" }}
        >{`Military Time`}</ToggleButton>
      </ToggleButtonGroup>
    );
  };
  return (
    <>
      <div className="flex items-center justify-between w-1/3">
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="xl"
          className="cursor-pointer"
          color="#0a0f2b"
        />
        <div className="py-8 justify-center text-gray-150 font-light text-18 text-center">
          <div className="date-header">{getTomorrowDateString()}</div>
        </div>
        <FontAwesomeIcon
          icon={faAngleRight}
          size="xl"
          className="cursor-pointer"
          color="#0a0f2b"
        />
      </div>
      <div className="absolute right-0">{timeFormatSetting()}</div>
    </>
  );
};
