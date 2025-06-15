
import React from "react";

/**
 * CardSection - A simple reusable card-styled section wrapper for left, center, or right panels.
 */
interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
  noPad?: boolean;
  borderColor?: string; // e.g. Tailwind "border-blue-100"
}

const CardSection = ({
  children,
  className = "",
  noPad = false,
  borderColor = "border-blue-100",
}: CardSectionProps) => (
  <div
    className={`
      rounded-xl bg-white shadow
      ${borderColor} border
      ${noPad ? "" : "px-5 py-4"}
      mb-4
      ${className}
    `}
  >
    {children}
  </div>
);

export default CardSection;
