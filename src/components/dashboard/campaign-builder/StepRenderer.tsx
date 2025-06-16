
interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
  component: React.ComponentType<any>;
}

interface StepRendererProps {
  step: Step;
  data: any;
  onUpdate: (data: any) => void;
}

const StepRenderer = ({ step, data, onUpdate }: StepRendererProps) => {
  const StepComponent = step.component;
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <step.icon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {step.title}
        </h2>
        <p className="text-xl text-gray-600">
          {step.description}
        </p>
      </div>

      <StepComponent
        data={data}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default StepRenderer;
