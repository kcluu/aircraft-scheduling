import * as React from "react";
import AppContext from "../../context/app-context";
import { Typography } from "@mui/material";

export const RotationHeader = () => {
  const { state } = React.useContext(AppContext);
  const isAircraftSelected = state.currAircraftId !== "";
  return (
    <>
      <div className="py-4 text-gray-150 font-light text-18 text-center">
        <div className="section-header">Rotation</div>
        {isAircraftSelected && (
          <Typography variant="button" gutterBottom color={"#1976d2"}>
            {state.allAircrafts[state.currAircraftIndex].id}
          </Typography>
        )}
      </div>
    </>
  );
};
