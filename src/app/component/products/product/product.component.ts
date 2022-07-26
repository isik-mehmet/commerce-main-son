import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Location } from '@angular/common';

//import { Products } from '../../../mock/mock-products';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //products: Product[] = [];

  //selectedProducts?: Product;

   product: Product | undefined;
   
   constructor(
     private route: ActivatedRoute,
     private productService: ProductService,
     private location: Location
   ) {} 

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(product => this.product = product)  }

  /*onSelect(product: Product): void {
    this.selectedProducts = product;
  }
  showLoader(){

  }*/
  ngOnInit(): void {
    this.getProduct();
  }
  addToShoppingCart(product: any){
    console.log(product);
    this.productService.addProduct(product);
  }

  
}
