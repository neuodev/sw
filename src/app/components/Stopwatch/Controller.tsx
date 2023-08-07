import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Common/Button";
import { useTime } from "@/app/context/time";
import dayjs from "dayjs";
import { snapshotsDB } from "@/app/storage/snapshots";

const Controller: React.FC<{}> = () => {
  const {
    startTimer,
    pauseTimer,
    resetTimer,
    continueTimer,
    addSecond,
    isStopped,
    isTimerStarted,
  } = useTime();
  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isStopped) addSecond();
    }, 1_000);

    if (intervalRef.current && isStopped) clearInterval(intervalRef.current);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [addSecond, isStopped]);

  const resetTimerHandler = useCallback(async () => {
    resetTimer();
    await snapshotsDB.clean(dayjs());
  }, [resetTimer]);
  return (
    <div className="flex mt-8 gap-7">
      {isTimerStarted && (
        <Button onClick={resetTimerHandler} variant="error">
          Reset
        </Button>
      )}

      {((!isTimerStarted && isStopped) || (isTimerStarted && !isStopped)) && (
        <Button onClick={pauseTimer} disabled={isStopped} variant="error">
          Stop
        </Button>
      )}

      {isStopped && (
        <Button
          onClick={() =>
            isTimerStarted ? continueTimer() : startTimer(dayjs())
          }
          disabled={!isStopped}
          variant="primary"
        >
          Start
        </Button>
      )}
    </div>
  );
};

export default Controller;
