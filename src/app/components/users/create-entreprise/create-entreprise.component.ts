import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrepriseservice } from '../../../shared/service/entreprise.service';

@Component({
  selector: 'app-create-entreprise',
  templateUrl: './create-entreprise.component.html',
  styleUrls: ['./create-entreprise.component.scss']
})
export class CreateEntrepriseComponent implements OnInit {
  public EntrepriseForm: FormGroup;
  public permissionForm: FormGroup;
  selectedFile: File = null;
  id_user:any;

  constructor(private formBuilder: FormBuilder,private entrepriseService: Entrepriseservice,private route : ActivatedRoute,private router: Router) {
    this.createAccountForm();
    this.createPermissionForm();
  }
 
 
  createAccountForm() {
    this.EntrepriseForm = this.formBuilder.group({
      label: new FormControl(  "" , Validators.required ),
      adresse: new FormControl( "" , Validators.required),
   
  }
    )
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  adduser(): void {
    console.log(this.EntrepriseForm.value)
    this.route.paramMap.subscribe((routes:any)=>{
      this.id_user=routes.params.id;
    this.entrepriseService.AddEntrepriseTouser(routes.params.id,this.EntrepriseForm.value).subscribe(
      user => {
          console.log(user)
          this.router.navigate(['/users/entreprise/'+routes.params.id])
      }
      ,
      error => {
        console.log("Erreur")
      }
  );
})
}

  ngOnInit() {
  }

}
