/**
 * Profile & site config validator.
 *
 * Validates all JSON files in public/data/ against the TypeScript types
 * used by the React components. Run with: npx tsx scripts/validate-profiles.ts
 *
 * This ensures that JSON data files match what the UI expects before deployment.
 * Imported types come from the same source the components use — one source of truth.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { TemplateName } from '../src/types/profile';
import type { SectionType } from '../src/types/sections';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VALID_TEMPLATES: TemplateName[] = ['academic', 'business', 'creative', 'minimal'];
const VALID_SECTION_TYPES: SectionType[] = [
  'about', 'papers', 'talks', 'posters', 'awards', 'timeline',
  'education', 'skills', 'certifications', 'projects', 'gallery', 'custom',
];
const VALID_FEED_TYPES = [
  'career', 'publication', 'education', 'award', 'location', 'milestone', 'general',
];

interface ValidationError {
  file: string;
  errors: string[];
}

function validateProfile(filepath: string): string[] {
  const errors: string[] = [];
  const raw = fs.readFileSync(filepath, 'utf-8');
  let data: Record<string, unknown>;

  try {
    data = JSON.parse(raw);
  } catch {
    return [`Invalid JSON: could not parse file`];
  }

  // Required top-level fields
  for (const field of ['meta', 'hero', 'status', 'sections', 'getInTouch']) {
    if (!(field in data)) {
      errors.push(`Missing required field: "${field}"`);
    }
  }

  // meta validation
  const meta = data.meta as Record<string, unknown> | undefined;
  if (meta && typeof meta === 'object') {
    for (const field of ['name', 'slug', 'template']) {
      if (!(field in meta)) {
        errors.push(`Missing meta.${field}`);
      }
    }
    if (meta.template && !VALID_TEMPLATES.includes(meta.template as TemplateName)) {
      errors.push(`Invalid meta.template: "${meta.template}". Must be one of: ${VALID_TEMPLATES.join(', ')}`);
    }
  }

  // hero validation
  const hero = data.hero as Record<string, unknown> | undefined;
  if (hero && typeof hero === 'object') {
    if (!('title' in hero)) errors.push('Missing hero.title');
    if (!('bio' in hero)) errors.push('Missing hero.bio');
  }

  // status validation
  const status = data.status as Record<string, unknown> | undefined;
  if (status && typeof status === 'object') {
    for (const field of ['currentRole', 'organization', 'location', 'lastUpdated']) {
      if (!(field in status)) {
        errors.push(`Missing status.${field}`);
      }
    }
    const loc = status.location as Record<string, unknown> | undefined;
    if (loc && typeof loc === 'object') {
      if (!('city' in loc)) errors.push('Missing status.location.city');
      if (!('country' in loc)) errors.push('Missing status.location.country');
    }
  }

  // sections validation
  const sections = data.sections as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(sections)) {
    sections.forEach((section, i) => {
      if (!('type' in section)) {
        errors.push(`sections[${i}]: missing "type"`);
      } else if (!VALID_SECTION_TYPES.includes(section.type as SectionType)) {
        errors.push(`sections[${i}]: invalid type "${section.type}". Must be one of: ${VALID_SECTION_TYPES.join(', ')}`);
      }
      if (!('title' in section)) {
        errors.push(`sections[${i}]: missing "title"`);
      }
      if (!('content' in section)) {
        errors.push(`sections[${i}]: missing "content"`);
      }
    });
  }

  // activityFeed validation (optional)
  const feed = data.activityFeed as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(feed)) {
    feed.forEach((item, i) => {
      if (!('date' in item)) errors.push(`activityFeed[${i}]: missing "date"`);
      if (!('type' in item)) {
        errors.push(`activityFeed[${i}]: missing "type"`);
      } else if (!VALID_FEED_TYPES.includes(item.type as string)) {
        errors.push(`activityFeed[${i}]: invalid type "${item.type}"`);
      }
      if (!('title' in item)) errors.push(`activityFeed[${i}]: missing "title"`);
    });
  }

  return errors;
}

function validateSiteConfig(filepath: string): string[] {
  const errors: string[] = [];
  const raw = fs.readFileSync(filepath, 'utf-8');
  let data: Record<string, unknown>;

  try {
    data = JSON.parse(raw);
  } catch {
    return [`Invalid JSON: could not parse file`];
  }

  if (!('familyName' in data)) errors.push('Missing "familyName"');
  if (!('profiles' in data)) {
    errors.push('Missing "profiles" array');
  } else if (Array.isArray(data.profiles)) {
    (data.profiles as Array<Record<string, unknown>>).forEach((p, i) => {
      for (const field of ['slug', 'name', 'template']) {
        if (!(field in p)) {
          errors.push(`profiles[${i}]: missing "${field}"`);
        }
      }
      if (p.template && !VALID_TEMPLATES.includes(p.template as TemplateName)) {
        errors.push(`profiles[${i}]: invalid template "${p.template}"`);
      }
    });
  }

  return errors;
}

function main(): void {
  const root = path.resolve(__dirname, '..');
  const profilesDir = path.join(root, 'public', 'data', 'profiles');
  const siteConfigPath = path.join(root, 'public', 'data', 'site.json');

  const results: ValidationError[] = [];

  // Validate site.json
  if (fs.existsSync(siteConfigPath)) {
    const errors = validateSiteConfig(siteConfigPath);
    if (errors.length > 0) {
      results.push({ file: 'public/data/site.json', errors });
    }
  } else {
    results.push({ file: 'public/data/site.json', errors: ['File not found'] });
  }

  // Validate all profile JSONs
  if (fs.existsSync(profilesDir)) {
    const files = fs.readdirSync(profilesDir).filter(f => f.endsWith('.json')).sort();
    if (files.length === 0) {
      results.push({ file: profilesDir, errors: ['No profile JSON files found'] });
    }
    for (const filename of files) {
      const filepath = path.join(profilesDir, filename);
      const errors = validateProfile(filepath);
      if (errors.length > 0) {
        results.push({ file: `public/data/profiles/${filename}`, errors });
      }
    }
  } else {
    results.push({ file: 'public/data/profiles/', errors: ['Directory not found'] });
  }

  // Report results
  if (results.length > 0) {
    console.error('\nValidation FAILED:\n');
    for (const result of results) {
      console.error(`  ${result.file}:`);
      for (const error of result.errors) {
        console.error(`    - ${error}`);
      }
      console.error('');
    }
    process.exit(1);
  } else {
    console.log('All profiles and site config are valid!');
  }
}

main();
