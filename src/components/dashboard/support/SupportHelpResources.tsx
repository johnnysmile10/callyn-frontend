
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SupportHelpResources = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="pt-6">
        <h3 className="font-semibold text-blue-800 mb-2">Need Immediate Help?</h3>
        <p className="text-blue-700 text-sm mb-3">
          Check out our documentation or community resources for quick answers:
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            Documentation
          </Button>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            FAQ
          </Button>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            Community Forum
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportHelpResources;
