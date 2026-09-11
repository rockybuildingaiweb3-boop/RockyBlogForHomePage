import { ArticleFrontmatter } from '../types/content';

export interface IntegrityCheckResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates local image references and frontmatter completeness.
 * Can be run during build or static verification.
 */
export function validateArticleIntegrity(
  frontmatter: ArticleFrontmatter,
  rawContent: string,
  filePath: string
): IntegrityCheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Verify Cover image existence and format
  if (!frontmatter.cover || frontmatter.cover.trim() === '') {
    errors.push(`[${filePath}] Cover image path is missing.`);
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
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
