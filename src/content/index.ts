import { ContentRepository } from '../lib/contentEngine';
import { rawSampleArticles } from './sampleArticles';

export const contentRepo = new ContentRepository(rawSampleArticles);

// Export validation status to confirm zero errors during build
export const contentValidationErrors = contentRepo.getValidationErrors();
if (contentValidationErrors.length > 0) {
  console.warn('Content schema validation warnings/errors:', contentValidationErrors);
}
