
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Edit, Check, Zap } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const DashboardSalesTools = () => {
  const [selectedTone, setSelectedTone] = useState("confident");
  const [script, setScript] = useState("");
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sales Tools</h2>
        <p className="text-muted-foreground">
          Customize how Callyn talks to your leads and prospects
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Script Editor</CardTitle>
              <CardDescription>
                Customize how Callyn will talk to your prospects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="custom" className="w-full">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="custom">Custom Script</TabsTrigger>
                  <TabsTrigger value="ai">AI Generated</TabsTrigger>
                </TabsList>
                <TabsContent value="custom" className="space-y-4">
                  <Textarea 
                    className="min-h-[200px] font-mono"
                    placeholder="Paste your sales script here..."
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button>Save Script</Button>
                  </div>
                </TabsContent>
                <TabsContent value="ai" className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-medium mb-2">Let AI generate a script for you</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our AI can generate a personalized sales script based on your business information and target audience.
                    </p>
                    <Button className="gap-2">
                      <Zap className="h-4 w-4" />
                      Generate AI Script
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-4">
                <h3 className="font-medium">Conversation Tone</h3>
                <RadioGroup 
                  value={selectedTone} 
                  onValueChange={setSelectedTone}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="confident" id="confident" />
                    <Label htmlFor="confident">Confident - Assertive and authoritative</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friendly" id="friendly" />
                    <Label htmlFor="friendly">Friendly - Warm and approachable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="direct" id="direct" />
                    <Label htmlFor="direct">Direct - Straightforward and to the point</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Lead List</CardTitle>
              <CardDescription>
                Upload your leads for Callyn to call
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-sm font-medium mb-1">Upload CSV File</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Drag and drop a CSV file with your leads
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Browse Files
                </Button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">CSV Format Requirements</h4>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>Include columns: Name, Phone, Email</li>
                  <li>One lead per row</li>
                  <li>First row should be column headers</li>
                  <li>Max 1,000 leads per file</li>
                </ul>
              </div>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">Previous Uploads</p>
                    <p className="text-xs text-muted-foreground">
                      No files uploaded yet
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Call Summary</CardTitle>
          <CardDescription>
            View and filter your call results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="pt-4">
              <div className="text-center py-8">
                <p className="font-medium">No calls made today</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start your call campaign to see results here
                </p>
                <Button className="mt-4" variant="outline">Start Campaign</Button>
              </div>
            </TabsContent>
            <TabsContent value="week" className="pt-4">
              <div className="text-center py-8">
                <p className="font-medium">No calls made this week</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start your call campaign to see results here
                </p>
                <Button className="mt-4" variant="outline">Start Campaign</Button>
              </div>
            </TabsContent>
            <TabsContent value="all" className="pt-4">
              <div className="text-center py-8">
                <p className="font-medium">No call history</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start your call campaign to see results here
                </p>
                <Button className="mt-4" variant="outline">Start Campaign</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSalesTools;
