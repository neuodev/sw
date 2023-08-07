import { TimeProvider } from "../context/time";
import "../globals.css";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TimeProvider>
      <div className="w-full min-h-screen bg-dark text-gray-100 font-rubik">
        {children}
      </div>
    </TimeProvider>
  );
};

export default Layout;
