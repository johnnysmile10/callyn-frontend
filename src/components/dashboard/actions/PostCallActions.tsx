
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, Plus, Settings } from "lucide-react";
import { SMSAction, AppointmentAction } from "./types";

const PostCallActions = () => {
  const [smsActions, setSmsActions] = useState<SMSAction[]>([
    {
      id: "1",
      name: "Thank You SMS",
      enabled: true,
      trigger: "call_end",
      message: "Thank you for your time today! We'll follow up with the information discussed.",
      phoneField: "phone"
    },
    {
      id: "2", 
      name: "Qualified Lead SMS",
      enabled: false,
      trigger: "qualified_lead",
      message: "Thanks for your interest! Our team will contact you within 24 hours with next steps.",
      phoneField: "phone"
    }
  ]);

  const [appointmentActions, setAppointmentActions] = useState<AppointmentAction[]>([
    {
      id: "1",
      name: "Sales Demo Booking",
      enabled: true,
      trigger: "qualified_lead",
      calendarProvider: "calendly",
      calendarUrl: "https://calendly.com/demo",
      duration: 30,
      bufferTime: 15
    }
  ]);

  const toggleSMSAction = (id: string) => {
    setSmsActions(prev => prev.map(action => 
      action.id === id ? { ...action, enabled: !action.enabled } : action
    ));
  };

  const toggleAppointmentAction = (id: string) => {
    setAppointmentActions(prev => prev.map(action => 
      action.id === id ? { ...action, enabled: !action.enabled } : action
    ));
  };

  return (
    <div className="space-y-6">
      {/* SMS Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                SMS Actions
              </CardTitle>
              <CardDescription>
                Automatically send SMS messages after calls
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add SMS Action
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {smsActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{action.name}</h4>
                    <Badge variant={action.trigger === 'call_end' ? 'default' : 'secondary'}>
                      {action.trigger.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{action.message}</p>
                  <p className="text-xs text-gray-500">Field: {action.phoneField}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={action.enabled}
                    onCheckedChange={() => toggleSMSAction(action.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Booking Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Appointment Booking
              </CardTitle>
              <CardDescription>
                Automatically book appointments for qualified leads
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Booking Action
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointmentActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{action.name}</h4>
                    <Badge variant="secondary">{action.calendarProvider}</Badge>
                    <Badge variant={action.trigger === 'qualified_lead' ? 'default' : 'secondary'}>
                      {action.trigger.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Duration: {action.duration}min | Buffer: {action.bufferTime}min
                  </p>
                  {action.calendarUrl && (
                    <p className="text-xs text-gray-500">{action.calendarUrl}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={action.enabled}
                    onCheckedChange={() => toggleAppointmentAction(action.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCallActions;
