import fs from 'node:fs';
import path from 'node:path';
import type { ArticleFrontmatter } from '../types/content';

export interface IntegrityCheckResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates local image references and frontmatter completeness.
 * Strictly verifies that local image assets exist on disk.
 */
export function validateArticleIntegrity(
  frontmatter: ArticleFrontmatter,
  rawContent: string,
  filePath: string
): IntegrityCheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const dir = path.dirname(filePath);

  // 1. Verify Cover image existence and format
  if (!frontmatter.cover || frontmatter.cover.trim() === '') {
    errors.push(`[${filePath}] Cover image path is missing.`);
  } else if (frontmatter.cover.startsWith('./') || frontmatter.cover.startsWith('../')) {
    const coverPath = path.resolve(dir, frontmatter.cover);
    if (!fs.existsSync(coverPath)) {
      errors.push(`[${filePath}] Broken local cover image: "${frontmatter.cover}" does not exist on disk.`);
    }
  }

  // 2. Scan for inline Markdown image references: ![alt](url)
  const inlineImageRegex = /!\[(.*?)\]\((.*?)\)/g;
  let match: RegExpExecArray | null;
  while ((match = inlineImageRegex.exec(rawContent)) !== null) {
    const alt = match[1];
    const src = match[2];
    if (!alt || alt.trim() === '') {
      warnings.push(`[${filePath}] Image "${src}" is missing descriptive alt text for accessibility.`);
    }
    if (!src || src.trim() === '') {
      errors.push(`[${filePath}] Image tag has an empty src attribute.`);
    } else if (src.startsWith('./') || src.startsWith('../')) {
      const assetPath = path.resolve(dir, src);
      if (!fs.existsSync(assetPath)) {
        errors.push(`[${filePath}] Broken local inline image: "${src}" does not exist on disk.`);
      }
    }
  }

  // 3. Scan for MDX <Figure src="..." alt="..." /> references
  const figureRegex = /<Figure[\s\S]*?src=["'](.*?)["'][\s\S]*?alt=["'](.*?)["']/g;
  while ((match = figureRegex.exec(rawContent)) !== null) {
    const src = match[1];
    const alt = match[2];
    if (!alt || alt.trim() === '') {
      warnings.push(`[${filePath}] <Figure> with src "${src}" has empty alt attribute.`);
    }
    if (src.startsWith('./') || src.startsWith('../')) {
      const assetPath = path.resolve(dir, src);
      if (!fs.existsSync(assetPath)) {
        errors.push(`[${filePath}] Broken local <Figure> image: "${src}" does not exist on disk.`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
