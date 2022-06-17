import { Component, OnInit } from '@angular/core';
import { Partenaire } from '../models/partenaire_model';
import jwt_decode  from 'jwt-decode';
import { ProfilService } from '../services/profil.service';
import { environment } from 'src/environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  //formGroup
  form!: FormGroup;

  partenaire!:Partenaire
  token !: any
  decoded: any;

  nom!:string;
  tel!:string;
  mail!:string;
  fax!:string;
  codePostal!:any;
  mdp!:string;
  id_part!:number;

  partenaireUpdated:Partenaire = new Partenaire();

  ApiImg= environment.Api +"api/files/get/";


  file: any;
  selectedFile:any;
  constructor(private service:ProfilService,private fileservice:FilesService) {
    this.initForm();
   }

   initForm() {
    this.token=localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire=this.decoded.result;
    console.log(this.partenaire);
  
    this.form = new FormGroup({
      nom: new FormControl(this.partenaire.societe, {validators: [Validators.required]}),
      fax: new FormControl(this.partenaire.Fax, {validators: [Validators.required, Validators.minLength(8)]}),
      tel: new FormControl(this.partenaire.tel, {validators: [Validators.required, Validators.minLength(8)]}),
      codePostal: new FormControl(this.partenaire.codePostal, {validators: [Validators.required, Validators.minLength(4)]}),
      mail: new FormControl(this.partenaire.mail, {validators: [Validators.required, Validators.email]}),
      mdp: new FormControl(this.partenaire.mdp, {validators: [Validators.required, Validators.minLength(8)]}),
    });
  }

  ngOnInit(): void {

    this.token=localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    
    this.service.getPartenaireById(this.decoded.result.id_part).subscribe(res=>{
      this.partenaire=res.data[0];
      console.log("ggggggggggggg",this.partenaire);

      
    })
    this.nom=this.partenaire.societe;
    this.fax=this.partenaire.Fax;
    this.tel=this.partenaire.tel;
    this.codePostal=this.partenaire.codePostal;
    this.mail=this.partenaire.mail;
    this.mdp=this.partenaire.mdp;
    

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.selectedFile=this.file;

  }
  Update(){
    const formData = new FormData();
    formData.append('file',this.selectedFile);
    if(this.form.value.mdp.length<8||this.form.value.nom.length<3||this.form.value.mail.length<5||this.form.value.codePostal.length<4||this.form.value.tel.length<8||this.form.value.fax.length<8){
      Swal.fire({
        title: 'Error!',
        text: 'vérfier les champs',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    }else if(this.file==undefined){
      this.partenaireUpdated.id_part=this.partenaire.id_part;
      this.partenaireUpdated.societe=this.form.value.nom;
      this.partenaireUpdated.Fax=this.form.value.fax;
      this.partenaireUpdated.tel=this.form.value.tel;
      this.partenaireUpdated.codePostal=this.form.value.codePostal;
      this.partenaireUpdated.mail=this.form.value.mail;
      this.partenaireUpdated.mdp=this.form.value.mdp;
    
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
    this.partenaireUpdated.societe=this.form.value.nom;
    this.partenaireUpdated.Fax=this.form.value.fax;
    this.partenaireUpdated.tel=this.form.value.tel;
    this.partenaireUpdated.codePostal=this.form.value.codePostal;
    this.partenaireUpdated.mail=this.form.value.mail;
    this.partenaireUpdated.mdp=this.form.value.mdp;
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
          })      }
        
      })
    })
    
  }
  }

  }
