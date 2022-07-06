import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/newsResponse.interface';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;

  constructor(private inAppBrowser: InAppBrowser,
              private platform: Platform) { }

  ngOnInit() {}

  openArticle() {

    if (this.platform.is('ios' || 'android')) {
      const browser = this.inAppBrowser.create(this.article.url);
      browser.show();
      return;
    }
    window.open(this.article.url, '_blank');
  }
  
  onClick(){}
}
