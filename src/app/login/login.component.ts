import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Partenaire } from '../models/partenaire_model';
import { FilesService } from '../services/files.service';
import { LoginService } from '../services/login.service';

import { emailValidator } from './email-validator.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword: boolean=false;
  reactiveForm!: FormGroup;
  user: Partenaire = new Partenaire();

  form1!: FormGroup;
  @ViewChild('add', { static: false }) myModal1!: ElementRef;
  elm1!: HTMLElement;
  
  nomAdd!: string;
  telAdd!: string;
  mailAdd!: string;
  faxAdd!: string;
  codePostalAdd!: any;
  mdpAdd!: string;
  fileAdd: any;
  selectedFile:any;

  partenaireAdd: Partenaire = new Partenaire();

  constructor( private LoginService:LoginService, private router:Router,private fileservice:FilesService) {
    this.initForm();
   }
   ngAfterViewInit(): void {
    this.elm1 = this.myModal1.nativeElement as HTMLElement;

  }
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      societe: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ]),
      mail: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator(),
      ]),
      mdp: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      codePostal: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6),
      ]),
      tel: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10)
        ]),
      img: new FormControl("", [
        Validators.required,
      ]),
      Fax: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ])
    });
  }

  get Fax() {
    return this.reactiveForm.get('Fax')!;
  }

  get img() {
    return this.reactiveForm.get('img')!;
  }

  get tel(){
    return this.reactiveForm.get('tel')!;

  }
  get societe() {
    return this.reactiveForm.get('societe')!;
  }

  get mail() {
    return this.reactiveForm.get('mail')!;
  }

  get mdp() {
    return this.reactiveForm.get('mdp')!;
  }

  get codePostal(){
    return this.reactiveForm.get('codePostal')!;

  }

  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    const formData = new FormData();
    formData.append('file',this.selectedFile);

    this.fileservice.postFile(formData).subscribe(res=>{
      this.user = this.reactiveForm.value;
      this.user.img=res.data;
    console.info('Name:', this.user);
      this.LoginService.demandePartenariat(this.user).subscribe(  
        (res)  => {
            console.log(res);
              
        Swal.fire({
          icon: 'success',
          title: 'demande partnariat ajouté avec succés',
          showConfirmButton: false,
          timer: 1500
        })
        this.close1();
        },
        error => {
          
        });
    
      })
 

  }

  onFileSelectedAdd(event: any) {
    this.fileAdd = event.target.files[0];
    this.selectedFile=this.fileAdd;

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
          Swal.fire('invalide', 'Vérifier vos données', 'error');

        return false;
      }else{
        localStorage.setItem('token',res.token);
        this.router.navigate(['home/']);
        return false;
      }
      },
      error => {
        Swal.fire('invalide', 'Vérifier vos données', 'error');

      });
  }
}
