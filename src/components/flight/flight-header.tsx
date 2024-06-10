import * as React from "react";
import AppContext from "../../context/app-context";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { SortType } from "../../types/constants";

export const FlightHeader = () => {
  const { state, setState } = React.useContext(AppContext);
  const [searchText, setSearchText] = React.useState("");
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [sortType, setSortType] = React.useState<SortType>();
  const isAircraftSelected = state.currAircraftId !== "";

  const handleSearch = (searchVal: string) => {
    const searchValLower = searchVal.toLowerCase();
    setState({
      ...state,
      flightFilters: {
        ...state.flightFilters,
        search: searchValLower,
      },
    });
  };

  const handleHideFlights = (hide: boolean) => {
    setState({
      ...state,
      flightFilters: {
        ...state.flightFilters,
        hideScheduledFlights: hide,
      },
    });
  };

  const handleSort = (sortType: SortType) => {
    setState({
      ...state,
      flightFilters: {
        ...state.flightFilters,
        sortType,
      },
    });
  };
  const getSortType = (sortType: string) => {
    switch (sortType) {
      case "DepartureDescending":
        return SortType.DepartureDescending;
      case "DepartureAscending":
        return SortType.DepartureAscending;
      case "ArrivalDescending":
        return SortType.ArrivalDescending;
      case "ArrivalAscending":
        return SortType.ArrivalAscending;
      default:
        return SortType.DepartureAscending;
    }
  };
  return (
    <>
      <div className="py-4 flex-grow text-gray-150 font-light text-18 text-center">
        <div className="section-header">Flights</div>
      </div>
      {isAircraftSelected && (
        <div className="flex justify-center">
          <div className="flex-wrap mb-4 space-y-2">
            <TextField
              id="outlined-size-small"
              label="Search"
              value={searchText}
              placeholder="Search by Origin, Destination, Flight ID"
              variant="outlined"
              size="small"
              onChange={(input) => {
                setSearchText(input.target.value);
                handleSearch(input.target.value);
              }}
              sx={{ width: 350, marginRight: "4px" }}
            />
            <div className="flex space-x-8">
              <FormControl sx={{ width: 150 }} size="small">
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortType}
                  label="Sort By"
                  onChange={(e) => {
                    setSortType(getSortType(e.target.value));
                    handleSort(getSortType(e.target.value));
                  }}
                >
                  <MenuItem value={SortType.DepartureAscending}>
                    Departure Time ascending
                  </MenuItem>
                  <MenuItem value={SortType.DepartureDescending}>
                    Departure Time descending
                  </MenuItem>
                  <MenuItem value={SortType.ArrivalAscending}>
                    Arrival Time ascending
                  </MenuItem>
                  <MenuItem value={SortType.ArrivalDescending}>
                    Arrival Time descending
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    onChange={(e) => {
                      setIsChecked(!isChecked);
                      handleHideFlights(e.target.checked);
                    }}
                    value={isChecked}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 12 }}>
                    Hide Scheduled Flights
                  </Typography>
                }
                sx={{ fontSize: "12px" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
