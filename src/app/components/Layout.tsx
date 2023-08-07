import "../globals.css";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-dark text-gray-100 font-rubik">
      {children}
    </div>
  );
};

export default Layout;
