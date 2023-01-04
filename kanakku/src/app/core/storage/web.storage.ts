import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginI } from 'src/app/model/login.interface';
import { ResponseI } from 'src/app/model/reponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebStorage {
  public Loginvalue = new BehaviorSubject<any>(0);
  public Createaccountvalue = new BehaviorSubject<any>(0);
  public Forgotpasswordvalue = new BehaviorSubject<any>(0);
url:string=environment.url_global+"/clienteslibres/usuarios/verificar-usuario"

  constructor(private router: Router,private http:HttpClient) {}
 
  /**
   * Create account Function call from Registerpage
   * @param uservalue from user form value
   */
  public Createaccount(uservalue: any): void {
    let Rawdata:any = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult: any = Pdata.find(({ email }:any) => email === uservalue.email);
      if (Eresult) {
        this.Createaccountvalue.next('This email are already exist');
      } else {
        Pdata.push(uservalue);
        const jsonData = JSON.stringify(Pdata);
        localStorage.setItem('Loginusers', jsonData);
    //    this.Login(uservalue);
      }
  }


    loginby(form:loginI):Observable<ResponseI>{

      let direccion = this.url //+ "auth"  
       return this.http.post<ResponseI>(direccion,form); 
          }

    NombrebyLogin(user:string,pass:string):Observable<loginI>{
        let direccion = "http://localhost:8080/clienteslibres/usuarios/nombre/"+user+"/"+pass;
        return this.http.get<loginI>(direccion); 
         }
    
  

  
  public Createtoken(form:loginI) {
    var result = 'ABCDEFGHI' + form.usuarioLogin + 'ghijklmnopqrs' + 'z01234567';
    localStorage.setItem('LoginData', result);
  }

  /**
   * Two Storage are used
   */
  public Deleteuser() {
    localStorage.removeItem('Loginusers');
    localStorage.removeItem('LoginData');
  }

  /**
   * called from Login page init statement
   */
  public Checkuser(): void {
    let users = localStorage.getItem('Loginusers');
    if (users === null) {
      let password = [
        {
          email: 'admin@dreamguys.in',
          password: '123456',
        },
      ];
      const jsonData = JSON.stringify(password);
      localStorage.setItem('Loginusers', jsonData);
    }
  }

  /**
   * Forgot password function
   * @param uservalue email object recived from Forgot password
   */
  public Forgotpassword(uservalue:any): void {
    let Rawdata:any = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult = Pdata.find(({ email }:any) => email === uservalue.email);
    if (Eresult) {
      this.Forgotpasswordvalue.next(Eresult);
    } else {
      this.Forgotpasswordvalue.next('Email Not Valid');
    }
  }
}
