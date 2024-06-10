import * as React from "react";
import { Flight } from "../../types";
import { SECONDS_IN_A_DAY } from "../../types/constants";

interface TimelineProps {
  rotation: Flight[];
}
enum TimelineBlockType {
  Scheduled,
  Turnaround,
  Idle,
}
type TimelineObj = {
  type: TimelineBlockType;
  blockWidth: number;
};
export const Timeline = ({ rotation }: TimelineProps) => {
  const [timelineWidth, setTimelineWidth] = React.useState(0);

  React.useEffect(() => {
    const element = document.getElementById("timeline");
    setTimelineWidth(element ? element.offsetWidth : 0);
  });
  const getFullTimeline = () => {
    let timeline: TimelineObj[] = [];
    const idleStart: TimelineObj = {
      type: TimelineBlockType.Idle,
      blockWidth:
        ((rotation[0].departureInSeconds / 3600) * timelineWidth) / 24,
    };
    timeline.push(idleStart);
    for (let i = 0; i < rotation.length; i++) {
      const scheduled: TimelineObj = {
        type: TimelineBlockType.Scheduled,
        blockWidth:
          ((rotation[i].durationInSeconds / 3600) * timelineWidth) / 24,
      };
      timeline.push(scheduled);
      if (i !== rotation.length - 1) {
        const turnaround: TimelineObj = {
          type: TimelineBlockType.Turnaround,
          blockWidth:
            (((rotation[i + 1].departureInSeconds -
              rotation[i].arrivalInSeconds) /
              3600) *
              timelineWidth) /
            24,
        };
        timeline.push(turnaround);
      }
    }
    const idleEnd: TimelineObj = {
      type: TimelineBlockType.Idle,
      blockWidth:
        (((SECONDS_IN_A_DAY - rotation[rotation.length - 1].arrivalInSeconds) /
          3600) *
          timelineWidth) /
        24,
    };
    timeline.push(idleEnd);
    return timeline;
  };
  return (
    <>
      <div className="pt-16 pb-16 border-t m-4">
        <div id="timeline" className="timeline">
          <div className="line" style={{ left: "0px" }}>
            <div className="time">00:00</div>
          </div>
          <div className="last-line" style={{ right: "0px" }}>
            <div className="time">24:00</div>
          </div>
          <div className="middle-line" style={{ right: "50%" }}>
            <div className="time">12:00</div>
          </div>
          <div className="flex w-full">
            {getFullTimeline().map((block, index) => {
              return (
                <div
                  key={index}
                  className={`time-block ${
                    block.type === TimelineBlockType.Scheduled && "green"
                  } ${block.type === TimelineBlockType.Idle && "medium-gray"} ${
                    block.type === TimelineBlockType.Turnaround && "purple"
                  } `}
                  style={{ width: `${block.blockWidth}px` }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="key-container">
        <div className="value">
          <div className="box green"></div>
          <div className="key-text">Scheduled</div>
        </div>
        <div className="value">
          <div className="box purple"></div>
          <div className="key-text">Turnaround</div>
        </div>
        <div className="value">
          <div className="box medium-gray"></div>
          <div className="key-text">Idle</div>
        </div>
      </div>
    </>
  );
};
