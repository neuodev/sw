import React from "react";
import classnames from "classnames";

const Button: React.FC<{
  children: React.ReactNode;
  variant?: "error" | "info" | "primary" | "secondary";
  disabled?: boolean;
  onClick?(): void | Promise<void>;
}> = ({ children, variant, disabled, onClick }) => {
  return (
    <button
      className={classnames(
        "border w-24 py-2 flex items-center justify-center rounded-md focus:ring-2 focus:ring-gray-600 font-medium outline-none",
        variant === "error" && "border-red-500 focus:ring-red-500 text-red-500",
        variant === "secondary" && "border-gray-800 text-gray-500",
        disabled && "cursor-not-allowed border-gray-800 text-gray-500"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
