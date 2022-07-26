import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Products } from '../../mock/mock-products';
import { ProductService } from '../../services/product.service';
import {Category} from "../../model/category";
import {categories} from "../../mock/mock-categories";
import {Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories: Category[] = categories;
  products: Product[] = [];
  categoryProducts: Product[] = [];
  selectedProducts?: Product;
  inCategory: boolean = false;
  currentRoute?: string;
  totalPrice: number=0;


   //product: Product | undefined;
   constructor(private productService: ProductService, private route: ActivatedRoute,private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.categoryProducts = [];
        if (this.currentRoute.startsWith('/category/')) {
          this.inCategory= true;
          console.log(this.currentRoute);
          this.products.forEach(product => {
            if (this.currentRoute?.includes(<string>product.categoryName)) {
              this.categoryProducts.push(product);
            }else{
              console.log(this.currentRoute);
              console.log(product)
            }
           
          });
          console.log(this.categoryProducts);
        }else {
          this.inCategory= false;
        }
      }
    });
  }
  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
    console.log(this.currentRoute);
  }

  onSelect(product: Product): void {
    this.selectedProducts = product;
    this.productService.selectedProducts = product;
  }

  showLoader(){
  }
  
  ngOnInit(): void {
    this.getProducts();
  }

  addToShoppingCart(product: any){
    console.log(product);
    this.productService.addProduct(product);
  }

}
