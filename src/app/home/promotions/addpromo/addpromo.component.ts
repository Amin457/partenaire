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
import Swal from 'sweetalert2'
import { NotificationService } from 'src/app/services/notification.service';
import { Notif } from 'src/app/models/notif';


@Component({
  selector: 'app-addpromo',
  templateUrl: './addpromo.component.html',
  styleUrls: ['./addpromo.component.css']
})
export class AddpromoComponent implements OnInit {

  selectedFile:any;
  name!: string;
  url!: string;
  dateDebut1!:string;
  dateFin1!:string;
  dateDebut!: any;
  dateFin!: any;
  promo:Promo=new Promo();
  partenaire!:Partenaire;
  token !: any;
  decoded: any;
  Notif:Notif = new Notif();
  constructor(private notificationService : NotificationService,private service:PromotionService, private form:FormBuilder, private fileservice:FilesService) { }

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
    const formData = new FormData();
    formData.append('file',this.selectedFile);

    if(this.selectedFile==undefined||this.name==undefined||this.url==undefined||this.dateDebut==undefined||this.dateFin==undefined)
    {
      Swal.fire({
        title: 'Error!',
        text: 'vérfier les champs',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    }else{

        this.fileservice.postFile(formData).subscribe(res=>{
        this.promo.image=res.data;
        this.promo.nom=this.name;
        this.promo.url=this.url;
       
        this.promo.id_part=this.partenaire.id_part;
    
        this.promo.dateDebut=this.dateDebut;
        
        this.promo.dateFin=this.dateFin;
        console.log(this.promo,'tokkkeeen');

        this.service.Ajouter(this.promo).subscribe(data=>{
          console.log('it works',data);
          this.Notif.title="nouvelle promotion !!"
          this.Notif.body=this.partenaire.societe + " a ajouté une nouvelle promotion de " + this.dateDebut + " a " +this.dateFin; 
          this.notificationService.send(this.Notif).subscribe(res=>{
          console.log(res);
          })
          Swal.fire({
            title: 'success',
            text: 'promotion ajouté avec succée',
            icon: 'success',
            confirmButtonText: 'ok'
          })
        })
      
        })
    }
   
    

  }
  ajouter(f:NgForm){

  }
  

  
}
