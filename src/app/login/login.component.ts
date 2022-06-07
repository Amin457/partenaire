import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Partenaire } from '../models/partenaire_model';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form1!: FormGroup;
  @ViewChild('add', { static: false }) myModal1!: ElementRef;
  elm1!: HTMLElement;
  
  nomAdd!: string;
  telAdd!: string;
  mailAdd!: string;
  faxAdd!: string;
  codePostalAdd!: any;
  mdpAdd!: string;
  selectedFileAdd: any;
  fileAdd: any;
  partenaireAdd: Partenaire = new Partenaire();

  constructor( private LoginService:LoginService, private router:Router) {
    this.initForm();
   }
   ngAfterViewInit(): void {
    this.elm1 = this.myModal1.nativeElement as HTMLElement;

  }
  ngOnInit(): void {

  }
  onFileSelectedAdd(event: any) {
    this.fileAdd = event.target.files[0];
  }
  close1(): void {
    this.elm1.classList.remove('show');
    setTimeout(() => {
      this.elm1.style.width = '0';
    }, 75);
  }
  open1(): void {
    this.elm1.classList.add('show');
    this.elm1.style.width = '100vw';
  }

  AddPartenaire(){
    this.partenaireAdd.Fax=this.faxAdd;
    this.partenaireAdd.codePostal=this.codePostalAdd;
    this.partenaireAdd.mail=this.mailAdd;
    this.partenaireAdd.mdp=this.mdpAdd;
    this.partenaireAdd.societe=this.nomAdd;
    this.partenaireAdd.tel=this.telAdd;
    console.log(this.partenaireAdd)
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
        this.router.navigate(['dashboard/home']);
        return false;
      }
      },
      error => {
        
      });
  }
}
