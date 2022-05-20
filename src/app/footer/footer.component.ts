import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../service-folder/global/utils.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentPage : any;
  constructor(
    private utils : UtilsService
  ) { }

  ngOnInit(): void {
  }

}
