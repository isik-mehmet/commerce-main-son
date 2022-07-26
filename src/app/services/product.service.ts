import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Products } from '../mock/mock-products'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProducts?: Product;
  private productUrl = 'http://localhost:8080/product/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    ) { }


  public addedItems: any=[];

  //db için 
  getProducts(): Observable<Product[]> {
    console.log( "test");
    return this.http.get<Product[]>(this.productUrl+"getAllProduct")
  }
  /*getProductNo404<Data>(id: number): Observable<Product> {
    const url = `${this.productUrl}/?id=${id}`;
    return this.http.get<Product[]>(url)
      .pipe(
        map(product => Products[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
;
        }),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }*/

   /** GET Product by id. Will 404 if id not found */
   getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  
  //mock veri için kullanılıyor
 /* getProducts(): Observable<Product[]> {
    const products = of(Products);
    return products;
  }*/

  // Mock için
  /*getProduct(id: number): Observable<Product> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const product = Products.find(p => p.id === id)!;
    return of(product);
  }*/


  addProduct(product: Product){/* burada eklenmiş ürünün idsine bakarak daha önce eklenmişse quantitysi 1 arttırılır eklenmemişse 
  direkt sepete eklenir.  */
    this.addedItems.push(product);
  }
  
  getTotal(): number{
    let total = 0;
    this.addedItems.map((a:any)=>{
      total+=a.price;
    })
    return total;
  }

  getAllProducts(){
    return this.addedItems;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
