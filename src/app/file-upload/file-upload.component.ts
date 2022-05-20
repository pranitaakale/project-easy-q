import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../service-folder/global/utils.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  SHOW_LOADER : boolean = false;

  TAB_ID : string = 'tab01';

  ALERT_BOX : any = {
    display : false,
    title : null,
    text : null
  }

  FILE_RECORD : any = {
    fileInputText : 'Select Your File',
    isSelected : false,
    isSubmitted : false,
    isUploaded : false,
    uploadProgress : false,
    file : null,
  }

  UPLOAD_RES : any =  {
    fileID : null,
    fileList : null
  }

  constructor(
    private utils : UtilsService,
    private route : Router,
    private http : HttpClient
    ){}

  
  onFileSelected(event : any){
    this.FILE_RECORD.isSelected = true;
    this.FILE_RECORD.file = <File>event.target.files[0]; 
    this.FILE_RECORD.fileInputText = 'Selected File : ' + this.FILE_RECORD.file.name;
 }

  onUpload(){
    if(this.utils.USER_RECORD.isLoggedIn){
      this.FILE_RECORD.uploadProgress = true;
      const fd= new FormData();
      fd.append('pdf', this.FILE_RECORD.file, this.FILE_RECORD.file.name);
      fd.append('user', this.utils.USER_RECORD.uEmail);
      setTimeout( () => {
      this.http.post(environment.UPLOAD_URL, fd)
      .subscribe((event) =>{
        this.UPLOAD_RES = event;
        this.ALERT_BOX.display = true;
        this.ALERT_BOX.title = 'Success';
        this.ALERT_BOX.text = "File Uploaded Successfully";
        // if(event.type===HttpEventType.UploadProgress){
        //   console.log('Upload Progress: '+ Math.round(event.loaded / event.loaded * 100)  +'%');
        //   this.ALERT_BOX.display = true;
        //   this.ALERT_BOX.title = 'Success';
        //   this.ALERT_BOX.text = "File Uploaded Successfully";
          
        // } else if(event.type===HttpEventType.Response){
        //   // this.fileData = event.body;
        //   // this.utils.getFileListfromServer = this.fileData.questFiles
        //   // this.chooseList()
        // }

        this.FILE_RECORD.isSelected = false;
        this.FILE_RECORD.isSubmitted = true;
        this.FILE_RECORD.uploadProgress = false;
        this.FILE_RECORD.fileInputText = 'Select Your File';

      });
    }, 5000);
    }
    else{
      this.FILE_RECORD.file = null;
      this.FILE_RECORD.isSelected = false; 
      this.FILE_RECORD.fileInputText = 'Selected Your File';
      this.ALERT_BOX.display = true;
      this.ALERT_BOX.title = 'Not LoggedIn';
      this.ALERT_BOX.text = "Please Login to Access this Service !";
    }
  }

  onPaste(){
    if(this.utils.USER_RECORD.isLoggedIn){
      console.log("");
    }
    else{
      this.ALERT_BOX.display = true;
      this.ALERT_BOX.title = 'Not LoggedIn';
      this.ALERT_BOX.text = "Please Login to Access this Service !";
    }  
  }

  generateQ(){
    this.utils.USER_RECORD.uFile = this.UPLOAD_RES.fileId;
    var user_and_file = {
      file : this.UPLOAD_RES.fileId,
      user : this.utils.USER_RECORD.uEmail
    }
    this.http.post<any>(environment.GENERATE_QUESTIONS, user_and_file).subscribe()
    this.FILE_RECORD.isSubmitted = false;
    this.closeAlert();
    this.SHOW_LOADER = true;
    this.utils.GENERATE_FLAG = true;
    setTimeout( () => {
      this.SHOW_LOADER = false;
      this.route.navigate(['generate-questions']);
    }, 1000)
  }
  enqueueQ(){
    this.FILE_RECORD.isSelected = false;
    this.FILE_RECORD.isSubmitted = false;
    this.closeAlert();
    this.chooseList();
  }

  chooseList(){
    // this.fileList = this.utils.getFileListfromServer;
  }
  closeAlert(){
    this.ALERT_BOX.display = false;
    this.ALERT_BOX.title = null;
    this.ALERT_BOX.text = null;
  }

  openTab(id:any){
    if(id === 'tab01'){
      this.TAB_ID = 'tab01';
    }
    else if(id === 'tab02'){
      this.TAB_ID = 'tab02';
    }
    else{
      this.TAB_ID = 'tab03';
    }
  }
  ngOnInit(): void {
  }

}
