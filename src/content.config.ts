import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { VALID_CATEGORIES } from './config/site.config';
import { tagsConfig } from './config/tags';

/**
 * Validates whether a date string is an authentic calendar date in YYYY-MM-DD format.
 * Prevents invalid dates such as 2026-99-99 or 2026-02-31.
 */
function isValidCalendarDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

/**
 * Validates whether a URL string is a valid absolute HTTP or HTTPS URL.
 */
function isValidAbsoluteUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Strict slug regex: lowercase alphanumeric words separated by single hyphens.
 * Disallows uppercase, spaces, slashes, query strings, consecutive hyphens, or leading/trailing hyphens.
 */
const STRICT_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1, 'title must not be empty'),
        description: z.string().min(1, 'description must not be empty'),
        pubDate: z
          .string()
          .refine(isValidCalendarDate, {
            message: 'pubDate must be a valid calendar date in YYYY-MM-DD format',
          }),
        updatedDate: z
          .string()
          .refine(isValidCalendarDate, {
            message: 'updatedDate must be a valid calendar date in YYYY-MM-DD format',
          })
          .optional(),
        slug: z
          .string()
          .regex(
            STRICT_SLUG_REGEX,
            'slug must be lowercase ASCII alphanumeric words separated by single hyphens (e.g., "react-performance", "building-ai-agents")'
          ),
        translationId: z
          .string()
          .min(1, 'translationId must not be empty')
          .regex(
            STRICT_SLUG_REGEX,
            'translationId must be lowercase ASCII alphanumeric words separated by single hyphens'
          ),
        lang: z.enum(['zh-CN', 'en', 'fr', 'de', 'ja']),
        category: z.enum(VALID_CATEGORIES, {
          message: `category must be one of: ${VALID_CATEGORIES.join(', ')}`,
        }),
        tags: z
          .array(
            z.string().refine((t: string) => t in tagsConfig, {
              message: 'Tag is not registered in src/config/tags.ts',
            })
          )
          .min(1, 'Article must have at least one registered tag'),
        cover: image(),
        coverAlt: z.string().min(1, 'coverAlt must not be empty if provided').optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        author: z.string().optional(),
        canonicalUrl: z
          .string()
          .refine((val) => !val || isValidAbsoluteUrl(val.trim()), {
            message: 'canonicalUrl must be a valid absolute HTTP or HTTPS URL if specified',
          })
          .optional(),
        links: z
          .array(
            z.object({
              platform: z.string().min(1, 'External link platform must not be empty'),
              url: z
                .string()
                .refine(isValidAbsoluteUrl, {
                  message: 'External link URL must be a valid absolute HTTP or HTTPS URL',
                }),
              type: z.enum(['announcement', 'full-post', 'adapted']),
            })
          )
          .optional(),
        coverCredit: z
          .object({
            author: z.string().optional(),
            source: z.string().optional(),
            url: z
              .string()
              .refine((u) => !u || isValidAbsoluteUrl(u.trim()), {
                message: 'coverCredit.url must be a valid HTTP or HTTPS URL if specified',
              })
              .optional(),
          })
          .optional(),
      })
      .superRefine((data, ctx) => {
        if (data.updatedDate && data.pubDate && data.updatedDate < data.pubDate) {
          ctx.addIssue({
            code: 'custom',
            message: `updatedDate ("${data.updatedDate}") cannot precede pubDate ("${data.pubDate}")`,
            path: ['updatedDate'],
          });
        }
      }),
});

export const collections = { blog };
