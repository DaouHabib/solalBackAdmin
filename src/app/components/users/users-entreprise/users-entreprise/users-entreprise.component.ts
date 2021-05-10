import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Entrepriseservice } from '../../../../shared/service/entreprise.service';
import { UserService } from '../../../../shared/service/user.service';
import * as mapboxgl from 'mapbox-gl';
export class mapObject {
  type: string;
  query: [];
  features: [];
  attribution: string;
}
@Component({
  selector: 'app-users-entreprise',
  templateUrl: './users-entreprise.component.html',
  styleUrls: ['./users-entreprise.component.scss']
})
export class UsersEntrepriseComponent implements OnInit {
  user: any;
  entreprise:any;
  id=localStorage.getItem('connectedId');
    constructor(private userService: UserService,  private entreprisService: Entrepriseservice, private http: HttpClient) { }

  ngOnInit(): void {
    this.getConnected();
  }
  search_Word(word: string): any {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const token = "pk.eyJ1IjoiaGFiaWJkYW91IiwiYSI6ImNqb3l3YjNjcTAwanUzcm5qbWZ5ZmhvMmoifQ.rMS3RRmvsY09yDIF-vXe8w";
    this.http.get(url + word + ".json?types=country&access_token=" + token).subscribe((res: mapObject) => {

      res.features.forEach((geo: any) => {
        return geo.geometry.coordinates;
      })
    })
  }
  public getConnected() {
   
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFiaWJkYW91IiwiYSI6ImNqb3l3YjNjcTAwanUzcm5qbWZ5ZmhvMmoifQ.rMS3RRmvsY09yDIF-vXe8w';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const token = "pk.eyJ1IjoiaGFiaWJkYW91IiwiYSI6ImNqb3l3YjNjcTAwanUzcm5qbWZ5ZmhvMmoifQ.rMS3RRmvsY09yDIF-vXe8w&autocomplete=true&types=country";
    this.userService.getuser().subscribe(data => {
      this.user = data;
      this.entreprisService.getEntrepriseByuser(data._id).subscribe(result => {
        this.entreprise = result.entreprise;
        console.log(result);
        this.entreprise.forEach(entreprise => {

          this.http.get(url + entreprise.adresse + ".json?types=country&access_token=" + token).subscribe((res: mapObject) => {
            res.features.forEach((geo: any) => {
              new mapboxgl.Marker()
                .setLngLat(geo.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML('<h3>' + "title" + '</h3><p>' + "Popup MArker" + '</p>'))
                .addTo(map);
            })
          })
        })
      });

    });
  }
}
