
import Step3ScriptLanguage from "../../outreach/steps/Step3ScriptLanguage";

interface Step3ScriptCreationProps {
  data: any;
  onUpdate: (data: any) => void;
}

const Step3ScriptCreation = ({ data, onUpdate }: Step3ScriptCreationProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Step3ScriptLanguage data={data} onUpdate={onUpdate} />
    </div>
  );
};

export default Step3ScriptCreation;
