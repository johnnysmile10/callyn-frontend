
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { 
  Upload, 
  Edit, 
  Check, 
  Zap, 
  FileText, 
  MessageSquare, 
  Phone, 
  BarChart, 
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle
} from "lucide-react";

// Script template data
const scriptTemplates = [
  {
    id: "cold-outreach",
    title: "Cold Outreach",
    description: "Make me a cold script for high-ticket offer",
    icon: Phone
  },
  {
    id: "reactivation",
    title: "Reactivation",
    description: "Write a reactivation script for old leads",
    icon: Clock
  },
  {
    id: "objection-handling",
    title: "Objection Handling",
    description: "Create an objection-handling script for price",
    icon: AlertCircle
  },
  {
    id: "follow-up",
    title: "Follow-Up",
    description: "Craft a follow-up script for interested prospects",
    icon: MessageSquare
  },
  {
    id: "industry-specific",
    title: "Industry-Specific",
    description: "Generate a script for industry-specific leads",
    icon: BarChart
  }
];

// Mock lead data for preview
const mockLeadPreview = [
  { name: "John Smith", phone: "(555) 123-4567", email: "john@example.com" },
  { name: "Sarah Johnson", phone: "(555) 234-5678", email: "sarah@example.com" },
  { name: "Michael Brown", phone: "(555) 345-6789", email: "michael@example.com" },
  { name: "Emily Davis", phone: "(555) 456-7890", email: "emily@example.com" },
  { name: "David Wilson", phone: "(555) 567-8901", email: "david@example.com" }
];

// Mock upload history
const mockUploadHistory = [
  { fileName: "Leads_04-11.csv", count: 238, timeAgo: "2 mins ago", tag: "Dentists - Bergen" },
  { fileName: "Contacts_Q1.csv", count: 156, timeAgo: "Yesterday", tag: "Cold B2B Norway" }
];

const DashboardSalesTools = () => {
  const [selectedTone, setSelectedTone] = useState("confident");
  const [script, setScript] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [toneValue, setToneValue] = useState([50]);
  const [goalValue, setGoalValue] = useState([30]);
  const [offerValue, setOfferValue] = useState([70]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [leadCount, setLeadCount] = useState(0);
  const [showScriptSuggestions, setShowScriptSuggestions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  
  const toneLabels = ["Confident", "Friendly", "Direct"];
  const goalLabels = ["Qualify", "Book", "Close"];
  const offerLabels = ["Free Trial", "Demo", "Discount"];
  
  const getToneLabel = () => {
    if (toneValue[0] < 33) return toneLabels[0];
    if (toneValue[0] < 66) return toneLabels[1];
    return toneLabels[2];
  };
  
  const getGoalLabel = () => {
    if (goalValue[0] < 33) return goalLabels[0];
    if (goalValue[0] < 66) return goalLabels[1];
    return goalLabels[2];
  };
  
  const getOfferLabel = () => {
    if (offerValue[0] < 33) return offerLabels[0];
    if (offerValue[0] < 66) return offerLabels[1];
    return offerLabels[2];
  };
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = scriptTemplates.find(t => t.id === templateId);
    if (template) {
      // In a real app, this would be sent to an AI service
      const mockGeneratedScript = `Hello [Customer Name],\n\nI'm calling from Callyn AI about our ${getOfferLabel().toLowerCase()} that helps businesses like yours ${getGoalLabel().toLowerCase()} more effectively.\n\nOur clients typically see a 30% increase in conversion rates within the first month.\n\nWould you be interested in learning more about how this could work for your business?`;
      setGeneratedScript(mockGeneratedScript);
    }
  };
  
  const handleGeneratePreview = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockGeneratedScript = `Hello [Customer Name],\n\nI'm calling from Callyn AI about our ${getOfferLabel().toLowerCase()} that helps businesses like yours ${getGoalLabel().toLowerCase()} more effectively.\n\nUsing a ${getToneLabel().toLowerCase()} approach, I'd like to share how our solution addresses your specific needs.\n\nOur clients typically see a 30% increase in conversion rates within the first month.\n\nWould you be interested in learning more about how this could work for your business?`;
      setGeneratedScript(mockGeneratedScript);
      setShowPreview(true);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleApplyScript = () => {
    setScript(generatedScript);
    setShowPreview(false);
    toast({
      title: "Script applied",
      description: "Your AI-generated script has been applied successfully."
    });
  };
  
  const handleSaveScript = () => {
    toast({
      title: "Script saved",
      description: "Your sales script has been saved successfully."
    });
    setShowScriptSuggestions(true);
  };
  
  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };
  
  const handleFileUpload = (file: File) => {
    // In a real app, this would process the CSV
    setUploadedFileName(file.name);
    setFileUploaded(true);
    // Mock generating a random count between 100-500
    const randomCount = Math.floor(Math.random() * 400) + 100;
    setLeadCount(randomCount);
    
    toast({
      title: "File uploaded successfully",
      description: `${randomCount} leads detected in ${file.name}`,
    });
  };
  
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
                    <Button onClick={handleSaveScript}>Save Script</Button>
                  </div>
                </TabsContent>
                <TabsContent value="ai" className="space-y-6">
                  {!showPreview ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {scriptTemplates.map(template => (
                          <div 
                            key={template.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary hover:bg-muted/50 ${selectedTemplate === template.id ? 'border-primary bg-muted/50' : ''}`}
                            onClick={() => handleTemplateSelect(template.id)}
                          >
                            <div className="flex items-center mb-2">
                              <template.icon className="h-5 w-5 mr-2 text-primary" />
                              <h3 className="font-medium">{template.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-6 mt-4 border rounded-lg p-6">
                        <h3 className="font-medium mb-4">Fine-tune your script</h3>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>Conversation Tone</Label>
                              <span className="text-sm font-medium">{getToneLabel()}</span>
                            </div>
                            <Slider 
                              value={toneValue}
                              onValueChange={setToneValue}
                              max={100}
                              step={1}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              {toneLabels.map((label, index) => (
                                <span key={index}>{label}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>Call Goal</Label>
                              <span className="text-sm font-medium">{getGoalLabel()}</span>
                            </div>
                            <Slider 
                              value={goalValue}
                              onValueChange={setGoalValue}
                              max={100}
                              step={1}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              {goalLabels.map((label, index) => (
                                <span key={index}>{label}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>Offer Type</Label>
                              <span className="text-sm font-medium">{getOfferLabel()}</span>
                            </div>
                            <Slider 
                              value={offerValue}
                              onValueChange={setOfferValue}
                              max={100}
                              step={1}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              {offerLabels.map((label, index) => (
                                <span key={index}>{label}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleGeneratePreview} 
                          className="w-full mt-4" 
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Generating...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Zap className="mr-2 h-4 w-4" />
                              Generate & Preview
                            </span>
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="border rounded-lg p-6 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Script Preview</h3>
                        <div className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                          AI Generated
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-md font-mono text-sm whitespace-pre-line">
                        {generatedScript}
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button variant="outline" onClick={() => setShowPreview(false)}>
                          Edit Settings
                        </Button>
                        <Button onClick={handleApplyScript}>
                          Apply Script
                        </Button>
                      </div>
                    </div>
                  )}
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
              
              {showScriptSuggestions && (
                <div className="animate-fade-in mt-6">
                  <Alert className="bg-blue-50 border-blue-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Zap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <AlertTitle className="text-blue-800">Ready to put this script to work?</AlertTitle>
                        <AlertDescription className="text-blue-700 mt-1">
                          <div className="space-y-3">
                            <p>Your script has been saved successfully. What would you like to do next?</p>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                                Test on 20 leads now
                              </Button>
                              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                                Create matching follow-up SMS
                              </Button>
                            </div>
                          </div>
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                </div>
              )}
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
              <div 
                className={`border-2 border-dashed rounded-md p-6 text-center transition-all ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'} ${fileUploaded ? 'bg-green-50 border-green-300' : ''}`}
                onDragOver={handleFileDragOver}
                onDragLeave={handleFileDragLeave}
                onDrop={handleFileDrop}
              >
                {fileUploaded ? (
                  <div>
                    <CheckCircle className="h-8 w-8 mx-auto mb-4 text-green-600" />
                    <h4 className="text-sm font-medium mb-1">File Uploaded Successfully</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {uploadedFileName} — {leadCount} leads detected
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setFileUploaded(false)}
                    >
                      Upload Different File
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium mb-1">Upload CSV File</h4>
                    <p className="text-xs text-muted-foreground mb-4">
                      Drag and drop a CSV file with your leads
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <span>Browse Files</span>
                      </Button>
                    </label>
                  </>
                )}
              </div>
              
              {fileUploaded && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-sm font-medium">Lead Preview</h4>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockLeadPreview.map((lead, index) => (
                          <TableRow key={index}>
                            <TableCell>{lead.name}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell className="text-xs truncate max-w-[120px]">{lead.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="text-xs text-right text-blue-600">
                    <button className="hover:underline">View all {leadCount} leads</button>
                  </div>
                </div>
              )}
              
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
                  {mockUploadHistory.length > 0 ? (
                    <div>
                      <p className="text-sm font-medium mb-3">Previous Uploads</p>
                      <div className="space-y-3">
                        {mockUploadHistory.map((upload, index) => (
                          <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                            <div>
                              <p className="text-sm font-medium">{upload.fileName}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">{upload.count} leads</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{upload.timeAgo}</span>
                              </div>
                            </div>
                            <div className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                              {upload.tag}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-medium">Previous Uploads</p>
                      <p className="text-xs text-muted-foreground">
                        No files uploaded yet
                      </p>
                    </div>
                  )}
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
              {fileUploaded ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Progress</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Calls Made</span>
                        <span className="font-medium">7 / {leadCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(7/leadCount) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Outcomes</h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Booked</span>
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Not Interested</span>
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Callbacks</span>
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">No Answer</span>
                        <span className="text-sm font-medium">1</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Performance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Conversion Rate</span>
                        <span className="text-sm font-medium">42.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Avg. Call Time</span>
                        <span className="text-sm font-medium">3:18</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      <span className="flex items-center">
                        View Detailed Results 
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                  
                  <div className="md:col-span-3">
                    <Alert className="bg-amber-50 border-amber-200">
                      <div className="flex">
                        <Zap className="h-5 w-5 text-amber-600 mr-2" />
                        <div>
                          <AlertTitle className="text-amber-800">Next Best Action</AlertTitle>
                          <AlertDescription className="text-amber-700">
                            Hot tip: Leads from "Cold B2B Norway" convert 2X better. Consider prioritizing those calls.
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="font-medium">No calls made today</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start your call campaign to see results here
                  </p>
                  <Button className="mt-4" variant="outline">Start Campaign</Button>
                </div>
              )}
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
