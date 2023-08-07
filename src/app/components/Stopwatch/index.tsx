import React from "react";
import Time from "./Time";
import dayjs from "dayjs";
import Controller from "./Controller";

function Stopwatch() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Time start={dayjs().add(10, "minute")} />
      <Controller
        onStart={() => {}}
        onStop={() => {}}
        onReset={() => {}}
        isActive={false}
      />
    </div>
  );
}

export default Stopwatch;
