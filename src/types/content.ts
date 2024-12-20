export interface BilingualContent {
  ar: string;
  en: string;
}

export interface Course {
  title: BilingualContent;
  description: BilingualContent;
  keywords: BilingualContent[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  // ... other fields
}

export interface Unit {
  title: BilingualContent;
  content: BilingualContent;
  // ... other fields
}