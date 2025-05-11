
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimePickerInput } from "./TimePickerInput";
import { Mic, Calendar, Bell, Code, CreditCard, Check, X, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DashboardAgentSettings = () => {
  const pricingPlans = [
    {
      name: "Solo Closer",
      price: "$49",
      minutes: "250",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: false,
        smartRouting: false,
        apiAccess: false,
        prioritySupport: false,
        hybridMode: false
      },
      audience: "Best for solo sales reps testing Callyn",
      popular: false,
    },
    {
      name: "Appointment Setter",
      price: "$97",
      minutes: "500",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: true,
        apiAccess: false,
        prioritySupport: false,
        hybridMode: true
      },
      audience: "Best for growing sales teams",
      popular: true,
    },
    {
      name: "Pro Closer",
      price: "$197",
      minutes: "1,500",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: true,
        apiAccess: false,
        prioritySupport: true,
        hybridMode: true
      },
      audience: "Best for high-volume individual closers",
      popular: false,
    },
    {
      name: "Custom Plan",
      price: "custom",
      minutes: "custom",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: true,
        apiAccess: true,
        prioritySupport: true,
        hybridMode: true
      },
      audience: "Let's build a plan around your sales team's needs",
      popular: false,
      isCustomPlan: true,
    },
  ];

  // Feature labels and tooltips configuration
  const featureLabels = {
    inboundCalls: "AI Voice Calls & SMS Follow-Ups",
    customScriptSupport: "Custom Script Support",
    textTranscripts: "Call Transcripts",
    calendarIntegration: "Calendar Integration",
    smartRouting: "Smart Call Routing",
    apiAccess: "API Access",
    prioritySupport: "Priority Support",
    hybridMode: "Hybrid Mode (Jump In Live)"
  };

  const tooltips = {
    hybridMode: "Jump in live during an AI call",
    smartRouting: "Send calls to right rep based on lead status",
    apiAccess: "Sync leads, outcomes, and updates to your CRM"
  };
  
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
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pricingPlans.map((plan, index) => (
                      <div
                        key={index}
                        className={`flex flex-col ${plan.popular ? "border-l-4 border-callyn-blue pl-2" : ""}`}
                      >
                        {plan.isCustomPlan ? (
                          // Custom Plan Card
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                              {plan.popular && (
                                <span className="text-xs font-medium bg-callyn-blue text-white px-2 py-1 rounded-full">
                                  Most Popular
                                </span>
                              )}
                            </div>
                          
                            <div className="mb-8">
                              <p className="text-lg font-medium text-white">{plan.audience}</p>
                            </div>
                          
                            <div className="mt-auto">
                              <Button className="w-full bg-callyn-blue hover:bg-blue-700 text-white">
                                Contact Sales
                              </Button>
                            </div>
                          </>
                        ) : (
                          // Regular Plan Cards
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                              {plan.popular && (
                                <span className="text-xs font-medium bg-callyn-blue text-white px-2 py-1 rounded-full">
                                  Most Popular
                                </span>
                              )}
                            </div>
                          
                            <div className="mb-4">
                              <span className="text-3xl font-bold text-white">{plan.price}</span>
                              <span className="text-gray-400">/mo</span>
                            </div>
                          
                            <div className="mb-4">
                              <span className="text-xl font-semibold text-white">{plan.minutes} mins</span>
                              <p className="text-gray-400 text-sm">Included</p>
                            </div>
                          
                            <div className="space-y-3 mb-6">
                              <TooltipProvider>
                                {Object.entries(plan.features).map(([key, value]) => (
                                  <div key={key} className="flex items-center gap-2">
                                    {value ? (
                                      <Check className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <X className="w-5 h-5 text-red-500" />
                                    )}
                                    
                                    {/* Add tooltip for specific features */}
                                    {tooltips[key as keyof typeof tooltips] ? (
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="flex items-center gap-1 cursor-help">
                                            <span className="text-gray-300 text-sm">
                                              {featureLabels[key as keyof typeof featureLabels]}
                                            </span>
                                            <HelpCircle className="w-3 h-3 text-gray-400" />
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{tooltips[key as keyof typeof tooltips]}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    ) : (
                                      <span className="text-gray-300 text-sm">
                                        {featureLabels[key as keyof typeof featureLabels]}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </TooltipProvider>
                            </div>
                          
                            <div className="mt-auto">
                              <p className="text-sm text-gray-400">{plan.audience}</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Upgrade/Cancel Anytime text */}
                  <div className="text-center mt-6 text-gray-400">
                    <p>Upgrade or cancel anytime. No contracts.</p>
                  </div>
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
