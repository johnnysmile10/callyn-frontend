
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Users, Plus, Trash2 } from "lucide-react";
import { LeadRecord } from "../types";
import { useToast } from "@/hooks/use-toast";

interface Step2LeadListProps {
  data: LeadRecord[];
  onUpdate: (data: LeadRecord[]) => void;
}

const Step2LeadList = ({ data, onUpdate }: Step2LeadListProps) => {
  const { toast } = useToast();
  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    phone: "",
    email: ""
  });

  const addManualLead = () => {
    if (!newLead.name || !newLead.phone) {
      toast({
        title: "Missing Information",
        description: "Name and phone number are required",
        variant: "destructive"
      });
      return;
    }

    const lead: LeadRecord = {
      id: `lead_${Date.now()}`,
      name: newLead.name,
      company: newLead.company || undefined,
      phone: newLead.phone,
      email: newLead.email || undefined,
      status: 'new',
      source: 'manual',
      tags: [],
      createdAt: new Date().toISOString()
    };

    onUpdate([...data, lead]);
    setNewLead({ name: "", company: "", phone: "", email: "" });
    
    toast({
      title: "Lead Added",
      description: "Lead has been added to your list"
    });
  };

  const removeLead = (id: string) => {
    onUpdate(data.filter(lead => lead.id !== id));
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const newLeads: LeadRecord[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length < 2) continue;
        
        const nameIndex = headers.findIndex(h => h.includes('name'));
        const phoneIndex = headers.findIndex(h => h.includes('phone'));
        const emailIndex = headers.findIndex(h => h.includes('email'));
        const companyIndex = headers.findIndex(h => h.includes('company'));
        
        if (nameIndex >= 0 && phoneIndex >= 0 && values[nameIndex] && values[phoneIndex]) {
          newLeads.push({
            id: `lead_${Date.now()}_${i}`,
            name: values[nameIndex],
            phone: values[phoneIndex],
            email: emailIndex >= 0 ? values[emailIndex] : undefined,
            company: companyIndex >= 0 ? values[companyIndex] : undefined,
            status: 'new',
            source: 'csv',
            tags: [],
            createdAt: new Date().toISOString()
          });
        }
      }
      
      onUpdate([...data, ...newLeads]);
      toast({
        title: "CSV Imported",
        description: `${newLeads.length} leads imported successfully`
      });
    };
    
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const csvContent = "name,phone,email,company\nJohn Doe,+1234567890,john@example.com,Example Corp";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lead_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Build Your Lead List
        </CardTitle>
        <CardDescription>
          Import or manually add prospects for your outreach campaign
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="import" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">Import Leads</TabsTrigger>
            <TabsTrigger value="manual">Add Manually</TabsTrigger>
          </TabsList>
          
          <TabsContent value="import" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
              <p className="text-gray-600 mb-4">
                Upload a CSV file with your lead information
              </p>
              <div className="space-y-3">
                <Button onClick={downloadTemplate} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                <div>
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <Button asChild>
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </label>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  placeholder="email@company.com"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newLead.company}
                  onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
            </div>
            <Button onClick={addManualLead} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </TabsContent>
        </Tabs>

        {/* Lead List Display */}
        {data.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Your Leads ({data.length})</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {data.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-gray-600">
                      {lead.phone} {lead.email && `• ${lead.email}`} {lead.company && `• ${lead.company}`}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLead(lead.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Step2LeadList;
