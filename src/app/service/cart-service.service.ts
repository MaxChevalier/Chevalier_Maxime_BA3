import { Injectable } from '@angular/core';
import { IArticlePanier } from '../Interface/IArticlePanier';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cart: IArticlePanier[] = [];

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('Cart') || '[]');
  }

  public getCart(): IArticlePanier[] {
    return this.cart;
  }

  public getCartbyId(id: string): IArticlePanier | undefined {
    return this.cart.find(x => x.id === id);
  }

  public addArticleToCart(article: IArticlePanier) {
    let articleInCart = this.getCartbyId(article.id);
    if (articleInCart) {
      articleInCart.quantity = article.quantity;
      articleInCart.totalPrice = articleInCart.quantity * articleInCart.price;
    } else {
      article.totalPrice = article.quantity * article.price;
      this.cart.push(article);
    }
    localStorage.setItem('Cart', JSON.stringify(this.cart));
  }

  public removeArticleFromCart(id: string) {
    this.cart = this.cart.filter(x => x.id !== id);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
  }

  public clearCart() {
    this.cart = [];
    localStorage.setItem('Cart', JSON.stringify(this.cart));
  }
}
