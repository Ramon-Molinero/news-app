import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/newsResponse.interface';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';

import { Share } from '@capacitor/share';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;

  constructor(
    private inAppBrowser: InAppBrowser,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  openArticle() {
    if (this.platform.is('ios' || 'android')) {
      const browser = this.inAppBrowser.create(this.article.url);
      browser.show();
      return;
    }
    window.open(this.article.url, '_blank');
  }

  async openMenu() {

    const isFavoriteArticle = this.storageService.isFavoriteArticle(this.article);

     const share: ActionSheetButton = {
       text: 'Share',
       icon: 'share-outline',
       handler: () => this.sharedArticle(),
     };
    
    const otherButtons: ActionSheetButton[] = [
      {
          text: !isFavoriteArticle ? 'Favorite' : 'Delete Favorite',
          icon: !isFavoriteArticle ? 'heart-outline' : 'heart',
          cssClass: isFavoriteArticle ? 'fill-heart' : '',
          handler: () => this.toggleFavoriteArticle(),
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel option');
          }
        },
    ]

    // otherButtons.unshift(share);

     if (!this.platform.is('desktop')) {
      otherButtons.unshift(share);
     }

    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: otherButtons,
    });

   

    await actionSheet.present();

  }

  async sharedArticle() {
    console.log('Shared Options');
    const { title, source, url } = this.article;


    if (this.platform.is('capacitor')) {
      this.socialSharing.share(title, source.name, null, url);
    } else if (navigator.share) {
      navigator
        .share({
          title,
          text: source.name,
          url,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('is not support in navigator');
    }
  }

  toggleFavoriteArticle() {
    console.log('toogle Favorite Article');
    this.storageService.toggleFavoriteArticle(this.article);
  }
}
