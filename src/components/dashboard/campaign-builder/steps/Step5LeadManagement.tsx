
import Step2LeadList from "../../outreach/steps/Step2LeadList";

interface Step5LeadManagementProps {
  data: any;
  onUpdate: (data: any) => void;
}

const Step5LeadManagement = ({ data, onUpdate }: Step5LeadManagementProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Step2LeadList data={data} onUpdate={onUpdate} />
    </div>
  );
};

export default Step5LeadManagement;
