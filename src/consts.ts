export const SITE = {
  title: '爱勃艮第',
  titleEn: 'I Love Burgundy',
  description: '中文世界的勃艮第葡萄酒指南：产区风土、酒庄榜单、术语解析与实地游学。',
  descriptionEn:
    'A Chinese-language guide to Burgundy wine: terroir, producers, rankings, glossary, and study trips.',
  descriptionFr:
    'Un guide en chinois sur les vins de Bourgogne : terroir, domaines, classements, glossaire et voyages d’étude.',
  url: 'https://iloveburgundy.cn',
} as const;

export const AUTHOR = {
  name: '梅宁博',
  nameEn: 'Ningbo Mei',
  jobTitle: '勃艮第葡萄酒作者',
  jobTitleEn: 'Burgundy Wine Writer',
  jobTitleFr: 'Auteur spécialisé en vins de Bourgogne',
  bio: '梅宁博长期研究勃艮第葡萄酒，专注产区风土、酒庄评述与中文读者的入门与进阶教育。',
  bioEn:
    'Ningbo Mei writes about Burgundy wine, focusing on terroir, producer reviews, and education for Chinese-speaking readers.',
  bioFr:
    "Ningbo Mei écrit sur les vins de Bourgogne, en se concentrant sur le terroir, les domaines et l'éducation des lecteurs sinophones.",
  url: 'https://iloveburgundy.cn/about',
  // 可在此补充社交主页链接，会自动写入 Person 的 sameAs 字段
  sameAs: [] as string[],
} as const;

export const LOCALES = ['zh', 'en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'zh';
