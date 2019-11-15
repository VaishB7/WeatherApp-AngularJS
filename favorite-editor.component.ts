import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-favorite-editor',
  templateUrl: './favorite-editor.component.html',
  styleUrls: ['./favorite-editor.component.css']
})
export class FavoriteEditorComponent implements OnInit {

  storage2 = window.localStorage;
  favitems = [];
  weatherJ = null;
  sealstate = null;
  twittercity = null;
  sealsrc = null;
  resultClicked = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    Object.keys(localStorage).map(element => {
      var item =JSON.parse( localStorage.getItem(element));
      this.favitems.push({
        city: item.city,
        state: item.state,
        img: item.imgsrc
      })
    })
  }




  goBackResults(result_city, result_state, result_img){
    this.resultClicked = true;
    this.sealstate = result_state; 
    this.twittercity = result_city;
    this.sealsrc = result_img; 
    var pointer =JSON.parse(localStorage.getItem(result_city.toString()));
    var lat = pointer.latitude;
    var lon = pointer.longitude;
    
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const latlonparams = new HttpParams()
    .set('lat',lat)
    .set('lon',lon);
    this.http.get("http://localhost:3000/DarkcurrentLoc", {
    headers: headers,
    params: latlonparams
  }).subscribe((data: any[]) => {
    console.log(data);
    this.weatherJ = data;
  })

  }



}
