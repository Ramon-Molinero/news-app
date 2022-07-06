import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces/newsResponse.interface';
import { NewsService } from 'src/app/services/news.service';
import { IonInfiniteScroll, InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public articles: Article[] = [];
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getTopHeadlinesbyCategory('technology')
      .subscribe((articles) => {
        this.articles = [...articles];
        console.log(this.articles);
      });
  }

  loadData(event: Event) {
    this.newsService
      .getTopHeadlinesbyCategory('technology', true)
      .subscribe((articles) => {

        if (articles.length === this.articles.length) this.ionInfiniteScroll.disabled = true;

        this.articles = articles;
        this.ionInfiniteScroll.complete();
      });
  }
}
