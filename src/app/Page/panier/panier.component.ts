import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CartServiceService } from '../../service/cart-service.service';
import { PanierItemComponent } from '../../component/panier-item/panier-item.component';
import { IArticlePanier } from '../../Interface/IArticlePanier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgFor, PanierItemComponent],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {

  public Cart: IArticlePanier[] = [];
  public totalPrice: number = 0;

  constructor(private cartServiceService: CartServiceService, private router: Router) { }

  ngOnInit() {
    this.Cart = this.cartServiceService.getCart();
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPrice = 0;
    this.Cart.forEach(element => {
      this.totalPrice += element.totalPrice;
    });
  }

  removeArticle(article: IArticlePanier) {
    this.cartServiceService.removeArticleFromCart(article.id);
    this.Cart = this.cartServiceService.getCart();
    this.updateTotalPrice();
  }

  onValidate() {
    this.router.navigate(['/Checkout']);
  }

  onEmptyCart() {
    if (confirm("Voulez-vous vraiment vider votre panier ?")) {
      this.cartServiceService.clearCart();
      this.Cart = this.cartServiceService.getCart();
      this.updateTotalPrice();
    }
  }



}
