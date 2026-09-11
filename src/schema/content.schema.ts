import { z } from 'zod';

export const SupportedLocaleSchema = z.enum(['zh-CN', 'en', 'fr', 'de', 'ja']);

export const ExternalLinkSchema = z.object({
  platform: z.string().min(1, 'Platform name is required'),
  url: z.string().url('External link must be a valid URL'),
  type: z.enum(['announcement', 'full-post', 'adapted']),
});

export const ImageCreditSchema = z.object({
  author: z.string().optional(),
  source: z.string().optional(),
  url: z.string().url().optional(),
});

export const ArticleFrontmatterSchema = z.object({
  // Required fields
  title: z.string().min(1, 'Title cannot be empty'),
  description: z.string().min(1, 'Description cannot be empty'),
  pubDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'pubDate must be YYYY-MM-DD'),
  slug: z.string().min(1, 'Slug cannot be empty').regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase alphanumeric characters and hyphens'),
  translationId: z.string().min(1, 'translationId cannot be empty').regex(/^[a-z0-9-]+$/, 'translationId must only contain lowercase alphanumeric characters and hyphens'),
  lang: SupportedLocaleSchema,
  category: z.string().min(1, 'Category cannot be empty'),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag is required'),
  cover: z.string().min(1, 'Cover image path is required'),
  featured: z.boolean(),
  draft: z.boolean(),

  // Optional fields
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'updatedDate must be YYYY-MM-DD').optional(),
  author: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  links: z.array(ExternalLinkSchema).optional(),
  coverCredit: ImageCreditSchema.optional(),
});

export type ValidatedFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;
