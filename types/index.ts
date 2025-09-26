// Type definitions for the application

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  createdAt?: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  tags: string[];
  slug: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  results: string[];
  client: string;
  industry: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

export interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}

export interface NewsletterSubscribe {
  email: string
  subscribeAt?: Date
  source?:string
}