
export interface ObjectionResponse {
  objection: string;
  response: string;
}

export interface ScriptVersion {
  id: string;
  version: string;
  title: string;
  createdAt: string;
  content: {
    greeting: string;
    mainPrompt: string;
    objectionHandling: ObjectionResponse[];
    tone: string;
  };
}

export interface ScriptData {
  greeting: string;
  mainPrompt: string;
  objectionHandling: ObjectionResponse[];
  tone: string;
  systemPrompt: string;
}
