import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'multikart-backend';
  public  notificationOptions: any = {
    timeOut:         5000,
    showProgressBar: true,
    pauseOnHover:    true
  };
  ngOnInit(){}
}
