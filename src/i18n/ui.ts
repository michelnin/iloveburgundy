import { DEFAULT_LOCALE, type Locale } from '../consts';

export const languageNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  fr: 'Français',
};

export const ui = {
  zh: {
    'nav.home': '首页',
    'nav.notes': '文章',
    'nav.glossary': '术语库',
    'nav.rankings': '榜单',
    'nav.trips': '旅行',
    'nav.courses': '课程',
    'nav.join': '入群',
    'nav.about': '关于',
    'home.hero': '写给中文读者的勃艮第葡萄酒指南',
    'home.latest': '最新文章',
    'home.more': '查看全部文章',
    'home.entries': '更多入口',
    'list.empty': '内容整理中，敬请期待。',
    'article.updated': '更新于',
    'article.publishedOn': '发布于',
    'article.backToList': '返回列表',
    'glossary.title': '勃艮第术语库',
    'glossary.description': '勃艮第葡萄酒常用术语的中文解释，逐条独立收录。',
    'home.contact': '联系',
    'home.chineseNotice': '',
    'footer.rights': '版权所有',
  },
  en: {
    'nav.home': 'Home',
    'nav.notes': 'Articles',
    'nav.glossary': 'Glossary',
    'nav.rankings': 'Rankings',
    'nav.trips': 'Trips',
    'nav.courses': 'Courses',
    'nav.join': 'Contact',
    'nav.about': 'About',
    'home.hero': 'A Chinese-language guide to Burgundy wine',
    'home.latest': 'Latest articles',
    'home.more': 'View all articles',
    'home.entries': 'More',
    'list.empty': 'Content coming soon.',
    'article.updated': 'Updated',
    'article.publishedOn': 'Published',
    'article.backToList': 'Back to list',
    'glossary.title': 'Burgundy Glossary',
    'glossary.description': 'Burgundy wine terminology, one entry per URL.',
    'home.contact': 'Get in touch',
    'home.chineseNotice': 'Most articles on this site are written in Chinese.',
    'footer.rights': 'All rights reserved',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.notes': 'Articles',
    'nav.glossary': 'Glossaire',
    'nav.rankings': 'Classements',
    'nav.trips': 'Voyages',
    'nav.courses': 'Cours',
    'nav.join': 'Contact',
    'nav.about': 'À propos',
    'home.hero': 'Un guide en chinois sur les vins de Bourgogne',
    'home.latest': 'Derniers articles',
    'home.more': 'Tous les articles',
    'home.entries': "Plus d'entrées",
    'list.empty': 'Contenu à venir.',
    'article.updated': 'Mis à jour',
    'article.publishedOn': 'Publié',
    'article.backToList': 'Retour à la liste',
    'glossary.title': 'Glossaire de Bourgogne',
    'glossary.description': 'Terminologie du vin de Bourgogne, une entrée par URL.',
    'home.contact': 'Contact',
    'home.chineseNotice': 'La plupart des articles de ce site sont rédigés en chinois.',
    'footer.rights': 'Tous droits réservés',
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof DEFAULT_LOCALE];

/**
 * 链接指向无前缀的中文路由时，附在链接文字后的标注。
 * 中文版自身不需要，故返回 undefined。
 */
export const CHINESE_ONLY_NOTE: Partial<Record<Locale, string>> = {
  en: '(CN)',
  fr: '(CN)',
};

export function useTranslations(lang: Locale) {
  return function t(key: UiKey): string {
    return ui[lang]?.[key] ?? ui[DEFAULT_LOCALE][key];
  };
}

export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if (first === 'en' || first === 'fr') return first;
  return DEFAULT_LOCALE;
}

export function localizePath(path: string, lang: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === DEFAULT_LOCALE) return clean;
  return `/${lang}${clean}`;
}
