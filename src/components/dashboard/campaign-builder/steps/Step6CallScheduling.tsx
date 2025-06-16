
import Step4CallScheduling from "../../outreach/steps/Step4CallScheduling";

interface Step6CallSchedulingProps {
  data: any;
  onUpdate: (data: any) => void;
}

const Step6CallScheduling = ({ data, onUpdate }: Step6CallSchedulingProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Step4CallScheduling data={data} onUpdate={onUpdate} />
    </div>
  );
};

export default Step6CallScheduling;
