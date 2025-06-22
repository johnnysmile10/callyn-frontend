
import Step2LeadList from "../../outreach/steps/Step2LeadList";

interface Step5LeadManagementProps {
  data: any;
  onUpdate: (data: any) => void;
}

const Step5LeadManagement = ({ data, onUpdate }: Step5LeadManagementProps) => {
  // Extract leadList from the leadManagement object structure
  const leadList = data?.leadList || [];

  // Handle updates to the lead list
  const handleLeadListUpdate = (updatedLeadList: any[]) => {
    // Update the entire leadManagement object with the new leadList
    const updatedData = {
      ...data,
      leadList: updatedLeadList,
      leadSources: data?.leadSources || [],
      importMethod: data?.importMethod || ''
    };
    onUpdate(updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Step2LeadList 
        data={leadList} 
        onUpdate={handleLeadListUpdate} 
      />
    </div>
  );
};

export default Step5LeadManagement;
