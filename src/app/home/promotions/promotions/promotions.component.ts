import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Promo } from '../../../models/promotion-model';
import { PromoPipe } from '../../../pipes/promo.pipe';
import { PromotionService } from '../../../services/promotion.service';
import jwt_decode from 'jwt-decode';
import { Partenaire } from '../../../models/partenaire_model';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FilesService } from '../../../services/files.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  @ViewChild('Edit', { static: false }) myModal!: ElementRef;
  elm!: HTMLElement;
  @ViewChild('add', { static: false }) myModal1!: ElementRef;
  elm1!: HTMLElement;
  Search ='';
  ApiImg = environment.Api + "api/files/get/"
  promotions: Promo[] = [];
  promoUpdated: Promo = new Promo();
  partenaire!: Partenaire;
  token !: any;
  decoded: any;
  selectedFile: any;
  name!: string;
  url!: string;
  dateDebut1!: any;
  dateFin1!: any;
  dateDebut!: any;
  dateFin!: any;
  image!: string;
  constructor(private fileservice: FilesService, private service: PromotionService) { }
  ngAfterViewInit(): void {
    this.elm = this.myModal.nativeElement as HTMLElement;
    this.elm1 = this.myModal1.nativeElement as HTMLElement;

  }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire = this.decoded.result;
    console.log(this.partenaire);

    this.service.Getall(this.partenaire.id_part).subscribe(res => {
      this.promotions = res.data;
    })


  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }

  }
  deletepromo(id_promo: number) {

    Swal.fire({
      title: 'vous etes sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YES !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletepromo(id_promo).subscribe(res => {

          this.token = localStorage.getItem('token');
          this.decoded = jwt_decode(this.token);
          this.partenaire = this.decoded.result;
          console.log(this.partenaire);
    
          this.service.Getall(this.partenaire.id_part).subscribe(res => {
            this.promotions = res.data;
            Swal.fire({
              icon: 'success',
              title: 'promotion supprimé',
              showConfirmButton: false,
              timer: 1500
            })
          })
    
        })
      }
    })


    

  }


  close(): void {
    this.elm.classList.remove('show');
    setTimeout(() => {
      this.elm.style.width = '0';
    }, 75);
  }
  close1(): void {
    this.elm1.classList.remove('show');
    setTimeout(() => {
      this.elm1.style.width = '0';
    }, 75);

    this.token = localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire = this.decoded.result;
    console.log(this.partenaire);

    this.service.Getall(this.partenaire.id_part).subscribe(res => {
      this.promotions = res.data;
    })
  }

  open(id_promo: number): void {
    this.elm.classList.add('show');
    this.elm.style.width = '100vw';
    this.promoUpdated.id_promo = id_promo;
    this.service.getPromoById(id_promo).subscribe(res => {
      this.dateDebut1 =this.date(new Date(res.data.date_debut));
      this.dateFin1 = this.date(new Date(res.data.date_fin));
      this.name = res.data.nom;
      this.url = res.data.url;
      this.image = res.data.image;
      this.promoUpdated.id_promo = id_promo;

    })
  }
  open1(): void {
    this.elm1.classList.add('show');
    this.elm1.style.width = '100vw';
  }
  onUpload() {
    this.dateDebut = new DatePipe('en-US').transform(this.dateDebut1, 'yyyy-MM-dd');
    this.dateFin = new DatePipe('en-US').transform(this.dateFin1, 'yyyy-MM-dd');
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.promoUpdated.id_part = this.partenaire.id_part;
    if (this.name == undefined || this.url == undefined || this.dateDebut == undefined || this.dateFin == undefined) {
      Swal.fire({
        title: 'Error!',
        text: 'vérfier les champs',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    } else if (this.selectedFile == undefined) {
      this.promoUpdated.image = this.image;
      this.promoUpdated.dateDebut = this.dateDebut;
      this.promoUpdated.dateFin = this.dateFin;
      this.promoUpdated.nom = this.name;
      this.promoUpdated.url = this.url;
      console.log(this.promoUpdated);
      this.service.updatePromo(this.promoUpdated).subscribe(res => {
        console.log('it works', res);
        Swal.fire({
          icon: 'success',
          title: 'promotion modifié avec succée',
          showConfirmButton: false,
          timer: 1500
        })
        this.service.Getall(this.partenaire.id_part).subscribe(res => {
          this.promotions = res.data;
        })
      })

    } else {
      this.fileservice.postFile(formData).subscribe(res => {
        this.promoUpdated.image = res.data
        this.promoUpdated.dateDebut = this.dateDebut;
        this.promoUpdated.dateFin = this.dateFin;
        this.promoUpdated.nom = this.name;
        this.promoUpdated.url = this.url;
        this.service.updatePromo(this.promoUpdated).subscribe(res => {

          this.token = localStorage.getItem('token');
          this.decoded = jwt_decode(this.token);
          this.partenaire = this.decoded.result;
          console.log(this.partenaire);

          this.service.Getall(this.partenaire.id_part).subscribe(res => {
            this.promotions = res.data;
          })
          Swal.fire({
            icon: 'success',
            title: 'promotion modifié avec succée',
            showConfirmButton: false,
            timer: 1500
          })
          this.close();
          this.service.Getall(this.partenaire.id_part).subscribe(res => {
            this.promotions = res.data;
          })
        })

      })
    }
  }

  date(date1 : Date) {
    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date1,'yyyy-MM-dd');
  }
}

