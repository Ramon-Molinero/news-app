import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces/newsResponse.interface';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey = environment.apiKey;
  headers

  constructor(private httpClient: HttpClient) { }


  
  getTopHeadlines(): Observable<Article[]> {
    return this.httpClient.get<NewsResponse>(
      `https://newsapi.org/v2/top-headlines?country=us&category=business`,
      {
        params: {
          apiKey: this.apiKey
        }
      }
    ).pipe(
      map( ({articles}) => articles )
    );
  }

}
