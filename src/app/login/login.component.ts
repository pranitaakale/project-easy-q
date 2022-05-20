import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../service-folder/auth/user-auth.service';
import { UtilsService } from '../service-folder/global/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth : UserAuthService,
    private util : UtilsService,
    private route : Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {
    this.auth.loginUser(f.value).subscribe(
      res => {
        if(res.isLoggedIn){
          this.util.sessionInfo(res);
          this.route.navigate(['/service']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
