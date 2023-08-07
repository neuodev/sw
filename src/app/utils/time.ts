import dayjs, { Dayjs } from "dayjs";

export function getTotalTimeSpent(
  _intervals: Dayjs[],
  isActive: boolean
): [hour: number, minute: number, second: number] {
  const now = dayjs();
  const intervals = isActive ? [..._intervals, now] : [..._intervals];
  if (intervals.length <= 1) return [0, 0, 0];

  let start = intervals[0];
  let hour = 0;
  let minute = 0;
  let second = 0;

  for (let i = 1; i < intervals.length; i++) {
    const end = intervals[i];
    hour += end.diff(start, "hour");
    minute += end.diff(start, "minute");
    second += end.diff(start, "second");
    start = end;
  }

  return [hour, minute, second];
}
