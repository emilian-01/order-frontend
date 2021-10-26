import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../message.service';
import {Product, ProductCategory, ProductForCreate} from './product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  productCategories: ProductCategory[];
  selectedProduct: Product;
  createNewVar: boolean;
  tempCat: ProductCategory;
  selectedCats: [];
  url = 'http://localhost:8000/';
  opts: {};

  public items = [];

  constructor(
    private orderService: OrderService,
    private httpClient: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.opts = {
        headers: new HttpHeaders({
          Authorization : 'token ' + sessionStorage.getItem('token')
        })
      };
      this.getProducts();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getProducts(): void {
    this.httpClient.get<any>(this.url + `product/`, this.opts).subscribe(
      response => {
        this.products = response;
        this.products.sort((a, b) => a.id < b.id ? -1 : a.name > b.name ? 1 : 0);
        console.log(response);
      },
      error => console.log(error));

    this.httpClient.get<any>(this.url + `category/`, this.opts).subscribe(
      response => {
        this.productCategories = response;
        this.productCategories.sort((a, b) => a.id < b.id ? -1 : a.name > b.name ? 1 : 0);
        console.log(response);
      },
      error => console.log(error));
  }

  getCatById(id): string {
    if (this.productCategories) {
      return this.productCategories.find(el => {
        return el.id.toString() === id.toString();
      }).name + ' ';
    }
  }

  deleteProduct(id): void {
    if (confirm('Are you sure to delete?')) {
      const url = `${this.url}product/${id}/`;
      console.log(this.url);
      this.httpClient.delete(url, this.opts).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      location.reload();
    }
  }

  updateProduct(product): void {
    const url = `${this.url}product/${product.id}/`;
    this.httpClient.put(url, this.selectedProduct, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    location.reload();
  }

  onSelect(product): void {
    this.selectedProduct = product;
    // this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  onCreate(): void {
    this.createNewVar = true;
  }

  createProduct(name, dprice, description): void {
    const newProduct = new ProductForCreate(name, dprice, description, this.selectedCats);
    const url = `${this.url}product/`;
    this.httpClient.post(url, newProduct, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    location.reload();
  }
}
