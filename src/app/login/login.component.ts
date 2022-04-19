import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form1!: FormGroup;
  
  

  constructor( private LoginService:LoginService, private router:Router) {
    this.initForm();
   }

  ngOnInit(): void {
  
  }

 

  initForm() {
    this.form1 = new FormGroup({
      mail: new FormControl('',
        {validators: [Validators.required, Validators.email]}
      ),
      mdp: new FormControl('',
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }

  login(){
    if(this.form1.valid) {
      this.form1.markAllAsTouched();
    }
    this.LoginService.login(this.form1.value).subscribe(  
      (res)  => {
        if(res.unauthorised===true){
          console.log(res);
        return false;
      }else{
        localStorage.setItem('token',res.token);
        this.router.navigate(['dashboard']);
        return false;
      }
      },
      error => {
        
      });
  }
}
