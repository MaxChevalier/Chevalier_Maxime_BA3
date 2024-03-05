import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartServiceService } from '../../service/cart-service.service';
import { Router } from '@angular/router';
import { EcommerceServiceService } from '../../service/ecommerce-service.service';
import { SubscriberController } from '../../component/commun/subscriberController';
import { take } from 'rxjs';
import { IUser } from '../../Interface/IUser';

@Component({
	selector: 'app-checkout',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './checkout.component.html',
	styleUrl: './checkout.component.css'
})
export class CheckoutComponent extends SubscriberController {

	public form!: FormGroup;

	constructor(private cartServiceService: CartServiceService, private router: Router, private EcommerceService: EcommerceServiceService) {
		super();
	}

	ngOnInit() {
		this.form = new FormGroup({
			lastname: new FormControl(
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50)
				]
			),
			firstname: new FormControl(
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50)
				]
			),
			adress: new FormControl(
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(100)
				]
			),
			zipcode: new FormControl(
				'',
				[
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(5),
				]
			),
			city: new FormControl(
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50)
				]
			),
			card: new FormControl(
				'',
				[
					Validators.required,
					Validators.minLength(16),
					Validators.maxLength(16)
				]
			),
			cardDate: new FormControl(
				'',
				[
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(5)
				]
			),
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.EcommerceService.purchaseArticle({ panier: this.cartServiceService.getCart(), user: this.form.value as IUser }).subscribe({
				next: (res) => {
					alert('Commande validée');
					this.cartServiceService.clearCart();
					this.router.navigate(['/']);
				},
				error: (error) => {
					console.error('Erreur lors de la requête POST:', error);
					alert('Erreur lors de la commande\nVeuillez réessayer ultérieurement');
				}
			});
		}
	}

	onGiveUp() {
		this.cartServiceService.clearCart();
		this.router.navigate(['/']);
	}

}
