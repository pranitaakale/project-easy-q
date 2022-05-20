import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../service-folder/global/utils.service';

@Component({
  selector: 'app-gen-quest',
  templateUrl: './gen-quest.component.html',
  styleUrls: ['./gen-quest.component.css']
})
export class GenQuestComponent implements OnInit {

  SHOW_LOADER : boolean = true;
  TOTAL_QUEST : number = 0;
  DISCARD_COUNT : number = 0;
  INCLUDE_COUNT : number = 0;
  QUEST_NUM : number = 1;
  QUEST_SET : any;
  QUEST_OBJ : any ;
  QUEST_FLAG : boolean = false;
  FINAL_QS_FLAG : boolean = false;
  FINAL_QUEST_SET : any = [];
  DISACARDED_QUEST : any = [];
  FILE_NAME : any = null;
  constructor(
    private utils : UtilsService
  ) { }

  ngOnInit(): void {
    this.utils.fillQuestions();
    setTimeout( () => {
      console.log(this.utils.QUESTION_SET)
      this.FILE_NAME = this.utils.QUESTION_FOR_FILE;
      if(this.utils.QUESTION_SET){
        this.TOTAL_QUEST = this.utils.QUESTION_SET.length;
        this.QUEST_FLAG = true;
        this.QUEST_SET = this.utils.QUESTION_SET;      
        this.QUEST_OBJ = {
          quest_text : this.QUEST_SET[this.INCLUDE_COUNT].question,
          opt_a : this.QUEST_SET[this.INCLUDE_COUNT].option_a,
          opt_b : this.QUEST_SET[this.INCLUDE_COUNT].option_b,
          opt_c : this.QUEST_SET[this.INCLUDE_COUNT].option_c,
          opt_d : this.QUEST_SET[this.INCLUDE_COUNT].option_d,
          corr_opt : this.QUEST_SET[this.INCLUDE_COUNT].correct_option,
          included : this.QUEST_SET[this.INCLUDE_COUNT].isIncluded
        };
      }
      this.SHOW_LOADER = false;
    }, 5000)
  }

  updateDiscard(){
    this.QUEST_SET[this.DISCARD_COUNT].isIncluded = false;
    this.DISCARD_COUNT++;
    this.QUEST_FLAG = false;
    this.nextQuestion();
  }
  updateInclude(){
    this.INCLUDE_COUNT++;
    this.QUEST_FLAG = false;
    this.nextQuestion();  
  }

  nextQuestion(){
    if(this.INCLUDE_COUNT+this.DISCARD_COUNT >= this.TOTAL_QUEST){ 
      for(var quest of this.QUEST_SET){
        if(quest.isIncluded){
          this.FINAL_QUEST_SET.push(quest);
        }
        else{
          this.DISACARDED_QUEST.push(quest);
        }
      }
      setTimeout( () => {
        this.FINAL_QS_FLAG = true;
        this.QUEST_NUM = 0;
        console.log(this.DISACARDED_QUEST)
      }, 1000)
    }
    else{
      setTimeout( () => {
        this.QUEST_NUM++;
        this.QUEST_FLAG = true;
        this.QUEST_OBJ = {
          quest_text : this.QUEST_SET[this.INCLUDE_COUNT].question,
          opt_a : this.QUEST_SET[this.INCLUDE_COUNT].option_a,
          opt_b : this.QUEST_SET[this.INCLUDE_COUNT].option_b,
          opt_c : this.QUEST_SET[this.INCLUDE_COUNT].option_c,
          opt_d : this.QUEST_SET[this.INCLUDE_COUNT].option_d,
          corr_opt : this.QUEST_SET[this.INCLUDE_COUNT].correct_option,
          included : this.QUEST_SET[this.INCLUDE_COUNT].isIncluded
        };
      
      }, 200);
    }
  }

}
