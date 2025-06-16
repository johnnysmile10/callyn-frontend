
import Step1TargetAudience from "../../outreach/steps/Step1TargetAudience";

interface Step2TargetAudienceProps {
  data: any;
  onUpdate: (data: any) => void;
}

const Step2TargetAudience = ({ data, onUpdate }: Step2TargetAudienceProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Step1TargetAudience data={data} onUpdate={onUpdate} />
    </div>
  );
};

export default Step2TargetAudience;
