import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WebStorage } from 'src/app/core/storage/web.storage';
import { loginI } from 'src/app/model/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public Toggledata=true;
  public CustomControler:any
  public subscription: Subscription;
  public Loginvalue = new BehaviorSubject<any>(0);

  
  form = new FormGroup({
    usuarioLogin: new FormControl("", [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage ,private router: Router) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if(data != 0){
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.storage.Checkuser();
  }
  public Createtoken(form:loginI) {
    var result = 'ABCDEFGHI' + form.usuario + 'ghijklmnopqrs' + 'z01234567';
    localStorage.setItem('LoginData', result);
  }
  submit(form) {

    this.storage.loginby(form).subscribe(data =>{
      console.log(data);
      if(Boolean(data)==true){
       
           this.router.navigate(['/index']);
      this.Createtoken(form);
      }else {
        document.querySelector(".log_rch").innerHTML = "* Usuario o contraseña incorrectos."
        


      }
  })
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  iconLogle(){
    this.Toggledata = !this.Toggledata
  }
}
