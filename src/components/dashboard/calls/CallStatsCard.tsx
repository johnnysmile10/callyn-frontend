
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CallStatsCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

const CallStatsCard = ({ title, value, icon }: CallStatsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default CallStatsCard;
