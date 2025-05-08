
import React from 'react';

export interface ComparisonItem {
  number: string;
  title: string;
  description: string;
  exampleText?: string;
  image: string;
}

interface ComparisonPanelProps {
  item: ComparisonItem;
  reverse?: boolean;
  isLastItem?: boolean;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ 
  item, 
  reverse = false,
  isLastItem = false
}) => {
  
  return (
    <div className={isLastItem ? "" : "mb-24"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className={reverse ? "order-2 md:order-2" : "order-2 md:order-1"}>
          <div className="bg-callyn-lightBlue text-callyn-blue py-2 px-6 rounded-full inline-block mb-6 font-medium">
            STEP {item.number}
          </div>
          <h3 className="text-3xl font-bold text-callyn-darkBlue mb-4">
            {item.title}
          </h3>
          <p className="text-lg text-gray-600 mb-2">
            {item.description}
          </p>
          {item.exampleText && (
            <p className="text-lg text-gray-600 italic">
              {item.exampleText}
            </p>
          )}
        </div>
        <div className={reverse ? "order-1 md:order-1" : "order-1 md:order-2"}>
          <img 
            src={item.image} 
            alt={`Step ${item.number} - ${item.title}`}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;
