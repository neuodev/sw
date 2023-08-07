import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useTime } from "@/app/context/time";
import { getTotalTimeSpent } from "@/app/utils/time";

const Time: React.FC<{ start: Dayjs }> = ({ start }) => {
  const { intervals, isActive } = useTime();
  const timeBlocks = getTotalTimeSpent(intervals, isActive);

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
