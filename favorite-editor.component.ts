import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';


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
  emptyFav = false;
  card_temp = null;
  favimgsrc = "http://vaish.freevar.com/yellow.png";
  whiteColor = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    Object.keys(localStorage).map(element => {
      var item =JSON.parse( localStorage.getItem(element));
      this.favitems.push({
        city: item.city,
        state: item.state,
        img: item.imgsrc,
        mainkey: element
      })
    })
  }

  deleteFav(i,key){
    localStorage.removeItem(key);
    let table = document.querySelector('table');
    table.deleteRow(i+1);

    if(localStorage.length < 1){
      this.emptyFav = true;
      table.deleteRow(0);

    }

  }

  emptyLocalS(){

    if(localStorage.length < 1){
      return true;

    }
    else{
      return false;
    }

  }


  goBackResults(result_city, result_state, result_img){
    this.favimgsrc = "http://vaish.freevar.com/yellow.png";
    this.resultClicked = true;
    this.sealstate = result_state; 
    this.twittercity = result_city;
    this.sealsrc = result_img.toString(); 
    var pointer =JSON.parse(localStorage.getItem(result_city.toString()));
    var lat = pointer.latitude;
    var lon = pointer.longitude;
    
    console.log("LAT"+lat);
    console.log("State"+result_state);
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const latlonparams = new HttpParams()
    .set('lat',lat)
    .set('lon',lon);
    this.http.get("https://node-server-259707.appspot.com/DarkcurrentLoc", {
    headers: headers,
    params: latlonparams
  }).subscribe((data: any[]) => {
    console.log("GFAV"+data);
    this.weatherJ = data;
    this.card_temp = Math.round(this.weatherJ.currently.temperature); 

  })

  }



}
