
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Phone, 
  Clock, 
  CheckCircle, 
  XCircle,
  MoreVertical
} from "lucide-react";

interface QueuedCall {
  id: string;
  leadName: string;
  phoneNumber: string;
  scheduledTime: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'calling' | 'completed' | 'failed';
  attempts: number;
}

interface CallQueue {
  pending: QueuedCall[];
  inProgress: QueuedCall[];
  completed: QueuedCall[];
  failed: QueuedCall[];
}

interface CallQueueViewProps {
  queue: CallQueue;
}

const CallQueueView = ({ queue }: CallQueueViewProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'calling': return <Phone className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const QueueSection = ({ title, calls, icon }: { title: string; calls: QueuedCall[]; icon: React.ReactNode }) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
          <Badge variant="outline">{calls.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {calls.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No calls in this category</p>
        ) : (
          <div className="space-y-3">
            {calls.slice(0, 5).map((call) => (
              <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(call.status)}
                  <div>
                    <div className="font-medium">{call.leadName}</div>
                    <div className="text-sm text-gray-600">{call.phoneNumber}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(call.priority)} variant="outline">
                    {call.priority}
                  </Badge>
                  <div className="text-sm text-gray-500">{call.scheduledTime}</div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {calls.length > 5 && (
              <div className="text-center">
                <Button variant="outline" size="sm">
                  View all {calls.length} calls
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Queue Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{queue.pending.length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{queue.inProgress.length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{queue.completed.length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{queue.failed.length}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QueueSection 
          title="Pending Calls" 
          calls={queue.pending} 
          icon={<Clock className="h-5 w-5 text-blue-500" />}
        />
        <QueueSection 
          title="In Progress" 
          calls={queue.inProgress} 
          icon={<Phone className="h-5 w-5 text-orange-500" />}
        />
        <QueueSection 
          title="Completed" 
          calls={queue.completed} 
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        />
        <QueueSection 
          title="Failed Calls" 
          calls={queue.failed} 
          icon={<XCircle className="h-5 w-5 text-red-500" />}
        />
      </div>
    </div>
  );
};

export default CallQueueView;
