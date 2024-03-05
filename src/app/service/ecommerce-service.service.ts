import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IArticle } from '../Interface/IArcticle';

@Injectable({
  providedIn: 'root'
})
export class EcommerceServiceService {

  private apiRoutes = {
    articles: 'https://www.eleguen.ovh/api/v1/articles',
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
}
