import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Cropper from "cropperjs";
import { Markerservice } from '../../../shared/service/marker.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actions-marker',
  templateUrl: './actions-marker.component.html',
  styleUrls: ['./actions-marker.component.scss']
})
export class ActionsMarkerComponent implements OnInit {
  public addproduct: FormGroup;
  selectedFile: File = null;
  image: any = null;
  isImageLoading: boolean;
  ImageOpen: boolean;
  user : any;
  imageToShow: any;
  annimationForm: FormGroup;
  object:FormGroup
  imageUrl:any;
  dynamicForm: FormGroup;
  idMarker:any;
  seedData = [
  
  ];
  constructor(private formBuilder: FormBuilder , private http: HttpClient,  public sanitization: DomSanitizer,
    private markerService : Markerservice,
    private route: ActivatedRoute,
    private router: Router,

    ) {
      this.imageDestination = "";
    this.object = this.formBuilder.group({
        name: this.formBuilder.control(null),
        link: this.formBuilder.control(null),
        annimationType: this.formBuilder.control(null),
        redirectTo: this.formBuilder.control(null),
    })
      this.annimationForm = this.formBuilder.group({
        annimation: this.formBuilder.array([
          
        ])
      })

     
   }

   seedFiltersFormArray() {
    this.seedData.forEach(seedDatum => {
      const formGroup = this.createFilterGroup();
      if (seedDatum.apiType) {
        formGroup.addControl('value', this.getFormControl());
      }
      formGroup.patchValue(seedDatum);
      this.filtersFormArray.push(formGroup);
    });
  }

  createFilterGroup() {
    return this.formBuilder.group({
      name: this.formBuilder.control(null),
      link: this.formBuilder.control(null),
      annimationType: this.formBuilder.control(null),
      redirectTo: this.formBuilder.control(null),
    });
  }

  addFilterToFiltersFormArray() {
    this.filtersFormArray.push(this.createFilterGroup());
  }

  removeFilterFromFiltersFormArray(index) {
    this.filtersFormArray.removeAt(index);
  }

  selectedAPIChanged(i) {
    this.getFilterGroupAtIndex(i).addControl('value', this.getFormControl());
  }

  getFormControl() {
    return this.formBuilder.control(null);
  }

  save() {
    console.log(this.dynamicForm.value);
    this.markerService.AddactionstoMarker(this.dynamicForm.value, this.idMarker).subscribe(res=>{
      console.log(res);
    })
  }

  get filtersFormArray() {
    return (<FormArray>this.dynamicForm.get('filters'));
  }

  getFilterGroupAtIndex(index) {
    return (<FormGroup>this.filtersFormArray.at(index));
  }

  
  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  public onUploadInit(args: any): void { }

  public onUploadError(args: any): void { }

  public onUploadSuccess(args: any): void {
    this.selectedFile = args[0];
      const fd = new FormData();
      fd.append("file", this.selectedFile);
      this.http
          .post("http://localhost:3000/uploads/upload", fd)
          .subscribe((res) => {    this.imageUrl=res; 
              console.log(res)});  
       
   }



  @ViewChild("image", { static: false })
  public imageElement: ElementRef;

  @Input("src")
  public imageSource: string;

  public imageDestination: string;
  private cropper: Cropper;


  public ngAfterViewInit() {
      this.cropper = new Cropper(this.imageElement.nativeElement, {
          zoomable: false,
          scalable: false,
          aspectRatio: 1,
          responsive:true,
          crop: () => {
              const canvas = this.cropper.getCroppedCanvas();
              this.imageDestination = canvas.toDataURL("image/png");
          }
      });
      const imageData =  this.cropper.getImageData();
const canvasData =  this.cropper.getCanvasData();
console.log("imageData:"+imageData.aspectRatio,"CanvasData:"+canvasData.naturalHeight)
  }

  public ngOnInit() {
    this.route.paramMap.subscribe((routes: any) => {
      this.idMarker=routes.params.idMarker

    })
    this.dynamicForm = this.formBuilder.group({
      filters: this.formBuilder.array([])
    });
    this.imageSource="assets/images/solal.PNG" }


}
