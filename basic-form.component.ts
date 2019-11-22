import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


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
  //myForm: FormGroup;
  autocomp = null;

  favClicked = false;
  resultClicked = true; 
  pressedClear = false;
  //selectedCurrLoc = false;
  favimgsrc = "http://vaish.freevar.com/white-star.png";

  submitClicked = false;
  currentClicked = false;
  errormsg = false;
  whiteColor = true;
  card_temp = null;
  

  myForm = new FormGroup({
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    currentLocation: new FormControl('')
    
  });

  //city : FormControl = new FormControl();
  myBooks;
 

  constructor (private service: booksService, private http: HttpClient) { }
  

  ngOnInit() {

    /*this.myForm = new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      currentLocation: new FormControl('')
      
    });*/


 this.myForm.valueChanges.subscribe(console.log);
 
 this.myForm.get('city').valueChanges.subscribe(
  term => {
    console.log(term);
    if (term != '') {
      this.search(term);
      debugger;
}
  });

  





  
      //switchMap(value => this.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+value+"&types=(cities)&language=en&key=AIzaSyBB2z_IP6C-hc_KtWbXueYQ94eXAOVY4W4")
        
}






search(term) {

  

//console.log("I am here");

  var results=[];
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

      const params = new HttpParams()
      .set('term',term)

      this.http.get("https://node-server-259707.appspot.com/autoComplete",{
        headers: headers,
        params: params
      }).subscribe((dataAuto: any[]) => {
        console.log("response from get call");
        console.log(dataAuto);
        this.autocomp = dataAuto;
        this.myBooks = [];
        var predictions= this.autocomp.predictions;
              console.log(predictions)
              var i=0;
              
              while(i<5 && i<predictions.length)
              {
                  results.push(predictions[i]["structured_formatting"]["main_text"]);
                  i++;
              }
        this.myBooks = results;
        console.log(this.myBooks)
        //debugger; 
        //return results;   
      });

            //console.log(this.autocomp);
    }
          


      














  submitHandler() {
    this.submitClicked = true;
    //this.pressedClear = false;
    console.log(this.myForm.value);


    if (this.myForm.get('currentLocation').value == true){
      this.currentClicked = true;
      //console.log("I AM SELECTED");
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
          this.newdataseal = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Seal_of_California.svg/2000px-Seal_of_California.svg.png";
          
 
      
        })
  

        console.log("LAT"+latitude+" "+longitude);
  
      const latlonparams = new HttpParams()
      .set('lat',latitude)
      .set('lon',longitude);
      this.http.get("https://node-server-259707.appspot.com/DarkcurrentLoc", {
      headers: headers,
      params: latlonparams
    }).subscribe((data: any[]) => {
      console.log(data);
      this.weatherJ = data;

      this.card_temp = Math.round(this.weatherJ.currently.temperature);
    })
      });

  }

  else{

    var letters = /^[A-Za-z]+$/;
    if(this.myForm.get('street').value.match(letters))
    {
      this.errormsg = true;
    }

  else{  
    this.errormsg = false;
    
    this.currentClicked = false;

      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});

      const params = new HttpParams()
      .set('street',(this.myForm.get('street').value))
      .set('city',(this.myForm.get('city').value))
      .set('state',(this.myForm.get('state').value))

      this.http.get("https://node-server-259707.appspot.com/weather",{
        headers: headers,
        params: params
      }).subscribe((data: any[]) => {
        console.log("response from get call");
        console.log(data);
        this.weatherJ = data;
        this.card_temp = Math.round(this.weatherJ.currently.temperature);
        

      })

  }

  
  }

}




returnImgSrc(){

  this.pressedClear = false;

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


    document.getElementById("street").setAttribute("disabled","disabled");
    document.getElementById("city").setAttribute("disabled","disabled");
    document.getElementById("state").setAttribute("disabled","disabled");

    document.getElementById("submitButton").removeAttribute("disabled");


  }


  else{
    document.getElementById("street").removeAttribute("disabled");
    document.getElementById("city").removeAttribute("disabled");
    document.getElementById("state").removeAttribute("disabled");

    document.getElementById("submitButton").setAttribute("disabled","disabled");

  }
}

    




myClear(){
  
  this.weatherJ = null;
  this.errormsg = false;
  

  
  this.pressedClear = true;
  //document.getElementById("resultTab").innerHTML = "";

  document.getElementById("street").removeAttribute("disabled");
    document.getElementById("city").removeAttribute("disabled");
    document.getElementById("state").removeAttribute("disabled");

    document.getElementById("submitButton").setAttribute("disabled","disabled");

    this.myForm = new FormGroup({
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl('', Validators.required),
      currentLocation: new FormControl(null)
    });

    
      document.getElementById("favoritebutton").style.backgroundColor = "white";
    document.getElementById("resultbutton").style.backgroundColor = "#63b4cf";
    this.resultClicked = true;
    this.favClicked = false;
  
    

  
}

flagFav(){

  this.favClicked = true;
  this.resultClicked = false;
  this.pressedClear = false;
  document.getElementById("favoritebutton").style.backgroundColor = "#63b4cf";
  document.getElementById("resultbutton").style.backgroundColor = "white";

  
 

}

flagResult(){
  this.resultClicked = true;
  this.favClicked = false;
  this.pressedClear = false;

  document.getElementById("resultbutton").style.backgroundColor = "#63b4cf";
  document.getElementById("favoritebutton").style.backgroundColor = "white";
  
}


}