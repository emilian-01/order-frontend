export interface Product {
  id: number;
  name: string;
  default_price: number;
  description: string;
  product_category: [];
  catString: string;
}

export class ProductCategory {
  id: number;
  name: string;

}

export class ProductForCreate {
  name: string;
  // tslint:disable-next-line:variable-name
  default_price: number;
  description: string;
  // tslint:disable-next-line:variable-name
  product_category: [];

  public constructor(name: string, dprice: number, description: string, prodCat: []) {
    this.name = name;
    this.default_price = dprice;
    this.description = description;
    this.product_category = prodCat;
    console.log('all good');
  }
}
