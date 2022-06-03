import { Component, OnInit } from '@angular/core';
import { AddQuestion } from '../models/add-question-model';
import jwt_decode from 'jwt-decode';
import { Partenaire } from '../models/partenaire_model';
import { FeedbackService } from '../services/feedback.service';
import { AddReponse } from '../models/add-reponse-model';
import { Question } from '../models/question-model';
import { Reponse } from '../models/reponse-model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-gerer-feedbacks',
  templateUrl: './gerer-feedbacks.component.html',
  styleUrls: ['./gerer-feedbacks.component.css']
})
export class GererFeedbacksComponent implements OnInit {


  reponse!: string;
  question!: string;
  description!: string;
  AddQuestion: AddQuestion = new AddQuestion();
  addreponse: AddReponse = new AddReponse();
  token!: any;
  decoded: any;
  partenaire!: Partenaire
  id_question!: number;
  reponse_ajoute: AddReponse[] = [];
  Get_question: Question[] = [];
  Get_reponse: Reponse[] = [];
  alert_reponse = false;
  alert_validation = false;
  valide : boolean=false;
  constructor(private service: FeedbackService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire = this.decoded.result;
    console.log(this.partenaire);

    this.service.getAllQuestion(this.partenaire.id_part).subscribe(
      (res) => {


        this.Get_question = res.question;
        this.Get_reponse = res.reponse;
        console.log('question khw', this.Get_question);
        console.log('reponse khw', this.Get_reponse);


      },
    );

  }



  addResponse() {
    if (this.reponse == undefined || this.question == undefined) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'verifier les champs',
        showConfirmButton: false,
        timer: 1200
      })
    }
    else {
     
      this.valide=true;
      this.AddQuestion.description = this.question;
      this.AddQuestion.id_part = this.partenaire.id_part;
      this.service.AddQuestion(this.AddQuestion).subscribe(res => {
        this.id_question = res.id_question;
        this.addreponse.id_question = res.id_question;
        this.addreponse.reponse = this.reponse;
        this.service.AddReponse(this.addreponse).subscribe(res => {
          this.service.GetReponse(this.id_question).subscribe(res => {
            this.reponse_ajoute = res.data;
            this.reponse = '';
          })
        })

      })
    }

  }



  addfeedback() {
    this.valide=false;
    this.service.getAllQuestion(this.partenaire.id_part).subscribe(
      (res) => {
        this.Get_question = res.question;
        this.Get_reponse = res.reponse;
        console.log('question khw', this.Get_question);
        console.log('reponse khw', this.Get_reponse);
        this.reponse ='';
        this.question ='';
        


      },
    );
  }

  deleteQuestion(id_question: number) {

    Swal.fire({
      title: 'vous-etes sure?',
      text: "voulez-vous supprimer cette question !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.deleteQuestion(id_question).subscribe(
          (res) => {
            console.log(res)
    
            this.token = localStorage.getItem('token');
            this.decoded = jwt_decode(this.token);
            this.partenaire = this.decoded.result;
            console.log(this.partenaire);
    
            this.service.getAllQuestion(this.partenaire.id_part).subscribe(
              (res) => {
    
    
                this.Get_question = res.question;
                this.Get_reponse = res.reponse;
                console.log('question khw', this.Get_question);
                console.log('reponse khw', this.Get_reponse);
    
    
              },
            );
    
          },
        );
      }
    })
  }

  
}
