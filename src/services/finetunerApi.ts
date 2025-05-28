
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
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.apiKey) {
      throw new Error('API key not set. Please configure your Fine-tuner.ai API key.');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
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
}

export const finetunerApi = new FinetunerApiService();
