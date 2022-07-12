import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticleByCategoryAndPage, ArticleOfCategory, NewsResponse } from '../interfaces/newsResponse.interface';

import { map } from 'rxjs/operators';
import { storedArticlesByCategory } from '../data/mock-news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  // private articleByCategoryAndPage: ArticleByCategoryAndPage = {};
  private articleByCategoryAndPage = storedArticlesByCategory;
  // private articleByCategoryAndPage: ArticleByCategoryAndPage = storedArticlesByCategory;

  constructor(private httpClient: HttpClient) {
    this.executeQuery;
  }

  private executeQuery<T>(endpoint: string) {
    console.log('peticion http realizada');
    return this.httpClient.get<T>(`${this.apiUrl}${endpoint}`, {
      params: {
        apiKey: this.apiKey,
        country: 'us',
      },
    });
  }

  getTopHeadlinesbyCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<Article[]> {

    return of(this.articleByCategoryAndPage[category].articles);

    // For localHost

    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articleByCategoryAndPage[category]) {
      return of(this.articleByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (!Object.keys(this.articleByCategoryAndPage).includes(category)) {
      this.articleByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articleByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(
      `/top-headlines?category=${category}&page=${page}`
    ).pipe(
      map(({ articles }) => {
        if (articles.length === 0) {
          return this.articleByCategoryAndPage[category].articles;
        }

        this.articleByCategoryAndPage[category] = {
          page: page,
          articles: [
            ...this.articleByCategoryAndPage[category].articles,
            ...articles,
          ],
        };

        return this.articleByCategoryAndPage[category].articles;
      })
    );
  }
}
