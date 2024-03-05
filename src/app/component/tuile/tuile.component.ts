import { Component, Input } from '@angular/core';
import { IArticle } from '../../Interface/IArcticle';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-tuile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tuile.component.html',
  styleUrl: './tuile.component.css'
})
export class TuileComponent {

  @Input() article!: IArticle;

  quantity: number = 1;
  isInCart: boolean = false;

  constructor() { }

  addToCart() {
    if (this.article.Buy == 'NFS') return;
    this.isInCart = true;
  }
  removeFromCart() {
    this.isInCart = false;
  }

  onUpdateQuantity(nb: number) {
    this.quantity += nb;
  }
  
}
