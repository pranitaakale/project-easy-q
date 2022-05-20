import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../service-folder/auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  ALERT_BOX : any = {
    show : false,
    msg : null
  }
  constructor(
    private auth : UserAuthService,
    private route : Router
  ) { }

  ngOnInit(): void {
  }
  signInWithGoogle() : any{
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() : any{
    // this.authService.signOut;
  }
  onSubmit(f: NgForm) {
    this.auth.registerUser(f.value).subscribe(
      res => {
        this.ALERT_BOX = {
          show : true,
          msg : res.alertMsg
        }
        if(res.isSignedUp){
          this.route.navigate(['login']);
        }
      },
      err => console.log(err)
    );
    // this.auth.registerUser(f.value).subscribe(
    //   res => {
    //     // console.log(res.status)
    //     alert(res.alertMsg);
    //     if(res.isSignedUp){
    //       this.route.navigate(['/login']);
    //     }
    //   },
    //   err => console.log("err",err)
    // )
  }
}
