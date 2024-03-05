import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { IArticle } from '../Interface/IArcticle';
import { IArticlePanier } from '../Interface/IArticlePanier';
import { IUser } from '../Interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class EcommerceServiceService {

  private apiRoutes = {
    articles: 'https://www.eleguen.ovh/api/v1/articles',
    purchase: 'https://www.eleguen.ovh/api/v1/purchase'
  }

  constructor(private http: HttpClient) { }

  public getAllArticle(): Observable<IArticle[]> {
    return this.http.get(this.apiRoutes.articles).pipe(map(
      (res: any) => res as IArticle[])
    )
  }

  public getArticleById(id: string): Observable<IArticle> {
    return this.http.get(this.apiRoutes.articles + '/' + id).pipe(map(
      (res: any) => res as IArticle)
    )
  }

  public purchaseArticle(order: { panier: IArticlePanier[], user: IUser }): Observable<number> {
    return this.http.post(this.apiRoutes.purchase, JSON.stringify(order)).pipe(
      map((response: any) => {
        return response.status;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
