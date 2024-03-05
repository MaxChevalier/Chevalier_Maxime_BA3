import { Component } from '@angular/core';
import { TuileComponent } from '../../component/tuile/tuile.component';
import { NgFor } from '@angular/common';
import { SubscriberController } from '../../component/commun/subscriberController';
import { EcommerceServiceService } from '../../service/ecommerce-service.service';
import { IArticle } from '../../Interface/IArcticle';
import { IArticlePanier } from '../../Interface/IArticlePanier';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [TuileComponent, NgFor],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent extends SubscriberController {

	public articles: IArticle[] = [];
	public Cart: IArticlePanier[] = [];

	constructor(private EcommerceService: EcommerceServiceService) {
		super();
	}

	ngOnInit() {
		this.subscription["$GetArticle"] = this.EcommerceService.getAllArticle().subscribe(
			{
				next: (res) => {
					this.articles = res
				},
				error: (err) => {
					console.error(err)
				}
			}
		)
		this.Cart = JSON.parse(localStorage.getItem('Cart') || '[]');

	}

	ngOnUpdateCart() {
		this.Cart = JSON.parse(localStorage.getItem('Cart') || '[]');
	}
}
