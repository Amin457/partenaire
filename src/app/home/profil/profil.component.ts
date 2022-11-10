import { Component, OnInit } from '@angular/core';
import { Partenaire } from '../../models/partenaire_model';
import jwt_decode  from 'jwt-decode';
import { ProfilService } from '../../services/profil.service';
import { environment } from 'src/environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { FilesService } from '../../services/files.service';
import { emailValidator } from '../../home/profil/email-validator.directive';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  showPassword: boolean=false;
  reactiveForm!: FormGroup;
  //formGroup
  form!: FormGroup;

  partenaire!:Partenaire
  token !: any
  decoded: any;


  partenaireUpdated:Partenaire = new Partenaire();

  ApiImg= environment.Api +"api/files/get/";


  file: any;
  selectedFile:any;
  constructor(private service:ProfilService,private fileservice:FilesService) {
   
   }

   initForm() {
    this.token=localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.service.getPartenaireById(this.decoded.result.id_part).subscribe(res=>{
      this.partenaire=res.data[0];
      console.log("ggggggggggggg",this.partenaire);
      this.reactiveForm = new FormGroup({
        id_part: new FormControl(this.partenaire.id_part, [
          Validators.required,
        ]),
        societe: new FormControl(this.partenaire.societe, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ]),
        mail: new FormControl(this.partenaire.mail, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
          emailValidator(),
        ]),
        mdp: new FormControl(this.partenaire.mdp, [
          Validators.required,
          Validators.minLength(8),
        ]),
        codePostal: new FormControl(this.partenaire.codePostal, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(6),
        ]),
        tel: new FormControl(this.partenaire.tel, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10)
          ]),
        img: new FormControl(this.partenaire.img, [
          Validators.required,
        ]),
        Fax: new FormControl(this.partenaire.Fax, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ])
      });
    })
  
   
  }

  ngOnInit(): void {
    this.initForm();
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

  get id_part(){
    return this.reactiveForm.get('id_part')!;

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.selectedFile=this.file;

  }

  validate(){
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    console.log(this.reactiveForm.value);
    const formData = new FormData();
    formData.append('file',this.selectedFile);
    if(this.file==undefined){
      this.partenaireUpdated.id_part=this.reactiveForm.value.id_part;
      this.partenaireUpdated.societe=this.reactiveForm.value.societe;
      this.partenaireUpdated.Fax=this.reactiveForm.value.Fax;
      this.partenaireUpdated.tel=this.reactiveForm.value.tel;
      this.partenaireUpdated.codePostal=this.reactiveForm.value.codePostal;
      this.partenaireUpdated.mail=this.reactiveForm.value.mail;
      this.partenaireUpdated.mdp=this.reactiveForm.value.mdp;
      this.partenaireUpdated.img=this.partenaire.img;
        this.service.UpdateProfil(this.partenaireUpdated).subscribe(res=>{
          console.log(res);
          this.service.getPartenaireById(this.partenaire.id_part).subscribe(res=>{
            this.partenaire=res.data[0];
          })
              Swal.fire({
              icon: 'success',
              title: 'Votre profil est mise à jour avec succés',
              showConfirmButton: false,
              timer: 1500
            })
  
          
        })

    }else{
      this.partenaireUpdated.id_part=this.partenaire.id_part;
      this.partenaireUpdated.societe=this.reactiveForm.value.societe;
      this.partenaireUpdated.Fax=this.reactiveForm.value.Fax;
      this.partenaireUpdated.tel=this.reactiveForm.value.tel;
      this.partenaireUpdated.codePostal=this.reactiveForm.value.codePostal;
      this.partenaireUpdated.mail=this.reactiveForm.value.mail;
      this.partenaireUpdated.mdp=this.reactiveForm.value.mdp;
    console.log(this.partenaireUpdated);
    this.fileservice.postFile(formData).subscribe(res=>{
    this.partenaireUpdated.img=res.data;
      this.service.UpdateProfil(this.partenaireUpdated).subscribe(res=>{
        console.log(res);
        this.service.getPartenaireById(this.partenaire.id_part).subscribe(res=>{
          this.partenaire=res.data[0];
        })
        if(res.success==1){
            Swal.fire({
            icon: 'success',
            title: 'Votre profil est mise à jour avec succés',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          Swal.fire({
            title: 'Error!',
            text: 'vérfier les champs',
            icon: 'error',
            confirmButtonText: 'ok'
          })}
        
      })
    })
    
  }

  }
  

  }
