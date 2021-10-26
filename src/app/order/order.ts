export interface Order {
  id: number;
  code: number;
  code_year: number;
  date_registered: string;
  customer: number;
  creator: number;
}
export class OUnits {
  id: number;
  amount: number;
  price: number;
  order: number;
  product: number;
}

export class ProductCategory {
  id: number;
  name: string;
}

export class OrderForCreate {
  code: number;
  // tslint:disable-next-line:variable-name
  code_year: number;
  // tslint:disable-next-line:variable-name
  date_registered: Date;
  customer: number;
  creator: number;

  // tslint:disable-next-line:variable-name
  public constructor(code: number, code_year: number, date_registered: Date, creator: number) {
    this.code = code;
    this.code_year = code_year;
    this.date_registered = date_registered;
    // this.customer = customer;
    this.creator = creator;
  }
}

export class Counter {
  name = 'counter';
  value = 0;

  public constructor(value: number) {
    this.value = value;
  }
}

export class OrderUnits {
  id: number;
  amount: number;
  price: number;
  order: number;
  product: number;

  constructor(order: number) {
    this.order = order;
  }

  toString(): void {
    if (this.amount && this.price && this.order && this.product) {
      console.log(this.amount, this.price, this.order, this.product);
    }
  }

  // public constructor(amount: number, price: number, order: number, product: number) {
  //   this.amount = amount;
  //   this.price = price;
  //   this.order = order;
  //   this.product = product;
  // }
}
