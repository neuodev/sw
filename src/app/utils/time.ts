import dayjs, { Dayjs } from "dayjs";

export function getFormattedDiff(start: Dayjs, end: Dayjs): string {
  return [
    end.diff(start, "hour"),
    end.diff(start, "minute"),
    end.diff(start, "second"),
  ]
    .map((time) =>
      time.toString().length === 1
        ? "0".concat(time.toString())
        : time.toString()
    )
    .join(":");
}

export function analyseSnapshots(snapshots: Dayjs[]): {
  min: number;
  max: number;
  avg: number;
} {
  const intervals = snapshots
    .map((snapshot: Dayjs, idx) => {
      const start = snapshot;
      const end = snapshots[idx + 1];
      if (!end) return null;
      return end.diff(start, "millisecond");
    })
    .filter((time) => time !== null) as number[];

  if (intervals.length === 0)
    return {
      min: 0,
      max: 0,
      avg: 0,
    };

  const min = Math.min(...intervals);
  const max = Math.max(...intervals);
  const avg =
    intervals.reduce((prev, curr) => (prev += curr), 0) / intervals.length;

  return {
    min,
    max,
    avg,
  };
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatMs(
  milliseconds: number
): `${string}:${string}:${string}` {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}
