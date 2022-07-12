export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source:       Source;
  author?:      string;
  title:        string;
  description?: string;
  url:          string;
  urlToImage?:  string;
  publishedAt:  Date;
  content?:     string;
}

export interface Source {
  id?:  string;
  name: string;
}

export interface ArticleByCategoryAndPage {
  [key: string]: {
    page: number,
    articles: Article[]
  }
}

export interface ArticleOfCategory {
  business?: Category;
  entertainment?: Category;
  general?: Category;
  health?: Category;
  science?: Category;
  sports?: Category;
  technology?: Category;
}

export interface Category {
  page: number;
  articles: Article[];
}
