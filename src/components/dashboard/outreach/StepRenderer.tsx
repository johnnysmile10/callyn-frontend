
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType<any> | null;
}

interface StepRendererProps {
  step: Step;
  data: any;
  onUpdate: (data: any) => void;
}

const StepRenderer = ({ step, data, onUpdate }: StepRendererProps) => {
  const Component = step.component;
  
  if (!Component) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <step.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-600 mb-6">{step.description}</p>
          <p className="text-sm text-gray-500">This step will be implemented in the next update.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Component 
      data={data}
      onUpdate={onUpdate}
    />
  );
};

export default StepRenderer;
