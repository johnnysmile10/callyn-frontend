
import React from 'react';
import { comparisonData } from './comparison/comparisonData';
import ComparisonPanel from './comparison/ComparisonPanel';

const ComparisonZigZag: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-16">
          Let Callyn Call, Qualify, and Book for You in minutes
        </h2>

        {comparisonData.map((item, index) => (
          <ComparisonPanel 
            key={index}
            item={item}
            reverse={index % 2 !== 0}
            isLastItem={index === comparisonData.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default ComparisonZigZag;
