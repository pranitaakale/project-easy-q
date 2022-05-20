import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../service-folder/global/utils.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private utils : UtilsService
  ) { }

  ngOnInit(): void {
  }

}
