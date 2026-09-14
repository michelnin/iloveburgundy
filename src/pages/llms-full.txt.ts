import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, AUTHOR } from '../consts';

type AnyEntry = CollectionEntry<'notes' | 'glossary' | 'rankings' | 'trips' | 'courses'>;

function renderEntry(e: AnyEntry, base: string): string {
  const url = `${SITE.url}${base}${e.id}/`;
  return [
    `## ${e.data.title}`,
    '',
    `URL: ${url}`,
    `日期: ${e.data.date.toISOString().slice(0, 10)}`,
    e.data.tags.length ? `标签: ${e.data.tags.join(', ')}` : '',
    '',
    e.data.description,
    '',
    e.body ?? '',
    '',
    '---',
    '',
  ]
    .filter((line) => line !== null && line !== undefined)
    .join('\n');
}

export const GET: APIRoute = async () => {
  const isZhLive = ({ data }: { data: { draft: boolean; lang: string } }) =>
    !data.draft && data.lang === 'zh';

  const notes = (await getCollection('notes', isZhLive)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const glossary = await getCollection('glossary', isZhLive);
  const rankings = await getCollection('rankings', isZhLive);
  const trips = await getCollection('trips', isZhLive);
  const courses = await getCollection('courses', isZhLive);

  const parts = [
    `# ${SITE.title} (${SITE.titleEn}) — 完整内容 Full Content`,
    '',
    `> ${SITE.description}`,
    '',
    `作者：${AUTHOR.name}（${AUTHOR.nameEn}）— ${AUTHOR.url}`,
    '',
    '# 文章 Notes',
    '',
    ...notes.map((e) => renderEntry(e, '/notes/')),
    '# 术语库 Glossary',
    '',
    ...glossary.map((e) => renderEntry(e, '/glossary/')),
    '# 榜单 Rankings',
    '',
    ...rankings.map((e) => renderEntry(e, '/rankings/')),
    '# 旅行 Trips',
    '',
    ...trips.map((e) => renderEntry(e, '/trips/')),
    '# 课程 Courses',
    '',
    ...courses.map((e) => renderEntry(e, '/courses/')),
  ];

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
