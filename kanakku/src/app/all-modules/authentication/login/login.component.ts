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
  public loading:boolean;
  public loader_general: boolean;


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
    this.loader_general = true;
  }

  ngOnInit() {
    this.storage.Checkuser();
    setTimeout(() => {
      this.loader_general = false;
    }, 1000);
  }
  public Createtoken(form:loginI) {
    var result = 'ABCDEFGHI' + form.usuarioLogin + 'ghijklmnopqrs' + 'z01234567';
    localStorage.setItem('LoginData', result);


  }

  submit(form) {
    this.loading = true;
    localStorage.setItem("usuario",form.usuarioLogin)
    localStorage.setItem("password",form.password)

    this.storage.loginby(form).subscribe(data =>{
      this.loading = false;
      if(Boolean(data)==true){
           this.router.navigate(['/index']);

      this.Createtoken(form);
      }else {
        document.querySelector(".log_rch").innerHTML = "* Usuario o contraseña incorrectos."
        this.loading = false;

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
