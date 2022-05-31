import { Component, Type } from '@angular/core';
import { empty, EmptyError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  newMemberName = "";
  members:string[] = [];
  errorMessage = "";
  numberOfTeams = 0;
  teams:string[][] = [];

  isFloat = (value:number) => {
    if (
      typeof value === 'number' &&
      !Number.isNaN(value) &&
      !Number.isInteger(value)
    ) {
      return true;
    }
    return false;
  }
  
  getNewMemberValue = () =>{
    this.newMemberName = (document.getElementById("name") as HTMLInputElement).value;
  }

  getNumberOfTeams = () =>{
    this.numberOfTeams = Number((document.getElementById("number") as HTMLInputElement).value);
  }

  clearErrorMessage = () =>{
    if(this.errorMessage) this.errorMessage = "";
  }

  generateTeams = () =>{  

    this.teams = [];

    if(!this.numberOfTeams || this.numberOfTeams <= 0){
      this.errorMessage = "Number of teams is invalid !";
      return;
    }

    const membersCopy = [...this.members];

    if(!membersCopy.length){
      this.errorMessage = "No members found ! Try to add members before generating teams";
      return;
    }

    if(this.isFloat(membersCopy.length / this.numberOfTeams)){
      this.errorMessage = "Insufficient amount of members to generate " + this.numberOfTeams + " teams, try to add more members";
      return;
    }

    this.clearErrorMessage();

    while(membersCopy.length){
      for(let i = 0; i < this.numberOfTeams; i++){
        let randomeNumber = Math.floor(Math.random() * membersCopy.length);
        const member = membersCopy.splice(randomeNumber,1)[0];
  
        if(this.teams[i]){
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    console.log(this.teams);
  }

  addNewMember = () =>{
    if(!this.newMemberName){
      this.errorMessage = "Name input is required !";
      return;
    }

    this.clearErrorMessage();
    
    this.members.push(this.newMemberName);
    this.newMemberName = "";
    (document.getElementById("name") as HTMLInputElement).focus();
  }
}
