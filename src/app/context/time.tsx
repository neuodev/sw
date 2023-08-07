import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { produce } from "immer";
import { snapshotsDB } from "../storage/snapshots";

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
  snapshots: Dayjs[];
};

enum TimeActionType {
  Start = "start",
  Pause = "stop",
  Continue = "continue",
  Reset = "reset",
  AddSecond = "add-second",
  SetSnapshots = "set-snapshots",
}

type TimeAction =
  | { type: TimeActionType.Start; time?: Dayjs }
  | { type: TimeActionType.Pause }
  | { type: TimeActionType.Continue }
  | { type: TimeActionType.Reset }
  | { type: TimeActionType.AddSecond }
  | { type: TimeActionType.SetSnapshots; snapshots: Dayjs[] };

const defaultState: TimeState = {
  start: null,
  end: null,
  isStopped: true,
  isTimerStarted: false,
  snapshots: [],
};

function timeReducer(state: TimeState, action: TimeAction): TimeState {
  switch (action.type) {
    case TimeActionType.Start:
      return produce(state, (d) => {
        let start: Dayjs;

        if (state.snapshots.length === 0) {
          start = dayjs();
          d.snapshots.push(start);
        } else {
          start = state.snapshots[state.snapshots.length - 1];
        }

        d.start = start;
        d.end = start;
        d.isStopped = false;
        d.isTimerStarted = true;
      });

    case TimeActionType.Pause:
      return produce(state, (d) => {
        if (!state.end) throw new Error("No end date");

        d.isStopped = true;
        d.snapshots.push(state.end);
        snapshotsDB.save(dayjs(), d.snapshots);
      });
    case TimeActionType.Continue:
      return produce(state, (d) => {
        d.isStopped = false;
      });
    case TimeActionType.SetSnapshots:
      return produce(state, (d) => {
        d.snapshots = action.snapshots;
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
  const [state, dispatch] = useReducer(timeReducer, {
    ...defaultState,
  });

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

  useEffect(() => {
    snapshotsDB.load(dayjs()).then((snapshots) => {
      if (!snapshots) return;
      dispatch({ type: TimeActionType.SetSnapshots, snapshots });
    });
  }, []);
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
