import React from "react";
import Time from "./Time";
import dayjs from "dayjs";
import Controller from "./Controller";

function Stopwatch() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Time />
      <Controller />
    </div>
  );
}

export default Stopwatch;
