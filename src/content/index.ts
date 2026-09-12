/**
 * Content Collections Access Layer
 * Single Source of Truth: Astro Content Collections
 *
 * This module replaces the legacy filesystem-scanning repository with
 * pure functions operating on Astro's native `getCollection('blog')`.
 */

export * from '../lib/content';
