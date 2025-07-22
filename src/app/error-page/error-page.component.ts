import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.errorMessage = this.activatedRoute.data['message'];
    console.log('ERROR MESSAGE: ',this.errorMessage);
    console.log('[activatedRoute] ERROR MESSAGE: ',this.activatedRoute.data['message']);
    this.activatedRoute.data.subscribe((data: Data)=>{
      this.errorMessage = data['message'];
    })
  }

}
