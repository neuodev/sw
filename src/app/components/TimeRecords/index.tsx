import { useTime } from "@/app/context/time";
import { analyseSnapshots, formatMs, getFormattedDiff } from "@/app/utils/time";
import { Dayjs } from "dayjs";
import React from "react";

const TimeRecords = () => {
  const { snapshots } = useTime();
  const { min, max, avg } = analyseSnapshots(snapshots);
  return (
    <div>
      {snapshots.map((snapshot: Dayjs, idx: number) => {
        const start = snapshot;
        const end = snapshots[idx + 1];
        if (!end) return;
        return (
          <div
            className="flex justify-between items-center w-96 mb-2 font-medium text-lg border-b"
            key={idx}
          >
            <p>#{idx + 1}</p>
            <p>{getFormattedDiff(start, end)}</p>
          </div>
        );
      })}

      <div className="mt-20">
        {[
          { label: "Min. Record", value: min },
          { label: "Max. Record", value: max },
          { label: "Avg. Record", value: avg },
        ]
          .filter(({ value }) => value === 0)
          .map(({ label, value }) => (
            <div
              className="flex flex-row items-center justify-between w-96 font-medium text-lg mb-2"
              key={label}
            >
              <p>{label}</p>
              <p>{formatMs(value)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimeRecords;
