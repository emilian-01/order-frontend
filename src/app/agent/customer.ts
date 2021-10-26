export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
}

export class CustomerForCreate {
  // tslint:disable-next-line:variable-name
  first_name: string;
  // tslint:disable-next-line:variable-name
  last_name: string;
  // tslint:disable-next-line:variable-name
  company_name: string;

  public constructor(fname: string, lname: string, cname: string) {
    this.first_name = fname;
    this.last_name = lname;
    this.company_name = cname;
  }


}

// url = 'http://echo.jsontest.com/key/value/one/two';
// url = 'http://localhost:8000/category';
// url = 'http://newlanguage.ga/file.json';
// url = 'https://brave-newton-26c41a.netlify.app/file.json';


// coments fo getCustomers

// this.httpClient.get(this.url).toPromise().then(
//   data => {
//     console.log(data);
//
//     for (const k in data) {
//       if (data.hasOwnProperty(k)) {
//         this.items.push(data[k]);
//       }
//     }
//   });

// this.orderService.getCustomers()
//   .subscribe(customers => this.customers = customers);


