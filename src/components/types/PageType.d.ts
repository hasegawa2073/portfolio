const pages = ['Home', 'About', 'Works', 'GitHub', 'Contact'] as const;
export type PageType = (typeof pages)[number];
