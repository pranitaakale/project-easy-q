import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../service-folder/global/utils.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuVariable:boolean = false;
  menu_icon_variable:boolean = false ;
  
  constructor(
    private utils : UtilsService
  ) { }

  ngOnInit(): void {
    
  }
  activeSession(){
    return this.utils.USER_RECORD.isLoggedIn
  }
  openMenu(){
    this.menuVariable =! this.menuVariable ; 
    this.menu_icon_variable =! this.menu_icon_variable ; 
  }

  reloadPage(){
    // window.location.reload();
    // this.route.navigate(['']);
    // location.reload();
    // $route.reload();
  }
 
  

}
