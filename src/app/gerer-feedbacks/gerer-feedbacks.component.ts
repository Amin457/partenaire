import { Component, OnInit } from '@angular/core';
import { AddQuestion } from '../models/add-question-model';
import jwt_decode from 'jwt-decode';
import { Partenaire } from '../models/partenaire_model';
import { FeedbackService } from '../services/feedback.service';
import { AddReponse } from '../models/add-reponse-model';
import { Question } from '../models/question-model';
import { Reponse } from '../models/reponse-model';



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
  alert_reponse=false;
  alert_validation=false;

  constructor(private service: FeedbackService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire = this.decoded.result;
    console.log(this.partenaire);

    this.service.getAllQuestion(this.partenaire.id_part).subscribe(
      (res) => {
        
        
        this.Get_question=res.question;
        this.Get_reponse=res.reponse;
        console.log('question khw', this.Get_question);
        console.log('reponse khw',this.Get_reponse);
        
        
      },
    );

  }



  addResponse() {
    if(this.reponse==undefined || this.question==undefined){
      this.alert_reponse=!this.alert_reponse;
    }
    else{
      this.alert_reponse=!this.alert_reponse;
      this.AddQuestion.description = this.question;
    this.AddQuestion.id_part = this.partenaire.id_part;
    console.log('question', this.AddQuestion);
    this.service.AddQuestion(this.AddQuestion).subscribe(res => {
      console.log('question saisi', res.id_question)
      this.id_question = res.id_question;
      console.log('id_question', this.id_question);

      this.addreponse.id_question = res.id_question;
      this.addreponse.reponse = this.reponse;
      this.service.AddReponse(this.addreponse).subscribe(res => {
        this.service.GetReponse(this.id_question).subscribe(res => {
          this.reponse_ajoute = res.data;
          console.log('reponse', this.reponse_ajoute);
          this.reponse=' ';
        })
      })

    })
    }
    
  }



  addfeedback() {
   
    this.service.getAllQuestion(this.partenaire.id_part).subscribe(
      (res) => {
        this.Get_question=res.question;
        this.Get_reponse=res.reponse;
        console.log('question khw', this.Get_question);
        console.log('reponse khw',this.Get_reponse);
        this.reponse=' ';
        this.question=' ';
        
        
      },
    );
  }
}
