import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useReducer } from "react";
import { produce } from "immer";

const TimeContext = React.createContext<TimeProviderContext | null>(null);

type TimeProviderContext = TimeState & TimeActions;

type TimeActions = {
  startTimer(time?: Dayjs): void;
  stopTimer(): void;
  resetTimer(): void;
};
type TimeState = {
  intervals: Dayjs[];
  timeSpent: number;
  isTimerStarted: boolean;
  isActive: boolean;
};

enum TimeActionType {
  Start = "start",
  Stop = "stop",
  Reset = "reset",
}

type TimeAction =
  | { type: TimeActionType.Start; time?: Dayjs }
  | { type: TimeActionType.Stop }
  | { type: TimeActionType.Reset };

function timeReducer(state: TimeState, action: TimeAction): TimeState {
  switch (action.type) {
    case TimeActionType.Start:
      return produce(state, (d) => {
        d.intervals.push(action.time || dayjs());
        d.isActive = true;
        d.isTimerStarted = true;
      });
    case TimeActionType.Stop:
      return produce(state, (d) => {
        d.isActive = false;
      });
    case TimeActionType.Reset:
      return produce(state, (d) => {
        d.isActive = false;
        d.isTimerStarted = false;
        d.intervals = [];
      });
    default:
      return state;
  }
}

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timeReducer, {
    intervals: [],
    timeSpent: 0,
    isActive: false,
    isTimerStarted: false,
  });

  const actions: TimeActions = {
    startTimer(time?: Dayjs) {
      dispatch({ type: TimeActionType.Start, time });
    },
    stopTimer() {
      dispatch({ type: TimeActionType.Stop });
    },
    resetTimer() {
      dispatch({ type: TimeActionType.Reset });
    },
  };
  return (
    <TimeContext.Provider value={{ ...state, ...actions }}>
      {children}
    </TimeContext.Provider>
  );
};

export function useTime() {
  const ctx = useContext(TimeContext);

  if (!ctx) throw new Error("useTime  must be used within a TimeProvider");

  return ctx;
}
