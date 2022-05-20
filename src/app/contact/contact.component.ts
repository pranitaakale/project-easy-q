import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../service-folder/global/utils.service';
import { NgForm } from '@angular/forms';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private utils : UtilsService
  ) { }

  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
