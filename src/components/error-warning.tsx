import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ErrorWarningProps {
  onClose: () => void;
}
export const ErrorWarning = ({ onClose }: ErrorWarningProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center visible bg-black/20 animate-fade-up animate-duration-500">
      <div className="popup">
        <div onClick={onClose} className="hover:cursor-pointer">
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            className="absolute top-0 right-0 m-2"
          />
        </div>

        <div className="m-8 text-center">
          <h3 className="mb-8">Sorry!</h3>
          <div className="h-full flex items-center justify-center">
            <p>
              This flight has a time conflict with your rotation schedule.
              Please choose a different flight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
