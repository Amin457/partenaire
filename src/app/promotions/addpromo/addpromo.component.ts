import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Partenaire } from 'src/app/models/partenaire_model';
import { Promo } from 'src/app/models/promotion-model';
import { FilesService } from 'src/app/services/files.service';
import { PromotionService } from 'src/app/services/promotion.service';
import jwt_decode  from 'jwt-decode';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-addpromo',
  templateUrl: './addpromo.component.html',
  styleUrls: ['./addpromo.component.css']
})
export class AddpromoComponent implements OnInit {

  selectedFile:any;
  name!: string;
  description!: string;
  dateDebut1!:string;
  dateFin1!:string;
  dateDebut!: any;
  dateFin!: any;
  obj:Promo=new Promo();
  partenaire!:Partenaire;
  token !: any;
  decoded: any;
  constructor(private service:PromotionService, private form:FormBuilder, private fileservice:FilesService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire=this.decoded.result;
    console.log(this.partenaire);
  }
  onFileSelected(event:any){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.selectedFile=file;
    }
    
  }

  onUpload(){
    this.dateDebut = new DatePipe('en-US').transform(this.dateDebut1, 'yyyy-MM-dd');
    this.dateFin = new DatePipe('en-US').transform(this.dateFin1, 'yyyy-MM-dd');
    const promo= new Promo();
    const formData = new FormData();
    formData.append('file',this.selectedFile);
    this.fileservice.postFile(formData).subscribe(data=>{
      console.log(data,'image');
    promo.nom=this.name;
    promo.description=this.description;
    promo.image=data.imgUrl;
    promo.id_part=this.partenaire.id_part;
    console.log(this.partenaire.id_part,'tokkkeeen');

    promo.dateDebut=this.dateDebut;
    
    promo.dateFin=this.dateFin;
    this.service.Ajouter(promo).subscribe(data=>{
      console.log('it works',data);
    })
    })
    

  }
  ajouter(f:NgForm){

  }
  

  
}
