export interface MinistrySectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  imagePrompt: string;
  fallbackImage: string;
}

export interface ImageGenerationResponse {
  imageUrl: string | null;
  error?: string;
}