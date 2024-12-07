import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private http: HttpClient = inject(HttpClient);

  public create(produto: { nome: string, preco: number }) {
    return this.http.post('https://dummyjson.com/products/add', produto);
  }

  public read(): Observable<{products: {id: string, title: string, price: number}[]}> {
    return this.http.get<{products: {id: string, title: string, price: number}[]}>('https://dummyjson.com/products');
  }
}
