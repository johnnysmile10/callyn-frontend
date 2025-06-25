
import { useSupportForm } from "./hooks/useSupportForm";
import SupportForm from "./SupportForm";
import SupportSuccess from "./SupportSuccess";
import SupportHelpResources from "./SupportHelpResources";

const SupportSection = () => {
  const { isSubmitted, resetForm } = useSupportForm();

  if (isSubmitted) {
    return <SupportSuccess onSubmitAnother={resetForm} />;
  }

  return (
    <div className="space-y-6">
      <SupportForm />
      <SupportHelpResources />
    </div>
  );
};

export default SupportSection;
