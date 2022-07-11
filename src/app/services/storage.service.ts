import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/newsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  get getLocalArticles(): Article[] {
    return [...this._localArticles];
  }

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  async toggleFavoriteArticle(article: Article) {

    const exist = this._localArticles.find(localArticle => localArticle.title === article.title);

    if (exist) {
      this._localArticles = this._localArticles.filter(localArticle => localArticle.title !== article.title);
    } else {
      this._localArticles = [article, ...this._localArticles];
    }
    
   await this._storage.set('articles', this._localArticles);
    
  }

  async loadFavorites() {
    try {
      
      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];

    } catch (error) {
      console.log(error, 'dont load favorite articles');
    }
  }

  isFavoriteArticle(article: Article) {
    // Usamos !! para transformar el valor en un boleano
    return !!this._localArticles.find(localArticle => localArticle.title === article.title);
  }

}
