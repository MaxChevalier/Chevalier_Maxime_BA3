import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticlePanier } from '../../Interface/IArticlePanier';
import { CartServiceService } from '../../service/cart-service.service';

@Component({
  selector: 'app-panier-item',
  standalone: true,
  imports: [],
  templateUrl: './panier-item.component.html',
  styleUrl: './panier-item.component.css'
})
export class PanierItemComponent {

  @Input() article!: IArticlePanier;

  @Output() removeFromCartOutput = new EventEmitter<IArticlePanier>();

  constructor(private cartServiceService: CartServiceService) { }

  removeFromCart() {
    this.removeFromCartOutput.emit(this.article);
  }

  onUpdateQuantity(nb: number) {
    this.article.quantity += nb;
    this.article.totalPrice = this.article.price * this.article.quantity;
		this.cartServiceService.addArticleToCart(this.article as IArticlePanier);
  }

}
