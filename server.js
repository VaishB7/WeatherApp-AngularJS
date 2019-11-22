const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const PORT = process.env.PORT || 3000 || 3389;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', function(req, res){
    res.send('Hello From Server');

});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });

app.listen(PORT, function(){
    console.log("Server: "+ PORT)
});


app.get('/weather', async (req, res)  => {
    console.log("Response Recieved");
    STREET = null;
    STATE=null;
    STREET = null;


    console.log(req.query.street);
    console.log(req.query.city);
    console.log(req.query.state);

    STREET = req.query.street;
    CITY = req.query.city;
    STATE = req.query.state;
    latitude = null; 
    longitude = null;

    const latLon = 'https://maps.googleapis.com/maps/api/geocode/json?address='+STREET+','+CITY+','+STATE+'&key=AIzaSyBB2z_IP6C-hc_KtWbXueYQ94eXAOVY4W4';
    console.log(latLon);

    request(latLon, (error1, response1, body1)=> {
        if (!error1 && response1.statusCode === 200) {
          const latLonresponse = JSON.parse(body1)
          console.log("Got a response: ", latLonresponse);
          latitude = latLonresponse.results[0].geometry.location.lat;
          longitude = latLonresponse.results[0].geometry.location.lng;
          console.log(latitude)
          console.log(longitude)

          

          const darkskyCall1 = 'https://api.darksky.net/forecast/fc31c19ef8e101c09bc1bf4e9d9218fc/'+ latitude +','+ longitude;

          request(darkskyCall1, (error2, response2, body2)=> {
            if (!error2 && response2.statusCode === 200) {
              const darkskyCall1response = JSON.parse(body2)
              //console.log("Got a response From Dark SKy: ", darkskyCall1response)
              res.json(darkskyCall1response);
              
            }
            else {
                console.log("Got an error: ", error2, ", status code: ", response2.statusCode)
            }
        })


        } else {
          console.log("Got an error: ", error1, ", status code: ", response1.statusCode)
        }
      })
    


});


/*
app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    
    const weather_url = 'https://api.darksky.net/forecast/fc31c19ef8e101c09bc1bf4e9d9218fc/${lat},${lon}';
    //const weather_url = 'https://api.darksky.net/forecast/fc31c19ef8e101c09bc1bf4e9d9218fc/34.0322,-118.2836';
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    response.json(json);

});
*/



app.get('/seal-api', async (req, res)  => {
    newState = null;
    newState = req.query.state;
    console.log("SERVER SEAL"+newState);

    const sealapi = 'https://www.googleapis.com/customsearch/v1?q='+newState+'%20State%20Seal&cx=005809510120208919839:dphpawasarj&imgSize=huge&imgType=news&num=1&searchType=image&key=AIzaSyBB2z_IP6C-hc_KtWbXueYQ94eXAOVY4W4';
    console.log("SEAL API:");
    console.log(sealapi);

    request(sealapi, (error2, response2, body2)=> {
        if (!error2 && response2.statusCode === 200) {
          const sealapiresponse = JSON.parse(body2)
          console.log("Got a response From Dark SKy: ", sealapiresponse.items[0].link)
          res.json(sealapiresponse.items[0].link);
          
        }
        else {
            console.log("Got an error: ", error2, ", status code: ", response2.statusCode)
        }
    })

});


app.get('/displaymodal',function(req,res) {
    console.log("Current Location Response received")
    let darksky_response;
    let latitude = req.query.lat
    let longitude = req.query.lon
    let time = req.query.time
  
    dark_sky_url= "https://api.darksky.net/forecast/fc31c19ef8e101c09bc1bf4e9d9218fc/"+latitude+","+longitude+","+time;
  
      request(dark_sky_url, (error, response, body)=> {
      if (!error && response.statusCode === 200) {
        darksky_response = JSON.parse(body)
        console.log("Got inner response: ", darksky_response)
        res.json(darksky_response)
       } else {
        console.log("Got inner error: ", error, ", status code: ", response.statusCode)
        }
      })
  });


  

  app.get('/DarkcurrentLoc', async (req, res)  => {
    latitude = req.query.lat;
    longitude = req.query.lon;
    

    const darkskyCall2 = 'https://api.darksky.net/forecast/fc31c19ef8e101c09bc1bf4e9d9218fc/'+ latitude +','+ longitude;
    console.log(darkskyCall2);

          request(darkskyCall2, (error2, response2, body2)=> {
            if (!error2 && response2.statusCode === 200) {
              const darkskyCall2response = JSON.parse(body2)
              //console.log("Got a response From Dark SKy for FAV: ", darkskyCall1response)
              res.json(darkskyCall2response);
              
            }
            else {
                console.log("Got an error: ", error2, ", status code: ", response2.statusCode)
            }
        })

});





app.get('/autoComplete', async (req, res)  => {
  term = req.query.term;
  
  

  const darkskyCall2 = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+term+'&types=(cities)&language=en&key=AIzaSyBB2z_IP6C-hc_KtWbXueYQ94eXAOVY4W4';
  console.log(darkskyCall2);

        request(darkskyCall2, (error2, response2, body2)=> {
          if (!error2 && response2.statusCode === 200) {
            const darkskyCall2response = JSON.parse(body2)
            console.log(darkskyCall2response)
            res.json(darkskyCall2response);
            
          }
          else {
              console.log("Got an error: ", error2, ", status code: ", response2.statusCode)
          }
      })

});




