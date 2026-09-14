import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 统一的 frontmatter 规范：title / description / date / updated / tags / lang / draft / cover / slug
// .passthrough() 让 Obsidian Enveloppe 插件多推来的字段（如 share）不会导致构建失败
const makeSchema = ({ image }: SchemaContext) =>
  z
    .object({
      title: z.string(),
      description: z.string().optional().default(''),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).optional().default([]),
      lang: z.enum(['zh', 'en', 'fr']).optional().default('zh'),
      draft: z.boolean().optional().default(false),
      cover: image().optional(),
      slug: z.string().optional(),
    })
    .loose();

// 若 frontmatter 提供了 slug，就用它作为 URL 片段；否则退回文件名（去掉扩展名）
function generateId({ entry, data }: { entry: string; data: Record<string, unknown> }) {
  if (typeof data.slug === 'string' && data.slug.trim().length > 0) {
    return data.slug.trim();
  }
  return entry.replace(/\.[^/.]+$/, '');
}

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/notes', generateId }),
  schema: makeSchema,
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/glossary', generateId }),
  schema: makeSchema,
});

const rankings = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/rankings', generateId }),
  schema: makeSchema,
});

const trips = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/trips', generateId }),
  schema: makeSchema,
});

const courses = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/courses', generateId }),
  schema: makeSchema,
});

export const collections = { notes, glossary, rankings, trips, courses };
