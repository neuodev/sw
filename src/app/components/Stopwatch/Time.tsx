import React from "react";
import { useTime } from "@/app/context/time";

const Time: React.FC<{}> = () => {
  const { start, end } = useTime();

  const timeBlocks: number[] =
    start && end
      ? [
          end.diff(start, "hour"),
          end.diff(start, "minute"),
          end.diff(start, "second"),
        ]
      : [0, 0, 0];

  return (
    <div className="w-64 h-64 border-2 border-gray-100 rounded-full flex items-center justify-center">
      {timeBlocks.map((time, idx) => (
        <span className="font-bold text-4xl" key={idx}>
          <span className="">
            {time.toString().length === 1 ? `0${time}` : time}
          </span>
          {idx !== timeBlocks.length - 1 && <span>:</span>}
        </span>
      ))}
    </div>
  );
};

export default Time;
