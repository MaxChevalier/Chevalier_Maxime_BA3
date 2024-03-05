import { Component, Input } from '@angular/core';
import { IArticle } from '../../Interface/IArcticle';
import { NgIf } from '@angular/common';
import { CartServiceService } from '../../service/cart-service.service';
import { IArticlePanier } from '../../Interface/IArticlePanier';


@Component({
	selector: 'app-tuile',
	standalone: true,
	imports: [NgIf],
	templateUrl: './tuile.component.html',
	styleUrl: './tuile.component.css'
})
export class TuileComponent {

	@Input() article!: IArticle;
	@Input() cartArcticle!: IArticlePanier | undefined;

	isInCart: boolean = false;

	constructor(private cartServiceService: CartServiceService) { }

	ngOnInit() {
		this.cartArcticle = this.cartServiceService.getCartbyId(this.article["Unique Entry ID"]);
		if (this.cartArcticle) {
			this.isInCart = true;
		} else {
			this.isInCart = false;
			if (this.article.Buy != 'NFS') {
				this.cartArcticle = {
					id: this.article["Unique Entry ID"],
					name: this.article.Name,
					price: +this.article.Buy as number,
					quantity: 1,
					totalPrice: 0
				}
			}
		}
	}

	addToCart() {
		if (this.article.Buy == 'NFS') return;
		this.isInCart = true;
		this.cartServiceService.addArticleToCart(this.cartArcticle as IArticlePanier);
	}
	removeFromCart() {
		this.isInCart = false;
	}

	onUpdateQuantity(nb: number) {
		if (this.cartArcticle) {
			this.cartArcticle.quantity += nb;
			this.addToCart();
		}
	}

}
