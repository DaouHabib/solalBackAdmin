import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
declare var THREE: any;
declare var THREEx: any;
@Component({
  selector: 'app-show-animation',
  templateUrl: './show-animation.component.html',
  styleUrls: ['./show-animation.component.scss']
})
export class ShowAnimationComponent implements AfterViewInit {

  constructor() { }
  @ViewChild('arcontent') arContentDiv;

  title = 'AR app';
  
  ngAfterViewInit(): void {
    //document.createElement('a-scene');
    let aScene = document.createElement('a-scene');
    aScene.setAttribute('embedded','');
    aScene.setAttribute('arjs','sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;');  

    let aAsset = document.createElement('a-assets');
    let video = document.createElement('video');
    video.setAttribute('crossorigin','anonymous');  
    video.setAttribute('id','BS0i6');  
    video.setAttribute('controls','true');  
    video.setAttribute('autoplay','true');  
    video.setAttribute('type','video/mp4');  
    video.setAttribute('src','https://raw.githubusercontent.com/HabibDaou/HabibDaou.github.io/master/IKEAPlace.mp4');  
    aAsset.appendChild(video);
    let aMarker = document.createElement('a-marker');
    aMarker.setAttribute("id","memarker1")
    aMarker.setAttribute("vidhandler","video: #BS0i6")
    aMarker.setAttribute("preset","custom")
    aMarker.setAttribute("type","pattern")
    aMarker.setAttribute("url","https://raw.githubusercontent.com/HabibDaou/HabibDaou.github.io/master/xmarker.patt")
    let aBox = document.createElement('a-box');
    aBox.setAttribute("position","0 0.5 0")
    aBox.setAttribute("material","opacity: 0.5; side: double")
    let aVideo = document.createElement('a-video');
    aVideo.setAttribute("src","#BS0i6")
    aVideo.setAttribute("position","0 0.5 0")
    aVideo.setAttribute("rotation","270 0 0")
    aVideo.setAttribute("play","true")
    aVideo.setAttribute("width","2")
    aVideo.setAttribute("height","2")
    aBox.appendChild(aVideo);
    aMarker.appendChild(aBox);
    let aEntity = document.createElement('a-entity');
    aEntity.setAttribute("camera","")
    aScene.appendChild(aAsset);
    aScene.appendChild(aMarker);
    aScene.appendChild(aEntity);
    document.body.appendChild(aScene);

    let script = document.createElement('script');
    script.innerHTML = `
    AFRAME.registerComponent('vidhandler', {
        // ...
        init: function () {
            // Set up initial state and variables.
            this.toggle = false;
            this.vid = document.querySelector("#BS0i6")
            this.vid.pause();
       
        },
        tick: function () {
            if (this.el.object3D.visible == true) {
                if (!this.toggle) {
                    this.toggle = true;
                    this.vid.play();
            
                }
            } else {
                this.toggle = false;
                this.vid.pause();
           
            }
        }
    });`
    document.body.appendChild(script);
  }

}
