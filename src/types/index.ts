export type DemoAction = 'convert' | 'fix' | 'refactor' | 'explain';

export interface CodeSnippet {
  id: string;
  title: string;
  action: DemoAction;
  sourceLang: string;
  targetLang?: string;
  inputCode: string;
  outputCode: string;
  explanation: string;
  metrics: {
    latency: string;
    engine: 'Groq (Llama 3.3)' | 'Google Gemini 2.5';
    tokens: number;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'availability' | 'security' | 'features' | 'architecture';
}

export interface ReleaseNote {
  version: string;
  date: string;
  highlights: string[];
}
