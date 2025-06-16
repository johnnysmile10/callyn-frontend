
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, Search, Filter, Download, Users, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for lead lists
const mockLeadLists = [
  {
    id: 1,
    name: "Dentists - Bergen County",
    count: 238,
    status: "active",
    lastUsed: "2 hours ago",
    tags: ["Healthcare", "New Jersey"],
    uploadDate: "2024-01-15"
  },
  {
    id: 2,
    name: "B2B Software Leads",
    count: 156,
    status: "processing",
    lastUsed: "Yesterday",
    tags: ["B2B", "Software"],
    uploadDate: "2024-01-14"
  },
  {
    id: 3,
    name: "Real Estate Investors",
    count: 89,
    status: "active",
    lastUsed: "3 days ago",
    tags: ["Real Estate", "Investment"],
    uploadDate: "2024-01-12"
  }
];

const LeadListsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

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

  const handleFileUpload = (file: File) => {
    const randomCount = Math.floor(Math.random() * 400) + 100;
    toast({
      title: "File uploaded successfully",
      description: `${randomCount} leads detected in ${file.name}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredLists = mockLeadLists.filter(list =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    list.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lead Lists</h2>
          <p className="text-gray-600">Manage your lead databases and upload new lists</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New List
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Lists Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Lead Lists
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search lists..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>List Name</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLists.map((list) => (
                    <TableRow key={list.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{list.name}</div>
                          <div className="flex gap-1 mt-1">
                            {list.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{list.count.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(list.status)}
                          <span className="capitalize">{list.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{list.lastUsed}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Use</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Upload New List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload New List
              </CardTitle>
              <CardDescription>
                Add leads from CSV files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                  isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleFileDragOver}
                onDragLeave={handleFileDragLeave}
                onDrop={handleFileDrop}
              >
                <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                <p className="text-sm font-medium mb-1">Drop CSV file here</p>
                <p className="text-xs text-gray-500 mb-3">or click to browse</p>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">CSV Requirements</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Include: Name, Phone, Email</li>
                  <li>• First row should be headers</li>
                  <li>• Max 10,000 leads per file</li>
                  <li>• Supported format: .csv</li>
                </ul>
              </div>

              <Button className="w-full" disabled>
                Process Upload
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Lists</span>
                <span className="font-semibold">{mockLeadLists.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Leads</span>
                <span className="font-semibold">
                  {mockLeadLists.reduce((sum, list) => sum + list.count, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Lists</span>
                <span className="font-semibold">
                  {mockLeadLists.filter(list => list.status === 'active').length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadListsTab;
