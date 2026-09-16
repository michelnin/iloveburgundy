export const SITE = {
  title: '爱勃艮第',
  titleEn: 'I Love Burgundy',
  description: '中文世界的勃艮第葡萄酒指南：产区风土、酒庄榜单、术语解析与实地游学。',
  descriptionEn:
    'A Chinese-language guide to Burgundy wine: terroir, producers, rankings, glossary, and study trips.',
  descriptionFr:
    'Un guide en chinois sur les vins de Bourgogne : terroir, domaines, classements, glossaire et voyages d’étude.',
  url: 'https://ningbomei.com',
} as const;

export const AUTHOR = {
  name: '梅宁博',
  nameEn: 'Ningbo Mei',
  jobTitle: '勃艮第葡萄酒专家',
  jobTitleEn: 'Burgundy Wine Expert, Author, Editor-in-Chief',
  jobTitleFr: 'Expert en vins de Bourgogne',
  bio: '梅宁博，勃艮第葡萄酒专家、《勃艮第特级园》作者、《我爱勃艮第》系列视频作者。与 Jasper Morris MW 联合创办 Inside Burgundy 中文版并任主编。自 2011 年起每年赴勃艮第实地考察，累计走访酒庄逾 500 家，为中国藏家主持勃艮第深度考察与高阶品鉴课程。',
  bioEn:
    "Ningbo Mei is a Burgundy wine expert and author based in Shanghai. He holds a Master's in Wine & Spirits Management from ESC Dijon (2012) and is the author of 《勃艮第特级园》 (Edition EIPL), a Chinese-language study of the 33 Burgundy Grands Crus. In 2019 he co-founded the Chinese edition of Inside Burgundy with Jasper Morris MW, where he serves as Editor-in-Chief. He has travelled to Burgundy every year since 2011 and has visited more than 500 domaines.",
  bioFr:
    "Ningbo Mei est expert en vins de Bourgogne et auteur, basé à Shanghai. Diplômé du Master Commerce International des Vins et Spiritueux de l'ESC Dijon (2012), il est l'auteur de 《勃艮第特级园》 (Edition EIPL), ouvrage en chinois consacré aux 33 grands crus de Bourgogne. En 2019, il a cofondé l'édition chinoise d'Inside Burgundy avec Jasper Morris MW, dont il est rédacteur en chef. Depuis 2011, il se rend chaque année en Bourgogne et a visité plus de 500 domaines.",
  url: 'https://ningbomei.com/about',
  email: 'ningbo@insideburgundy.cn',
  wechat: 'ningbovin',
  // 可在此补充社交主页链接，会自动写入 Person 的 sameAs 字段
  sameAs: ['https://insideburgundy.cn'] as string[],
} as const;

export const LOCALES = ['zh', 'en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'zh';
