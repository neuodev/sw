import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useReducer } from "react";
import { produce } from "immer";

const TimeContext = React.createContext<TimeProviderContext | null>(null);

type TimeProviderContext = TimeState & TimeActions;

type TimeActions = {
  startTimer(time?: Dayjs): void;
  pauseTimer(): void;
  continueTimer(): void;
  resetTimer(): void;
  addSecond(): void;
};
type TimeState = {
  start: Dayjs | null;
  end: Dayjs | null;
  isTimerStarted: boolean;
  isStopped: boolean;
};

enum TimeActionType {
  Start = "start",
  Pause = "stop",
  Continue = "continue",
  Reset = "reset",
  AddSecond = "add-second",
}

type TimeAction =
  | { type: TimeActionType.Start; time?: Dayjs }
  | { type: TimeActionType.Pause }
  | { type: TimeActionType.Reset }
  | { type: TimeActionType.AddSecond }
  | { type: TimeActionType.Continue };

const defaultState: TimeState = {
  start: null,
  end: null,
  isStopped: true,
  isTimerStarted: false,
};

function timeReducer(state: TimeState, action: TimeAction): TimeState {
  switch (action.type) {
    case TimeActionType.Start:
      return produce(state, (d) => {
        const start = action.time || dayjs();
        d.start = start;
        d.end = start;
        d.isStopped = false;
        d.isTimerStarted = true;
      });
    case TimeActionType.Pause:
      return produce(state, (d) => {
        d.isStopped = true;
      });
    case TimeActionType.Continue:
      return produce(state, (d) => {
        d.isStopped = false;
      });
    case TimeActionType.Reset:
      return produce(defaultState, () => {});
    case TimeActionType.AddSecond:
      return produce(state, (d) => {
        if (!d.end) throw new Error("End never assigned a value");
        d.end = d.end.add(1, "second");
      });
    default:
      return state;
  }
}

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timeReducer, defaultState);

  const actions: TimeActions = {
    startTimer(time?: Dayjs) {
      dispatch({ type: TimeActionType.Start, time });
    },
    pauseTimer() {
      dispatch({ type: TimeActionType.Pause });
    },
    continueTimer() {
      dispatch({ type: TimeActionType.Continue });
    },
    resetTimer() {
      dispatch({ type: TimeActionType.Reset });
    },
    addSecond() {
      dispatch({ type: TimeActionType.AddSecond });
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
