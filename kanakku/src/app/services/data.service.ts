import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FicheroListI } from '../model/ficherolist.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http:HttpClient) { }

  sendPost(body:FormData):Observable<any>{
    return this.http.post(environment.postexcel,body)

  }
  suministroexist(nombre:string){
    let nom=nombre.substring(0,8);
    let resp=this.http.get(environment.url_global+"/clienteslibres/suministro/buscar-suministro/"+nom)
    return resp
     }

     delete(id:number){
      let resp=this.http.delete(environment.url_global+"/clienteslibres/documentos/1/1/eliminar-documentodepulsos/"+id)
      return resp
       }

  getFichero():Observable<FicheroListI[]>{

    return this.http.get<FicheroListI[]>(environment.url_global+"/clienteslibres/documentos/1/1/documentodepulsosbyusuarioidandempresaid")

  }


      customers = [
      {
          id : 1,
          name : "Brian Johnson",
          email : "brianjohnson@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-02.jpg",
          amount_due : "$8295",
          registered_on : "Wed Nov 16 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Active",
          role: "Customer"
      },
      {
          id : 2,
          name : "Marie Canales",
          email : "mariecanales@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-03.jpg",
          amount_due : "$1750",
          registered_on : "Wed May 08 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Inactive",
          role: "Customer"
      },
      {
          id : 3,
          name : "Barbara Moore",
          email : "barbaramoore@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-04.jpg",
          amount_due : "$8295",
          registered_on : "Wed Oct 24 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Active",
          role: "Admin"
      },
      {
          id : 4,
          name : "Greg Lynch",
          email : "greglynch@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-05.jpg",
          amount_due : "$3000",
          registered_on : "Wed Oct 11 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Inctive",
          role: "Customer"
      },
      {
          id: 5,
          name : "Karlene Chaidez",
          email : "karlenechaidez@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-06.jpg",
          amount_due : "-",
          registered_on : "Wed Sep 29 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Inctive",
          role: "Admin"
      },
      {
          id: 6,
          name : "John Blair",
          email : "johnblair@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-07.jpg",
          amount_due : "$50",
          registered_on : "Wed Aug 13 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Active",
          role: "Customer"
      },
      {
          id: 7,
          name : "Russell Copeland",
          email : "russellcopeland@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-08.jpg",
          amount_due : "-",
          registered_on : "Wed Jul 02 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Inctive",
          role: "Customer"
      },
       {
          id: 8,
          name : "Leatha Bailey ",
          email : "leathabailey@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-09.jpg",
          amount_due : "$480",
          registered_on : "Wed Sep 29 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Active",
          role: "Customer"
      },
      {
          id: 9,
          name : "Joseph Collins",
          email : "josephcollins@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-10.jpg",
          amount_due : "$600",
          registered_on : "Wed May 16 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Active",
          role: "Customer"
      },
      {
          id: 10,
          name : "Jennifer Floyd",
          email : "jenniferfloyd@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-11.jpg",
          amount_due : "-",
          registered_on : "Wed Sep 17 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Active",
          role: "Admin"
      },
      {
          id: 11,
          name : "Alex Campbell",
          email : "alexcampbell@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-12.jpg",
          amount_due : "-",
          registered_on : "Wed Mar 30 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Active",
          role: "Customer"
      },
      {
          id: 12,
          name : "Wendell Ward",
          email : "wendellward@example.com",
          phone : "9876543210",
          img : "assets/img/profiles/avatar-13.jpg",
          amount_due : "$7500",
          registered_on : "Wed Mar 22 2020 09:41:48 GMT+0530 (India Standard Time)",
          status : "Active",
          role: "Admin"
      }
  ]

  estimates = [
    {
      id : 1,
      number: 'EST-17ER281',
      customer_name : "Marie Canales",
      customer_img : "assets/img/profiles/avatar-03.jpg",
      estimate_date : "Wed Nov 16 2020 09:41:48 GMT+0530 (India Standard Time)",
      expiry_date : "Wed Nov 22 2020 09:41:48 GMT+0530 (India Standard Time)",
      amount : "$100",
      status : "Accepted",
  },
    {
        id : 2,
        number: 'EST-26AS699',
        customer_name : "Barbara Moore",
        customer_img : "assets/img/profiles/avatar-04.jpg",
        estimate_date : "Wed Nov 5 2020 09:41:48 GMT+0530 (India Standard Time)",
        expiry_date : "Wed Nov 10 2020 09:41:48 GMT+0530 (India Standard Time)",
        amount : "$75",
        status : "Declined",
    },
    {
        id : 3,
        number: 'EST-11KI214',
        customer_name : "Greg Lynch",
        customer_img : "assets/img/profiles/avatar-05.jpg",
        estimate_date : "Wed Nov 1 2020 09:41:48 GMT+0530 (India Standard Time)",
        expiry_date : "Wed Nov 5 2020 09:41:48 GMT+0530 (India Standard Time)",
        amount : "$175",
        status : "Sent",
    },
    {
        id : 4,
        number: 'EST-98HJ687',
        customer_name : "Karlene Chaidez",
        customer_img : "assets/img/profiles/avatar-06.jpg",
        estimate_date : "Wed Nov 12 2020 09:41:48 GMT+0530 (India Standard Time)",
        expiry_date : "Wed Oct 17 2020 09:41:48 GMT+0530 (India Standard Time)",
        amount : "$1500",
        status : "Expired",
    },
    {
        id : 5,
        number: 'EST-71DR001',
        customer_name : "John Blair",
        customer_img : "assets/img/profiles/avatar-07.jpg",
        estimate_date : "Wed Oct 2 2020 09:41:48 GMT+0530 (India Standard Time)",
        expiry_date : "Wed Oct 8 2020 09:41:48 GMT+0530 (India Standard Time)",
        amount : "$1890",
        status : "Accepted",
    },
    {
        id: 6,
        number: 'EST-68MN425',
        customer_name : "Russell Copeland",
        customer_img : "assets/img/profiles/avatar-08.jpg",
        estimate_date : "Wed Oct 2 2020 09:41:48 GMT+0530 (India Standard Time)",
        expiry_date : "Wed Oct 8 2020 09:41:48 GMT+0530 (India Standard Time)",
        amount : "$1890",
        status : "Accepted",
    },
    {
        id: 7,
        number: 'EST-86YU963',
        customer_name : "Leatha Bailey",
        customer_img : "assets/img/profiles/avatar-09.jpg",
        estimate_date : "Wed Sep 25 2020 09:41:48 GMT+0530 (India Standard Time)",
        expiry_date : "Wed Sep 30 2020 09:41:48 GMT+0530 (India Standard Time)",
        amount : "$785",
        status : "Accepted",
    }
]

invoices = [
  {
    id : 1,
    number: 'INV-65ZTE15',
    customer_name : "Barbara Moore",
    customer_img : "assets/img/profiles/avatar-04.jpg",
    created_date : "Wed Nov 16 2020 09:41:48 GMT+0530 (India Standard Time)",
    due_date : "Wed Nov 23 2020 09:41:48 GMT+0530 (India Standard Time)",
    paid_on : "Wed Nov 23 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$100",
    status : "Paid",
  },
  {
    id : 2,
    number: 'INV-65ZTE15',
    customer_name : "Karlene Chaidez",
    customer_img : "assets/img/profiles/avatar-05.jpg",
    created_date : "Wed Nov 14 2020 09:41:48 GMT+0530 (India Standard Time)",
    due_date : "Wed Nov 18 2020 09:41:48 GMT+0530 (India Standard Time)",
    paid_on : "Wed Nov 20 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$222",
    status : "Sent",
  },
  {
    id : 3,
    number: 'INV-65ZTE15',
    customer_name : "Russell Copeland",
    customer_img : "assets/img/profiles/avatar-06.jpg",
    created_date : "Wed Nov 7 2020 09:41:48 GMT+0530 (India Standard Time)",
    due_date : "Wed Nov 10 2020 09:41:48 GMT+0530 (India Standard Time)",
    paid_on : "Wed Nov 13 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$347",
    status : "Partially Paid",
  },
  {
    id : 4,
    number: 'INV-65ZTE15',
    customer_name : "Joseph Collins",
    customer_img : "assets/img/profiles/avatar-07.jpg",
    created_date : "Wed Nov 24 2020 09:41:48 GMT+0530 (India Standard Time)",
    due_date : "Wed Nov 25 2020 09:41:48 GMT+0530 (India Standard Time)",
    paid_on : "Wed Nov 27 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$826",
    status : "Overdue",
  },
  {
    id : 5,
    number: 'INV-65ZTE15',
    customer_name : "Jennifer Floyd",
    customer_img : "assets/img/profiles/avatar-08.jpg",
    created_date : "Wed Nov 17 2020 09:41:48 GMT+0530 (India Standard Time)",
    due_date : "Wed Nov 18 2020 09:41:48 GMT+0530 (India Standard Time)",
    paid_on : "Wed Nov 19 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$826",
    status : "Paid",
  },
]

payments = [
  {
    id : 1,
    ref_id: '#158790',
    customer_name : "Leatha Bailey",
    customer_img : "assets/img/profiles/avatar-09.jpg",
    date : "Wed Sep 17 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$444",
    payment_method : "Visa 9632",
  },
  {
    id : 2,
    ref_id: '#248960',
    customer_name : "Joseph Collins",
    customer_img : "assets/img/profiles/avatar-10.jpg",
    date : "Wed Sep 12 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$657",
    payment_method : "Visa 1254",
  },
  {
    id : 3,
    ref_id: '#368230',
    customer_name : "Marie Canales",
    customer_img : "assets/img/profiles/avatar-03.jpg",
    date : "Wed Nov 17 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$717",
    payment_method : "Visa 4321",
  },
  {
    id : 4,
    ref_id: '#45268',
    customer_name : "Russell Copeland",
    customer_img : "assets/img/profiles/avatar-04.jpg",
    date : "Wed Oct 11 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$120",
    payment_method : "Visa 5689",
  },
  {
    id : 5,
    ref_id: '#542187',
    customer_name : "John Blair",
    customer_img : "assets/img/profiles/avatar-05.jpg",
    date : "Wed Oct 25 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$657",
    payment_method : "Visa 4523",
  },
  {
    id : 6,
    ref_id: '#635489',
    customer_name : "Karlene Chaidez",
    customer_img : "assets/img/profiles/avatar-06.jpg",
    date : "Wed Nov 1 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$698",
    payment_method : "Visa 8795",
  },
  {
    id : 7,
    ref_id: '#875642',
    customer_name : "Greg Lynch",
    customer_img : "assets/img/profiles/avatar-07.jpg",
    date : "Wed Oct 7 2020 09:41:48 GMT+0530 (India Standard Time)",
    amount : "$582",
    payment_method : "	Visa 3654",
  },
]

expenses = [
  {
    id : 1,
    category: 'Advertising',
    customer_name : "Barbara Moore",
    customer_img : "assets/img/profiles/avatar-04.jpg",
    expense_date : "Wed Sep 15 2020 09:41:48 GMT+0530 (India Standard Time)",
    notes: "Lorem ipsum dollar..",
    amount : "$145",
    status : "Approved",
  },
  {
    id : 2,
    category: 'Food',
    customer_name : "Russell Copeland",
    customer_img : "assets/img/profiles/avatar-05.jpg",
    expense_date : "Wed Sep 19 2020 09:41:48 GMT+0530 (India Standard Time)",
    notes: "Lorem ipsum dollar..",
    amount : "$214",
    status : "Pending",
  },
  {
    id : 3,
    category: 'Marketing',
    customer_name : "Brian Johnson",
    customer_img : "assets/img/profiles/avatar-06.jpg",
    expense_date : "Wed Nov 11 2020 09:41:48 GMT+0530 (India Standard Time)",
    notes: "Lorem ipsum dollar..",
    amount : "$254",
    status : "Pending",
  },
  {
    id : 4,
    category: 'Repairs',
    customer_name : "Marie Canales",
    customer_img : "assets/img/profiles/avatar-08.jpg",
    expense_date : "Wed Oct 3 2020 09:41:48 GMT+0530 (India Standard Time)",
    notes: "Lorem ipsum dollar..",
    amount : "$60",
    status : "Approved",
  },
  {
    id : 5,
    category: 'Software',
    customer_name : "Greg Lynch",
    customer_img : "assets/img/profiles/avatar-09.jpg",
    expense_date : "Wed Oct 23 2020 09:41:48 GMT+0530 (India Standard Time)",
    notes: "Lorem ipsum dollar..",
    amount : "$145",
    status : "Approved",
  },
  {
    id : 6,
    category: 'Stationary',
    customer_name : "John Blair",
    customer_img : "assets/img/profiles/avatar-10.jpg",
    expense_date : "Wed Sep 29 2020 09:41:48 GMT+0530 (India Standard Time)",
    notes: "Lorem ipsum dollar..",
    amount : "$154",
    status : "Pending",
  },
  {
    id : 7,
    category: 'Travel',
    customer_name : "Karlene Chaidez",
    customer_img : "assets/img/profiles/avatar-11.jpg",
    expense_date : "Wed Oct 9 2020 09:41:48 GMT+0530 (India Standard Time)",
    notes: "Lorem ipsum dollar..",
    amount : "$75",
    status : "Approved",
  },
];
blogs = [
  {
    id : 1,
    imgs:"assets/img/category/blog-1.jpg",
    eyes:"225",
    img2:"assets/img/profiles/avatar-12.jpg",
    names:"Alex Campbell",
    date:"4 Dec 2022",
    para:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    para2:"Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor."
  },
  {
    id : 2,
    imgs:"assets/img/category/blog-2.jpg",
    eyes:"132",
    img2:"assets/img/profiles/avatar-04.jpg",
    names:"Barbara Moore",
    date:"5 Dec 2022",
    para:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    para2:"Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor."
  },
  {
    id : 3,
    imgs:"assets/img/category/blog-3.jpg",
    eyes:"855",
    img2:"assets/img/profiles/avatar-04.jpg",
    names:"Brian Johnson",
    date:"4 Aug 2022",
    para:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    para2:"Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor."
  },
  {
    id : 4,
    imgs:"assets/img/category/blog-4.jpg",
    eyes:"555",
    img2:"assets/img/profiles/avatar-05.jpg",
    names:"Greg Lynch",
    date:"4 Dec 2022",
    para:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    para2:"Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor."
  },
  {
    id : 5,
    imgs:"assets/img/category/blog-5.jpg",
    eyes:"755",
    img2:"assets/img/profiles/avatar-11.jpg",
    names:"Jennifer Floyd",
    date:"11 Sep 2022",
    para:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    para2:"Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor."
  },
  {
    id : 6,
    imgs:"assets/img/category/blog-6.jpg",
    eyes:"85",
    img2:"assets/img/profiles/avatar-06.jpg",
    names:"Karlene Chaidez",
    date:"4 Dec 2022",
    para:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    para2:"Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor."
  },
]
public ManageUsers: BehaviorSubject<any> = new BehaviorSubject(this.blogs);


    // return {
    //   customers: customers,
    //   estimates: estimates,
    //   invoices: invoices,
    //   payments: payments,
    //   expenses: expenses,
    // };

}
