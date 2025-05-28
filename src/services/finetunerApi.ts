
export interface FinetunerAgent {
  id: string;
  name: string;
  description: string;
  voice_id?: string;
  language?: string;
  tone?: string;
  knowledge_base?: string[];
}

export interface FinetunerResponse {
  success: boolean;
  agent_id?: string;
  message: string;
  data?: any;
}

export interface FinetunerPromptRequest {
  prompt: string;
  agent_name: string;
  voice_settings?: {
    voice_id: string;
    tone: string;
    language: string;
  };
  knowledge_base_update?: boolean;
}

class FinetunerApiService {
  private baseUrl = 'https://api.finetuner.ai/v1';
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    // Store API key for future use
    localStorage.setItem('finetuner_api_key', key);
  }

  getApiKey(): string | null {
    if (this.apiKey) return this.apiKey;
    
    // Try to load from localStorage
    const savedKey = localStorage.getItem('finetuner_api_key');
    if (savedKey) {
      this.apiKey = savedKey;
      return savedKey;
    }
    
    return null;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API key not set. Please configure your Fine-tuner.ai API key.');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  }

  async createAgent(data: FinetunerPromptRequest): Promise<FinetunerResponse> {
    return this.makeRequest('/agents', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAgent(agentId: string, data: Partial<FinetunerPromptRequest>): Promise<FinetunerResponse> {
    return this.makeRequest(`/agents/${agentId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAgent(agentId: string): Promise<FinetunerAgent> {
    return this.makeRequest(`/agents/${agentId}`);
  }

  async listAgents(): Promise<FinetunerAgent[]> {
    const response = await this.makeRequest('/agents');
    return response.agents || [];
  }

  async generateScript(prompt: string, settings?: any): Promise<{ script: string }> {
    return this.makeRequest('/generate/script', {
      method: 'POST',
      body: JSON.stringify({ prompt, settings }),
    });
  }

  async updateKnowledgeBase(agentId: string, content: string): Promise<FinetunerResponse> {
    return this.makeRequest(`/agents/${agentId}/knowledge`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async deleteAgent(agentId: string): Promise<FinetunerResponse> {
    return this.makeRequest(`/agents/${agentId}`, {
      method: 'DELETE',
    });
  }

  // Utility method to create user-specific agent name
  generateAgentName(userEmail?: string): string {
    const email = userEmail || localStorage.getItem('user_email') || 'user';
    return `${email} - AI Agent`;
  }

  // Check if user has an existing agent
  async getUserAgent(): Promise<FinetunerAgent | null> {
    try {
      const agents = await this.listAgents();
      const userEmail = localStorage.getItem('user_email') || 'user';
      
      // Look for an agent with the user's email in the name
      const userAgent = agents.find(agent => 
        agent.name.includes(userEmail) || agent.name.includes('AI Agent')
      );
      
      return userAgent || null;
    } catch (error) {
      console.error('Error fetching user agent:', error);
      return null;
    }
  }
}

export const finetunerApi = new FinetunerApiService();
