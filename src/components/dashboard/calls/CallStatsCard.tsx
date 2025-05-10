
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CallStatsCardProps = {
  title: string;
  value: string | number;
};

const CallStatsCard = ({ title, value }: CallStatsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default CallStatsCard;
