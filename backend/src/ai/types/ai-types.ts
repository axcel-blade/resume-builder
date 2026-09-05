/**
 * Type definitions for AI/LLM operations in VitaForge
 */

/**
 * Request payload for chat completion API calls
 */
export interface ChatCompletionRequest {
  /** Model name to use */
  model: string;
  
  /** Messages to send to the model */
  messages: ChatMessage[];
  
  /** Maximum number of tokens to generate */
  max_tokens?: number;
  
  /** Temperature parameter for sampling */
  temperature?: number;
}

/**
 * Individual message in a chat completion request/response
 */
export interface ChatMessage {
  /** Role of the message sender */
  role: 'system' | 'user' | 'assistant';
  
  /** Content of the message */
  content: string;
}

/**
 * Result from AI generation endpoint
 */
export interface ChatCompletionResponse {
  success?: boolean;
  choices?: Array<{ message: ChatMessage }>;
  usage?: {
    prompts_tokens?: number;
    prompt_tokens?: number;
    completion_tokens?: number;
  };
  error?: string;
}

export interface AiGenerationResult {
  success: boolean;
  content?: string;
  tokensUsed?: number;
  error?: string;
}

/**
 * Options for AI generation
 */
export interface AiGenerationOptions {
  /** Maximum tokens to generate */
  maxTokens?: number;
  
  /** Temperature for creative writing */
  temperature?: number;
  
  /** Top-p sampling parameter */
  topP?: number;
  
  /** System prompt override (optional) */
  systemPrompt?: string;
}

/**
 * Resume summary generation request
 */
export interface ResumeSummaryRequest {
  /** Profile data containing resume information */
  profileData: ResumeProfileData;
  
  /** Target job title or role */
  targetRole?: string;
  
  /** Years of experience (optional) */
  yearsOfExperience?: number;
}

/**
 * Cover letter generation request
 */
export interface CoverLetterRequest {
  /** Profile data containing resume information */
  profileData: ResumeProfileData;
  
  /** Job description or company details */
  jobDescription?: string;
  
  /** Company name */
  companyName?: string;
  
  /** Target position */
  targetPosition?: string;
}

/**
 * Resume profile data structure
 */
export interface ResumeProfileData {
  /** Full name */
  fullName: string;
  
  /** Professional summary or career objective (optional) */
  objective?: string;
  
  /** Years of experience */
  yearsOfExperience?: number;
  
  /** Key skills */
  skills: string[];
  
  /** Education background */
  education: Array<{
    degree: string;
    school: string;
    year: string | number;
  }>;
  
  /** Work experience */
  experience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate?: string;
    responsibilities: string[];
    achievements: string[];
  }>;
  
  /** Certifications */
  certifications?: string[];
  
  /** Projects */
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}