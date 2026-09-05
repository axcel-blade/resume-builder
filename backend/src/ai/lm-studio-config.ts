/**
 * LM Studio Configuration for VitaForge Resume AI Features
 * 
 * This module configures the connection to LM Studio for generating
 * resume summaries and cover letters using AI models.
 */

export interface LmStudioConfig {
  /** URL of the LM Studio API server (default: http://localhost:1234) */
  apiUrl: string;
  
  /** The endpoint path for completions (usually /v1/chat/completions) */
  chatEndpoint: string;
  
  /** Default model to use for completions */
  modelName: string;
  
  /** Maximum tokens per response */
  maxTokens: number;
  
  /** Temperature for sampling (0.0-2.0, higher = more creative) */
  temperature: number;
}

export const LmStudio_DEFAULT_CONFIG: LmStudioConfig = {
  apiUrl: 'http://localhost:1234/v1',
  chatEndpoint: '/chat/completions',
  modelName: 'local-model', // Replace with your actual model name
  maxTokens: 500,
  temperature: 0.7,
};

/**
 * Configuration object for LM Studio integration
 */
export class LmStudioConfigService {
  private config: LmStudioConfig;

  constructor(config?: Partial<LmStudioConfig>) {
    this.config = {
      ...LmStudio_DEFAULT_CONFIG,
      ...config
    };
  }

  /**
   * Gets the full API URL with endpoint
   */
  getFullApiUrl(): string {
    return `${this.config.apiUrl}${this.config.chatEndpoint}`;
  }

  /**
   * Gets the model name
   */
  getModelName(): string {
    return this.config.modelName;
  }

  /**
   * Returns a copy of the current configuration
   */
  getFullConfig(): LmStudioConfig {
    return { ...this.config };
  }

  /**
   * Creates a new instance with custom configuration
   */
  static create(config: Partial<LmStudioConfig>): LmStudioConfigService {
    return new LmStudioConfigService(config);
  }

  /**
   * Validates the connection configuration
   */
  validate(): boolean {
    return Boolean(this.config.apiUrl && this.config.modelName);
  }
}