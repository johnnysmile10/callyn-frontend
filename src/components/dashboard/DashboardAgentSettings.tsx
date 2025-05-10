
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimePickerInput } from "./TimePickerInput";
import { Mic, Calendar, Bell, Code, CreditCard } from "lucide-react";

const DashboardAgentSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agent Settings</h2>
        <p className="text-muted-foreground">
          Customize how your Callyn AI sales assistant works
        </p>
      </div>
      
      <Tabs defaultValue="voice" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            <span>Voice</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="voice">
          <Card>
            <CardHeader>
              <CardTitle>Voice Customization</CardTitle>
              <CardDescription>
                Customize how your Callyn AI assistant sounds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Voice Selection</Label>
                  <Select defaultValue="female-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female-1">Sarah (Female)</SelectItem>
                      <SelectItem value="female-2">Jessica (Female)</SelectItem>
                      <SelectItem value="male-1">Michael (Male)</SelectItem>
                      <SelectItem value="male-2">David (Male)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Speaking Speed</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" size="sm">Slow</Button>
                    <Button variant="secondary" size="sm">Normal</Button>
                    <Button variant="outline" size="sm">Fast</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-sample">Preview Voice</Label>
                  <Button variant="outline" size="sm" className="gap-1">
                    <span>Listen</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                Set when Callyn should make calls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Days of Operation</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="monday">Monday</Label>
                      <Switch id="monday" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tuesday">Tuesday</Label>
                      <Switch id="tuesday" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="wednesday">Wednesday</Label>
                      <Switch id="wednesday" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="thursday">Thursday</Label>
                      <Switch id="thursday" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="friday">Friday</Label>
                      <Switch id="friday" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="saturday">Saturday</Label>
                      <Switch id="saturday" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sunday">Sunday</Label>
                      <Switch id="sunday" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Hours of Operation</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <TimePickerInput defaultValue="09:00" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <TimePickerInput defaultValue="17:00" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="america-new_york">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                          <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Calendar Integration</Label>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-medium mb-2">Connect Calendar</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your calendar to automatically block times when you're unavailable
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Google Calendar</Button>
                    <Button variant="outline">Microsoft</Button>
                    <Button variant="outline">Apple</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage when and how you receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-lead">New lead generated</Label>
                    <Switch id="new-lead" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="call-booked">Call booked</Label>
                    <Switch id="call-booked" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="daily-summary">Daily summary</Label>
                    <Switch id="daily-summary" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-report">Weekly report</Label>
                    <Switch id="weekly-report" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Get text alerts for high priority events
                    </p>
                  </div>
                  <Switch id="sms-active" />
                </div>
                
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Webhook/API Integration</h3>
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input type="url" placeholder="https://your-webhook.com/callback" className="flex-1" />
                    <Button variant="outline">Test</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    For advanced users: receive real-time call data via webhook
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Plan & Subscription</CardTitle>
              <CardDescription>
                Manage your Callyn AI subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Current Plan</h3>
                  <span className="text-sm bg-callyn-blue/20 text-callyn-blue px-2 py-1 rounded-full">
                    Free Trial
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You're currently using the free trial with 45 minutes included
                </p>
                <div className="mt-4 flex gap-2">
                  <Button className="bg-callyn-blue hover:bg-callyn-darkBlue">
                    Upgrade Plan
                  </Button>
                  <Button variant="outline">
                    Buy More Minutes
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Available Plans</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Starter</CardTitle>
                      <CardDescription>
                        For small businesses getting started
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-2xl font-bold mb-2">$49/mo</p>
                      <ul className="text-sm space-y-1">
                        <li>200 minutes per month</li>
                        <li>Basic reporting</li>
                        <li>Email notifications</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-callyn-blue">
                    <CardHeader className="pb-3 bg-callyn-blue/10 rounded-t-lg">
                      <CardTitle className="text-lg">Professional</CardTitle>
                      <CardDescription>
                        For growing sales teams
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-2xl font-bold mb-2">$99/mo</p>
                      <ul className="text-sm space-y-1">
                        <li>500 minutes per month</li>
                        <li>Advanced reporting</li>
                        <li>Email + SMS notifications</li>
                        <li>Calendar integration</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Enterprise</CardTitle>
                      <CardDescription>
                        For large sales organizations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-2xl font-bold mb-2">$199/mo</p>
                      <ul className="text-sm space-y-1">
                        <li>1200 minutes per month</li>
                        <li>Full analytics suite</li>
                        <li>All notification options</li>
                        <li>API access</li>
                        <li>Dedicated support</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAgentSettings;
