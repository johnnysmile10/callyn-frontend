
import React from "react";

/**
 * SectionHeader - Styled section header with optional subtext.
 */
interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  subtext?: string;
  className?: string;
}
const SectionHeader = ({ title, icon, subtext, className = "" }: SectionHeaderProps) => (
  <div className={`flex items-center gap-2 mb-2 ${className}`}>
    {icon && <span>{icon}</span>}
    <h3 className="font-semibold text-base text-blue-900 flex-1">{title}</h3>
    {subtext && <span className="text-xs text-gray-500 ml-2">{subtext}</span>}
  </div>
);

export default SectionHeader;
