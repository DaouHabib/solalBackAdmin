import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { UserService } from '../../shared/service/user.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-animate-image',
  templateUrl: './animate-image.component.html',
  styleUrls: ['./animate-image.component.scss']
})
export class AnimateImageComponent implements  OnInit {
  
  constructor(private userService: UserService,
    private http: HttpClient,
    public sanitization: DomSanitizer,) { }

  items = [
    'Carrots',
    'Tomatoes',
    'Onions',
    'Apples',
    'Avocados'
  ];

  basket = [
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  public onUploadInit(args: any): void { }
  
  public onUploadError(args: any): void { }
  
  public onUploadSuccess(args: any): void {

    var container = document.querySelector('#imageContainer')
    var fullMarkerImage = document.createElement('img')
	fullMarkerImage.src = args[0].dataURL;

	while (container.firstChild) container.removeChild(container.firstChild);
	container.appendChild(fullMarkerImage)
  }

  public markeronUploadInit(args: any): void { }
  
  public markeronUploadError(args: any): void { }
  
  public markeronUploadSuccess(args: any): void {}
  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
   
  
ngOnInit(){

}
}
