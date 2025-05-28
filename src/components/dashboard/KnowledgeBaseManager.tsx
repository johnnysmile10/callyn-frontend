
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { finetunerApi } from "@/services/finetunerApi";
import { 
  Database, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface KnowledgeEntry {
  id: string;
  content: string;
  type: 'script' | 'objection' | 'faq' | 'context';
  lastUpdated: string;
  agentId?: string;
}

interface KnowledgeBaseManagerProps {
  agentId?: string;
  onKnowledgeUpdated?: () => void;
}

const KnowledgeBaseManager = ({ agentId, onKnowledgeUpdated }: KnowledgeBaseManagerProps) => {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadKnowledgeBase();
  }, [agentId]);

  const loadKnowledgeBase = async () => {
    if (!agentId) return;
    
    setIsLoading(true);
    try {
      // In a real implementation, this would fetch from Fine-tuner.ai
      // For now, we'll use local storage as a mock
      const stored = localStorage.getItem(`knowledge_base_${agentId}`);
      if (stored) {
        setEntries(JSON.parse(stored));
      }
      setLastSync(new Date());
    } catch (error) {
      toast({
        title: "Load Failed",
        description: "Failed to load knowledge base entries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveToLocal = (updatedEntries: KnowledgeEntry[]) => {
    if (agentId) {
      localStorage.setItem(`knowledge_base_${agentId}`, JSON.stringify(updatedEntries));
    }
  };

  const addEntry = async () => {
    if (!newEntryContent.trim()) return;

    const newEntry: KnowledgeEntry = {
      id: Date.now().toString(),
      content: newEntryContent,
      type: 'script',
      lastUpdated: new Date().toISOString(),
      agentId,
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveToLocal(updatedEntries);
    setNewEntryContent("");

    // Sync with Fine-tuner.ai
    if (agentId) {
      try {
        await finetunerApi.updateKnowledgeBase(agentId, newEntryContent);
        toast({
          title: "Entry Added",
          description: "Knowledge base entry added and synced with Fine-tuner.ai",
        });
      } catch (error) {
        toast({
          title: "Sync Warning",
          description: "Entry saved locally but failed to sync with Fine-tuner.ai",
          variant: "destructive",
        });
      }
    }

    onKnowledgeUpdated?.();
  };

  const updateEntry = async (id: string) => {
    const updatedEntries = entries.map(entry =>
      entry.id === id
        ? { ...entry, content: editContent, lastUpdated: new Date().toISOString() }
        : entry
    );
    
    setEntries(updatedEntries);
    saveToLocal(updatedEntries);
    setEditingId(null);
    setEditContent("");

    // Sync with Fine-tuner.ai
    if (agentId) {
      try {
        await finetunerApi.updateKnowledgeBase(agentId, editContent);
        toast({
          title: "Entry Updated",
          description: "Knowledge base entry updated and synced",
        });
      } catch (error) {
        toast({
          title: "Sync Warning",
          description: "Entry updated locally but failed to sync",
          variant: "destructive",
        });
      }
    }

    onKnowledgeUpdated?.();
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    saveToLocal(updatedEntries);
    
    toast({
      title: "Entry Deleted",
      description: "Knowledge base entry has been removed",
    });
    
    onKnowledgeUpdated?.();
  };

  const startEditing = (entry: KnowledgeEntry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditContent("");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'script': return 'bg-blue-100 text-blue-800';
      case 'objection': return 'bg-red-100 text-red-800';
      case 'faq': return 'bg-green-100 text-green-800';
      case 'context': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Knowledge Base Manager
        </CardTitle>
        <CardDescription>
          Manage your agent's knowledge base and sync with Fine-tuner.ai
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Bar */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <div className="flex items-center gap-2">
            {agentId ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-orange-600" />
            )}
            <span className="text-sm">
              {agentId ? `Connected to Agent ${agentId.slice(0, 8)}...` : "No agent selected"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {lastSync && (
              <span className="text-xs text-muted-foreground">
                Last sync: {lastSync.toLocaleTimeString()}
              </span>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={loadKnowledgeBase}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Add New Entry */}
        <div className="space-y-3">
          <h4 className="font-medium">Add New Knowledge Entry</h4>
          <Textarea
            value={newEntryContent}
            onChange={(e) => setNewEntryContent(e.target.value)}
            placeholder="Enter knowledge base content (scripts, objections, FAQs, context...)"
            className="min-h-20"
          />
          <Button 
            onClick={addEntry}
            disabled={!newEntryContent.trim() || !agentId}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add to Knowledge Base
          </Button>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          <h4 className="font-medium">Current Entries ({entries.length})</h4>
          
          {entries.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No knowledge base entries yet. Add your first entry above.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {entries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(entry.type)}>
                        {entry.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Updated: {new Date(entry.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {editingId === entry.id ? (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateEntry(entry.id)}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={cancelEditing}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => startEditing(entry)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {editingId === entry.id ? (
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-20"
                    />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBaseManager;
