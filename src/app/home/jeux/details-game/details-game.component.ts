import { Component, AfterViewInit} from '@angular/core';
import { Cadeaux } from '../../../models/tab-cadeaux-model';
import { JeuxCadeauxService } from '../../../services/jeux-cadeaux.service';
import { Addcadeau } from '../../../models/add-cadeau-model';
import { Partenaire } from '../../../models/partenaire_model';
import jwt_decode  from 'jwt-decode';
import { Gagnants } from '../../../models/gagnants';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent implements AfterViewInit {

  
  clicked=false;
  cadeaux:Cadeaux[]=[];
  gagnants:Gagnants[]=[];
  addCadeaux:Addcadeau = new Addcadeau();
  id_cadeau!:number;
  description!:string;
  quantity!:number;
  partenaire!:Partenaire
  token !: any
  decoded: any;
  etat!:string;
  constructor(private service: JeuxCadeauxService) { }


  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire=this.decoded.result;
    console.log(this.partenaire);

    this.service.GetCadeaux(this.partenaire.id_part).subscribe(res=>{
      console.log(res);
      this.cadeaux=res.data;
      console.log('tableau cadeaux',this.cadeaux);
    })


    this.service.getGagnants(this.partenaire.id_part).subscribe(res=>{
      console.log(res);
      this.gagnants=res.results;
      console.log('this.gagnants',this.gagnants);
    })
    
    this.service.getEtatJeux(this.partenaire.id_part).subscribe(res=>{
      if(res.data.etat_jeu==1){
        this.etat="Activé"
      }else{
        this.etat="désactivé"

      }
  
    })
    

  }

  onaddclick(){
    this.clicked=!this.clicked;
  }

 

  addCadeau(){
    console.log(this.id_cadeau,this.description,this.quantity);
    this.addCadeaux.id_part=this.partenaire.id_part;
    this.addCadeaux.description=this.description;
    this.addCadeaux.quantity=this.quantity;
    console.log(this.addCadeaux);
    this.service.addCadeau(this.addCadeaux).subscribe(res=>{
      console.log(res);
      this.service.GetCadeaux(this.partenaire.id_part).subscribe(res=>{
        this.cadeaux=res.data;
      })
    })
  }

  deleteCadeau(id_cadeau:number){
    this.service.DeleteCadeau(id_cadeau).subscribe(res=>{
      console.log(res);
      this.service.GetCadeaux(this.partenaire.id_part).subscribe(res=>{
        this.cadeaux=res.data;
      })
    })
    
  }

  updateEtat(){
    if((this.cadeaux==undefined)||(this.cadeaux.length<2)){
      Swal.fire({
        title: 'Error!',
        text: 'ajouter au minimum trois cadeaux',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    }else{
      this.service.updateEtatJeux(this.partenaire.id_part).subscribe(res=>{ 

        this.service.getEtatJeux(this.partenaire.id_part).subscribe(res=>{
          if(res.data.etat_jeu==1){
            this.etat="Activé"
          }else{
            this.etat="désactivé"
    
          }
      
        })
  
      }) 
    }
  }

  date(date1 : Date) {

    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(new Date(date1),'yyyy-MM-dd');
  }
}


