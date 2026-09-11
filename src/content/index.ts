import fs from 'node:fs';
import path from 'node:path';
import { ContentRepository, type RawContentFile } from '../lib/contentEngine';

function scanContentDir(dir: string, fileList: RawContentFile[] = []): RawContentFile[] {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanContentDir(fullPath, fileList);
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      fileList.push({
        filePath: fullPath,
        rawText: fs.readFileSync(fullPath, 'utf-8'),
      });
    }
  }
  return fileList;
}

const blogDir = path.resolve(process.cwd(), 'content/blog');
const rawFiles = scanContentDir(blogDir);

export const contentRepo = new ContentRepository(rawFiles);

// Validate content integrity
export const contentValidationErrors = contentRepo.getValidationErrors();
if (contentValidationErrors.length > 0) {
  const errorMsg = 'Content integrity / validation failed:\n' + contentValidationErrors.join('\n');
  console.error(errorMsg);
  throw new Error(errorMsg);
}
