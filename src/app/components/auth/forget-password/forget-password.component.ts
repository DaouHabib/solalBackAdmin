import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/service/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private authService : AuthenticationService,private router: Router,    private route: ActivatedRoute ,
    ) { }

  ngOnInit(): void {
    
  this.route.paramMap.subscribe((routes:any)=>{
    this.authService.saveToken(routes.params.token);
    this.router.navigate( ['/auth/changePassword'] );
        
    })
  }

}
