import React from "react";
import Button from "../Common/Button";
import { useTime } from "@/app/context/time";

const Controller: React.FC<{
  onStart(): void;
  onStop(): void;
  onReset(): void;
  isActive: boolean;
}> = () => {
  const { startTimer, stopTimer, resetTimer, isTimerStarted, isActive } =
    useTime();
  return (
    <div className="flex mt-8 gap-7">
      <Button onClick={startTimer} disabled={!isActive}>
        Reset
      </Button>
      <Button onClick={stopTimer} disabled={!isActive}>
        Stop
      </Button>
      <Button onClick={resetTimer} disabled={isActive} variant="primary">
        Start
      </Button>
    </div>
  );
};

export default Controller;
