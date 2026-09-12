import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      pubDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'pubDate must be YYYY-MM-DD'),
      updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'updatedDate must be YYYY-MM-DD').optional(),
      slug: z.string().min(1),
      translationId: z.string().min(1),
      lang: z.enum(['zh-CN', 'en', 'fr', 'de', 'ja']),
      category: z.string().min(1),
      tags: z.array(z.string()).min(1),
      cover: image(),
      coverAlt: z.string().min(1).optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      author: z.string().optional(),
      canonicalUrl: z.string().optional(),
      links: z
        .array(
          z.object({
            platform: z.string().min(1),
            url: z.string().regex(/^https?:\/\//, 'Must be a valid HTTP or HTTPS URL'),
            type: z.enum(['announcement', 'full-post', 'adapted']),
          })
        )
        .optional(),
      coverCredit: z
        .object({
          author: z.string().optional(),
          source: z.string().optional(),
          url: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { blog };
