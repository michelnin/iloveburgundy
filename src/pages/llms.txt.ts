import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, AUTHOR } from '../consts';

type AnyEntry = CollectionEntry<'notes' | 'glossary' | 'rankings' | 'trips' | 'courses'>;

function section(title: string, entries: AnyEntry[], base: string): string {
  if (entries.length === 0) return '';
  const lines = entries.map(
    (e) => `- [${e.data.title}](${SITE.url}${base}${e.id}/): ${e.data.description}`,
  );
  return `## ${title}\n\n${lines.join('\n')}\n\n`;
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

  const body = `# ${SITE.title} (${SITE.titleEn})

> ${SITE.description}

作者：${AUTHOR.name}（${AUTHOR.nameEn}）— ${AUTHOR.url}

${section('文章 Notes', notes, '/notes/')}${section('术语库 Glossary', glossary, '/glossary/')}${section('榜单 Rankings', rankings, '/rankings/')}${section('旅行 Trips', trips, '/trips/')}${section('课程 Courses', courses, '/courses/')}## 其他 Other

- [关于 About](${SITE.url}/about/)
- [完整正文 Full content](${SITE.url}/llms-full.txt)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
