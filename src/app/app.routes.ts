import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './Page/home/home.component';
import { PanierComponent } from './Page/panier/panier.component';
import { CheckoutComponent } from './Page/checkout/checkout.component';
import { Error404Component } from './Page/error404/error404.component';

export const routes: Routes = [
    {
        title: 'FrontShop - Home',
        path: '',
        component: HomeComponent
    },
    {
        title: 'FrontShop - Panier',
        path: 'Panier',
        component: PanierComponent
    },
    {
        title: 'FrontShop - Checkout',
        path: 'Checkout',
        component: CheckoutComponent
    },
    {
        title: 'FrontShop - 404 Error',
        path: '**',
        component: Error404Component
    }
];
