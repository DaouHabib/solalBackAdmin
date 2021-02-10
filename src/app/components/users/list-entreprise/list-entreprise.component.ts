import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrepriseservice } from '../../../shared/service/entreprise.service';

@Component({
  selector: 'app-list-entreprise',
  templateUrl: './list-entreprise.component.html',
  styleUrls: ['./list-entreprise.component.scss']
})
export class ListEntrepriseComponent implements OnInit {
  public entreprise_list = []
  id= localStorage.getItem("connectedId");
  id_user:any;

  constructor( private entrepriseService: Entrepriseservice,private route: ActivatedRoute,private router : Router) {
  
  }

  public settings = {
    hideSubHeader: true,
    edit: { confirmSave: true } ,
    delete: { confirmDelete : true } ,
    actions: {
      position: 'right'
    },
    columns: {
   
      label: {
        title: 'Label',
      },
      adresse: {
        title: 'Adresse'
      },
    },

  };
  getallcustumers(): void {
    this.route.paramMap.subscribe((routes:any)=>{
      this.id_user=routes.params.id;
      this.entrepriseService.getEntrepriseByuser(routes.params.id).subscribe(data=>{
          console.log(data);
          this.entreprise_list = data.entreprise;
             
              });
              
      })
}
onEditConfirm(event){
  if (window.confirm('Are you sure you want to save?')) {
console.log(event);
    event.confirm.resolve(this.entrepriseService.edit(event.newData,event.newData._id).subscribe(res=>{
      console.log(res);
      this.getallcustumers();
    }));
  } else {
    event.confirm.reject();
  }
}
onDeleteConfirm(event){
  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve(this.entrepriseService.delete(event.data._id).subscribe(res=>{
      console.log (res);
      this.getallcustumers();
    }));
  } else {
    event.confirm.reject();
  }
  console.log(event.data._id)
}
CreateEntreprise(){
this.router.navigate(['/users/createentreprise/'+this.id_user]);
console.log(this.id_user);


}
  ngOnInit() {
    this.getallcustumers();}
}
