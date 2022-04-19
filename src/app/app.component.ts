import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'partenaire1';
  connected!: string | null 
  loggedAdmin!: string | null;

  constructor(public login:LoginService, private router:Router){ }

  ngOnInit(){
    
    /*this.connected = localStorage.getItem('connected');
    this.loggedAdmin = localStorage.getItem('loggedAdmin');

    if (this.connected === "false" || !this.loggedAdmin){
      this.router.navigate(['/connexion']);
    }
    else{
      this.login.login(this.loggedAdmin);
      //this.router.navigate(['/home'])
    }*/
  }
}
