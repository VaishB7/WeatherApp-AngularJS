import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';

import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { booksService } from './books.service';


@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
  providers: [booksService]
})
export class BasicFormComponent implements OnInit {

  sealstate = null;
  dataSeal = null;
  newdataseal = null;
  weatherJ = null;
  twittercity = null;
  myForm: FormGroup;

  favClicked = false;
  resultClicked = true; 
  

  //city : FormControl = new FormControl();
  myBooks = <any>[];

  constructor (private service: booksService, private http: HttpClient) { }
  

  ngOnInit() {

    this.myForm = new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      currentLocation: new FormControl('')
    });


 this.myForm.valueChanges.subscribe(console.log)
 /*
 this.city.valueChanges.subscribe(
  term => {
    console.log(term);
    if (term != '') {
      this.service.search(term).subscribe(
        data => {
          this.myBooks = data as any[];


  });
}
  });
*/
  
}


  submitHandler() {
    console.log(this.myForm.value);


    if (this.myForm.get('currentLocation').value == true){
      console.log("HELLO");

  }

  else{

      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

      const params = new HttpParams()
      .set('street',(this.myForm.get('street').value))
      .set('city',(this.myForm.get('city').value))
      .set('state',(this.myForm.get('state').value))

      this.http.get("http://localhost:3000/weather",{
        headers: headers,
        params: params
      }).subscribe((data: any[]) => {
        console.log("response from get call");
        console.log(data);
        this.weatherJ = data;
        

      })

  }

}




returnImgSrc(){

  this.sealstate = this.myForm.get('state').value.toString();
  this.twittercity = this.myForm.get('city').value.toString();
  
  //console.log(this.sealstate);
  

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

  const params = new HttpParams()
  .set('state',(this.sealstate));
  console.log("I am in SEAL-API");

  this.http.get("http://localhost:3000/seal-api",{
    headers: headers,
    params: params
  }).subscribe((dataSeal: any[]) => {
    console.log("response from get call");
    console.log(dataSeal);
    this.newdataseal = dataSeal.toString();
    
    

    

  })
  

}


currLocation(event){
  if(event.target.checked){

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.get("http://ip-api.com/json").subscribe((data:any[]) => {
      console.log("response from get call");
      console.log(data);
      var latitude = data['lat'];
      var longitude = data['lon'];
      this.sealstate= "CA";
      
      this.twittercity = data['city']; 


      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

      const params = new HttpParams()
      .set('state',(this.sealstate));
      console.log("I am in SEAL-API");
    
      this.http.get("http://localhost:3000/seal-api",{
        headers: headers,
        params: params
      }).subscribe((dataSeal: any[]) => {
        console.log("response from get call");
        console.log(dataSeal);
        this.newdataseal = dataSeal.toString();
        
        
    
        
    
      })






      
      console.log("LAT"+latitude+" "+longitude);

    const latlonparams = new HttpParams()
    .set('lat',latitude)
    .set('lon',longitude);
    this.http.get("http://localhost:3000/DarkcurrentLoc", {
    headers: headers,
    params: latlonparams
  }).subscribe((data: any[]) => {
    console.log(data);
    this.weatherJ = data;
  })
    });
  }
}

    




myClear(){
  this.myForm.reset();
  
}

flagFav(){

  this.favClicked = true;
  this.resultClicked = false;
 

}

flagResult(){
  this.resultClicked = true;
  this.favClicked = false;
}


}