  /*This is the only Choose holiday type Get info button event */
  const hol_btn = document.querySelector('#hol_btn');
  const hol_picked = document.querySelector('#hol_picked');

    hol_btn.onclick = (event) => {
        event.preventDefault();
        console.log(hol_picked.value);
        display_country_info(hol_picked.value); //holiday type picked from dropdown to pass to display_country_info Function to display relevant countres
   };
   

   var place_info = [];
   //Javascript object with all holiday parameters in key value pairs to be reference
   //by function display_country_info() to create dom elements to dispplay on the site page
   //like holiday images and co-ordinates latitute and longtitude to be passed into Google Maps/places api
   //to generate maps and place name markers.
   data = {
    "country" : {
      "Andorra": [
          {
            "coords": { "lat": "42.506317","lng":"1.521835"},
            "content": "Andorra",
            "Hol_type": "ski",
            "info": "Andorra is a budget skiing region for young adults.There is no direct flights from Ireland.",
            "pic" : "assets/images/andorra2.jpg"
          }
       ],
        "Austria": [
         {
           "coords": { "lat": "47.5162","lng":"14.5501"},
           "content": "Austria",
           "Hol_type": "ski",
           "info": "Austria is a popular skiing region for families",
           "pic" : "assets/images/austria1.jpg"
         }
       ],
        "France": [
         {
            "coords": { "lat": "46.2276","lng":"2.2137"},
            "content": "France",
            "Hol_type": "ski",
            "info": "France has popular skiing resorts with major town and cities within easy reach",
            "pic" : "assets/images/france1.jpg"
        }
      ],
        "Italy": [
      //41.8719° N, 12.5674°
          {
            "coords": { "lat": "41.8719","lng":"12.5674"},
            "content": "Italy",
            "Hol_type": "ski", 
            "info": "Italy has popular skiing resorts in Northern Italy bordering France,Switzerland and Austria", 
            "pic" : "assets/images/italy1.jpg" 
          }
      ],
        "Switzerland": [
      //46.8182° N, 8.2275
          {
            "coords": { "lat": "46.8182","lng":"8.2275"},
            "content": "Switzerland",
            "Hol_type": "ski", 
            "info": "Switzerland has world famous skiing resorts, can be expensive", 
            "pic" : "assets/images/switzerland1.jpg"  
          }
      ]
    }
  }; 
  /*
  This function initialize() takes in params that will be used in the google map api and google places api
  */
  function initialize(holtype,lat,lng) {
    console.log("INITIALIZE MAP WITH COORDS " + lat + " " + lng);
    var center = new google.maps.LatLng(lat,lng)
    var mapdiv = document.getElementById('map_desktop');
    map = new google.maps.Map(mapdiv, {
      center: center,
      zoom: 7
    });
    var request = {
      location: center,
      radius: 1200047, //500 miles
      keyword: holtype
    };

    //creates the google places api object by passing in the google map object
    var service = new google.maps.places.PlacesService(map);
    //then using the google places api object calls its nearbySearch method with params request key value pairs (hol_type, radius and plot from center)
    //also includes calling a callback function
    service.nearbySearch(request,callback);

    mapdiv.style.display = "block";
    mapdiv.style.height= "500px";
    mapdiv.style.width= "800px";
    var btn = document.createElement("button");
    btn.innerHTML = "BOOK";
    btn.onclick = function () {
      alert("You want to book a resort in " + place_info[0].name);
      place_info=[];
    };
    var container = document.getElementById('book_button');
    container.appendChild(btn);

  }
  function callback(results,status){

    if(status == google.maps.places.PlacesServiceStatus.OK){
      for (var i = 0; i < results.length; i++){
        createMarker(results[i]);
        place_info.push(results[i]);

      }
    }
    console.log("callback assigned into array index 0: " + place_info[0].name);

  }

  function placedetailalert(markerplace)
  {
    return markerplace;
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    if(place){
      var infoWindow = new google.maps.InfoWindow({
        content: 'Name: ' + place.name + '. Address: ' + place.vicinity + '. RATING: ' + place.rating + '. Business Status: ' + place.business_status

      });
    }

  }

  

  /*This function receives the holiday parameter passed for the Choose Holiday drop
    triggered by the Get Info button. It then uses a nested for loop to look through
    the Json object data for the Holiday type (hol_type - eg skiing, beach, City Tour)
    to assign to variables all countries that refer to this Hol_type, country info, country pic
    co-ordinates and assign to variables. In cases of country info new element p tags are created
    and for pic new element img tags are created and radio elements and its label are created an added
    to the DOM. To display on the site   
  */

  function display_country_info(hol_type){
  
    var country_num=0;
    for (var loc in data.country) {
    
       country_num = country_num + 1;
       for (var i = 0; i < data.country[loc].length; i++) {
       
           var loc_coords_lat =  data.country[loc][i].coords.lat;
           var loc_coords_lng = data.country[loc][i].coords.lng;
           var place = data.country[loc][i].content;
           var type_hol = data.country[loc][i].Hol_type;
           var type_info = data.country[loc][i].info;
           var type_pic = data.country[loc][i].pic;

           
           console.log('COUNTRY : ' + place + ', latitude= ' +  loc_coords_lat + ',  longtitude = ' + loc_coords_lng + ' , ' + type_hol + ' , info: ' + type_info + ' resort pic: ' + type_pic);
           
           var tag = document.createElement("p");
           var text = document.createTextNode("COUNTRY : " + place + "<br> latitude= " +  loc_coords_lat + "  longtitude = " + loc_coords_lng + " Holiday type: " + type_hol + " info: " + type_info);
           var radioYes = document.createElement("input");
           radioYes.setAttribute("type", "radio");
           radioYes.setAttribute("name", "mapselect");
           radioYes.setAttribute("value", place);
           //radioYes.setAttribute("onclick","country_coord2('"+place+"','"+type_hol+"','"+loc_coords_lat+"','"+loc_coords_lng+"');")
           
           //radio onclick event is bound to a function country_map which takes in params which will be used in call to google map api
           radioYes.setAttribute("onclick","country_map('"+type_hol+"','"+loc_coords_lat+"','"+loc_coords_lng+"');");
           
           var lblgenerateMap = document.createElement("lable");
           var textgenerateMap = document.createTextNode("select to generate Map");
           lblgenerateMap.appendChild(textgenerateMap);
           tag.appendChild(text);
           var country_div = "country" + country_num;
           var element = document.getElementById(country_div);
           var oImg = document.createElement("img");
           oImg.setAttribute('src', type_pic);
           oImg.setAttribute('alt', 'na');
           oImg.setAttribute('height', '150px');
           oImg.setAttribute('width', '150px');
           element.appendChild(oImg);
           element.appendChild(tag);
           element.appendChild(radioYes);
           element.appendChild(lblgenerateMap);
           

       }
    }
   
    
  }
  function alert_str(place){
    alert('hello from ' + place);
  }
  function country_coord(place,holtype){
    alert('hello from ' + place + ' enjoy your ' + holtype);
  }
  function country_coord2(place,holtype,lat,lng){
    alert('hello from ' + place + ' enjoy your ' + holtype + ' on the following latitude ' + lat + ' and longtitude ' + lng);
  }

  function checkRadioBtnSelected(hol_type){
    var getSelectedValue = document.querySelector( 'input[name="mapselect"]:checked');
     if(getSelectedValue != null) {
          alert("Selected radio button values is: " + getSelectedValue.value);
    }
 }
 /*This function will be used to call a function to google map api */ 
 function country_map(type_hol,selected_lat,selected_lng){
  // this passes the info here to a function which prepares a call to function which will use google map api and google places api
  google.maps.event.addDomListener(window, "load", initialize(type_hol,selected_lat, selected_lng));
}