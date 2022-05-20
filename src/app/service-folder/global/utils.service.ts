import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  GENERATE_FLAG : boolean = false;
  QUESTION_SET: any;
  QUESTION_FOR_FILE : any;
  USER_RECORD : any = {
    isLoggedIn : false,
    uEmail : null,
    uToken : null,
    uFile : null
  }
  constructor(
    private http : HttpClient
  ) { }

  sessionInfo(session : any){
    this.USER_RECORD.isLoggedIn = session.isLoggedIn;
    this.USER_RECORD.uEmail = session.getEmail;
    this.USER_RECORD.uToken = session.getToken;
  }

  fillQuestions(){
    if(this.GENERATE_FLAG){
      console.log(this.USER_RECORD)
      var user_and_file = {
        file : this.USER_RECORD.uFile,
        user : this.USER_RECORD.uEmail
      }
      setTimeout( () => {
        this.http.post<any>(environment.GET_QUESTIONS, user_and_file).subscribe(
          res => {
            this.QUESTION_SET = res.quest_list;
            this.QUESTION_FOR_FILE = res.file_name;
            console.log(this.QUESTION_SET)
          },
          err => console.log("err",err)
        )
      }, 2000);
      
    }
  }
}
