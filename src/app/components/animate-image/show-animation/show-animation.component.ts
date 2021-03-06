import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Markerservice } from '../../../shared/service/marker.service';
import { Projectservice } from '../../../shared/service/newProjet.service';
declare var THREE: any;
declare var THREEx: any;

@Component({
  selector: 'app-show-animation',
  templateUrl: './show-animation.component.html',
  styleUrls: ['./show-animation.component.scss']
})
export class ShowAnimationComponent implements AfterViewInit, OnInit {
  redirectTo: any;
  Markers = [];
  idprojet:any;
  markerId:any;
  constructor(private route: ActivatedRoute,
    private projectService: Projectservice,
    private markerService: Markerservice

  ) { }
  @ViewChild('arcontent') arContentDiv;

  title = 'AR app';
  getMarkers() {
    this.route.paramMap.subscribe((routes: any) => {
    
      this.idprojet=routes.params.idProject
    })
    return  this.markerService.getmarkerbyprojet(this.idprojet);
    /*this.projectService.getProjetByid(this.idprojet).subscribe(res => {
      res.markers.forEach(element => {
        this.Markers.push(element);
      });
     })*/
  }
  ngOnInit() {
    this.getMarkers();
  }
  onClick(){
    console.log("Clicked")
  }
  ngAfterViewInit(): void {
    //document.createElement('a-scene');
    let aScene = document.createElement('a-scene');
    aScene.setAttribute('embedded', '');
    aScene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;');
    aScene.setAttribute("cursor","rayOrigin: mouse")
    let aAsset = document.createElement('a-assets');

    this.getMarkers().subscribe(res => {
console.log(res);
   res.forEach(element => {
     let videoAction="video"+element._id;
    this.markerId=element._id;
    let video = document.createElement('video');
    video.setAttribute('crossorigin', 'anonymous');
    video.setAttribute('id',  videoAction);
    video.setAttribute('controls', 'true');
    video.setAttribute('type', 'video/mp4');
    video.setAttribute('src', 'https://raw.githubusercontent.com/HabibDaou/HabibDaou.github.io/master/IKEAPlace.mp4');
    aAsset.appendChild(video);
    let aMarker: any = document.createElement("a-marker");
    aMarker.setAttribute("id", element.markerName)
    aMarker.setAttribute(  videoAction, "video: #"+videoAction)
    aMarker.setAttribute("preset", "custom")
    aMarker.setAttribute("type", "pattern")
    aMarker.setAttribute("url", element.markerUrl)
    aScene.appendChild(aAsset);
    
     this.markerService.getmarkerByid(element._id).subscribe(result=>{
      result.actions.forEach(action => {
        console.log(action);
        
      let  nameLink="link"+action.name.toLowerCase( )
        let aEntity2 = document.createElement('a-entity');
        aEntity2.setAttribute("cursor","")
        aEntity2.setAttribute("raycaster","far: 20; interval: 1000; objects: .clickable")
  
        let aText = document.createElement('a-text');
        aText.setAttribute("position", "0 0.5 -0.5")
        aText.setAttribute(nameLink, "")
        aText.setAttribute("emitevents", "true")
        aText.setAttribute("value", "Click to link!")
        aText.setAttribute("color", "blue")
        aText.setAttribute("rotation", "-90 0 0")
        aText.setAttribute("scale", "1 1 1")
  
        aEntity2.appendChild(aText);
        aMarker.appendChild(aEntity2);
  
        let script1 = document.createElement('script');
        script1.innerHTML = `AFRAME.registerComponent('`+nameLink+`', {
      init: function () {
      
        this.el.addEventListener('click', function (evt) {
          console.log('I was clicked at: ');
        var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    
        window.open(
        '`+action.redirectTo+`','Pdf',windowFeatures );
        });
      }
    });`
    document.body.appendChild(script1);
      });
     })
    
    let aBox = document.createElement('a-box');
    aBox.setAttribute("position", "-1 0.5 0")
    aBox.setAttribute("material", "opacity: 0.5; side: double")
    let aVideo = document.createElement('a-video');
    aVideo.setAttribute("src", "#"+videoAction)
    aVideo.setAttribute("position", "0 0.5 0")
    aVideo.setAttribute("rotation", "270 0 0")
    aVideo.setAttribute("play", "true")
    aVideo.setAttribute("width", "1") 
    aVideo.setAttribute("height", "1")
    aBox.appendChild(aVideo);
    aMarker.appendChild(aBox);
    aScene.appendChild(aMarker);
    let script = document.createElement('script');
    script.innerHTML = `
    AFRAME.registerComponent('`+videoAction+`', {
        init: function () {
            this.vid = document.querySelector("#`+videoAction+`")
            this.toggle = false;
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
   });
      
      
      
     });
   


    let aEntity = document.createElement('a-entity');
    aEntity.setAttribute("camera", "")
    aEntity.setAttribute("cursor", "fuse: true; fuseTimeout: 500")
    aEntity.setAttribute("position", "0 0 -1")
    aEntity.setAttribute("geometry", "primitive: ring; radiusInner: 0.02; radiusOuter: 0.03")
    aEntity.setAttribute("material", "color: black; shader: flat")
    aScene.appendChild(aEntity);

    document.body.appendChild(aScene);
   
  
  }

}
