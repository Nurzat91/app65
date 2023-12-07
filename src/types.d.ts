export interface FormPages{
  id: string;
  category: string;
  title: string;
  content: string;
}

export type PageContent = Omit<FormPages, 'id', 'category'>;

export type Category = Omit<FormPages, 'category', 'content'>;