import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, SegmentChangeEventDetail, SegmentCustomEvent } from '@ionic/angular';
import { select } from '@ngrx/store';
import { TouchSequence } from 'selenium-webdriver';
import { Article } from 'src/app/interfaces/newsResponse.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  public categorySelected: string = this.categories[0];

  currentPageSize: number = 20;
  totalArticles: number = 0;

  articles: Article[] = [];

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;

  constructor(private newsService: NewsService) {}

  
  ngOnInit(): void {
    this.getArticles(this.categorySelected);
    console.log(this.categorySelected);
  }
  
  segmentChanged(event: Event) {
    this.categorySelected = (event as CustomEvent).detail.value;
    this.getArticles(this.categorySelected);
  }
  
  private getArticles(category: string) {
    this.newsService
      .getTopHeadlinesbyCategory(category)
      .subscribe((articles) => {
        this.articles = [ ...articles];
      });
  }
  
  loadData(event: Event) { 

    this.newsService.getTopHeadlinesbyCategory(this.categorySelected, true)
      .subscribe(articles => {

        if (articles.length === this.articles.length) this.ionInfiniteScroll.disabled = true;

        this.articles = articles;
        this.ionInfiniteScroll.complete();
        
      })
  }
  










  // private getArticles(category: string, pageSize: number = 20) {
  //   this.newsService.getArticlesByCategory(category).subscribe(articles => {
  //     this.articles = articles.articles;
  //     this.totalArticles = articles.totalResults;
  //   });
  // }

  // loadData(event: Event) {
  //   if (this.currentPageSize >= this.totalArticles) {
  //     this.currentPageSize = this.totalArticles;
  //   }

  //   if (this.currentPageSize <= this.totalArticles) {
  //     this.newsService
  //       .getArticlesByCategory(this.categorySelected, this.currentPageSize)
  //       .subscribe((articles) => (this.articles = [...articles.articles]));
  //     this.currentPageSize += 20;

  //     setTimeout(() => {
  //       this.ionInfiniteScroll.complete();
  //     }, 500);
  //   }
  // }
}
