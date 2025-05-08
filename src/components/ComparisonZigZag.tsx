
import React from 'react';
import { comparisonData } from './comparison/comparisonData';
import ComparisonPanel from './comparison/ComparisonPanel';
import { Button } from './ui/button';

const ComparisonZigZag: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-callyn-darkBlue text-center mb-16">
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

        {/* Get Started For Free button at the end */}
        <div className="mt-20 text-center">
          <Button className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-10 py-6 text-lg font-medium">
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonZigZag;
