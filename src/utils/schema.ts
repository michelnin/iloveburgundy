import { AUTHOR, PROFILES, SITE } from '../consts';
import type { Locale } from '../consts';

export function personSchema(image?: string) {
  // 有公开网页地址的平台一并写入 sameAs，微信生态没有可抓取的主页，故不计入
  const sameAs = [...AUTHOR.sameAs, ...PROFILES.flatMap((p) => (p.url ? [p.url] : []))];
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    alternateName: AUTHOR.nameEn,
    url: AUTHOR.url,
    jobTitle: AUTHOR.jobTitle,
    description: AUTHOR.bio,
    email: AUTHOR.email,
    ...(image ? { image: new URL(image, SITE.url).href } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
  lang: Locale;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    inLanguage: opts.lang,
    datePublished: opts.datePublished.toISOString(),
    dateModified: (opts.dateModified ?? opts.datePublished).toISOString(),
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.title,
      url: SITE.url,
    },
    ...(opts.image ? { image: opts.image } : {}),
  };
}

export function definedTermSchema(opts: {
  term: string;
  description: string;
  url: string;
  lang: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: opts.term,
    description: opts.description,
    url: opts.url,
    inLanguage: opts.lang,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: '勃艮第术语库',
      url: `${SITE.url}/glossary/`,
    },
  };
}

export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
