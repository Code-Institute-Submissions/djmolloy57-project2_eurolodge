  /*This is the only Choose holiday type Get info button event */
  const hol_btn = document.querySelector('#hol_btn');
  const hol_picked = document.querySelector('#hol_picked');

  hol_btn.onclick = (event) => {
        document.getElementById("hol_btn").disabled = true;
        event.preventDefault();
        console.log(hol_picked.value);
        //display_country_info(hol_picked.value); //holiday type picked from dropdown to pass to display_country_info Function to display relevant countres
      
        getholCountry(hol_picked.value);
  };
  function enablebutton(){
    document.getElementById("hol_btn").disabled = false;

    var desktop_container_map =  document.getElementById("desktop_container");
    desktop_container_map.style.display = "none";
    //style.display = "block";


    var map_div = document.getElementById("hol_display"); //above link worked fix the map div to be visible
    var displayState = getComputedStyle(map_div).display;
    console.log("changing HolidayType 1st holiday element is visible? " + displayState);
  }
  

   
   var place_info = [];
   var btn=null;
   
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
            "airlines": ["Air France","Lufthansa","RyanAir"],
            "pic" : "assets/images/andorra2.jpg"
          }
       ],
        "Austria": [
         {
           "coords": { "lat": "47.5162","lng":"14.5501"},
           "content": "Austria",
           "Hol_type": "ski",
           "info": "Austria is a popular skiing region for families",
           "airlines": ["Lauda Air","Lufthansa","RyanAir"],
           "pic" : "assets/images/austria1.jpg"
         }
       ],
        "France": [
         {
            "coords": { "lat": "46.2276","lng":"2.2137"},
            "content": "France",
            "Hol_type": "ski",
            "info": "France has popular skiing resorts with major town and cities within easy reach",
            "airlines": ["Aer Lingus","Air France","RyanAir"],
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
            "airlines": ["Aer Lingus","Air Italia","British Airways"],
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
            "airlines": ["Aer Lingus","British Airways","Swiss Air"], 
            "pic" : "assets/images/switzerland1.jpg"  
          }
      ],

      //add new
      "Southern_Spain": [
        {
          "coords": { "lat": "36.7212","lng":"4.4217"},
          "content": "South Spain",
          "Hol_type": "beach", //In latter version this will need to be an array to cover the other holiday types for Switzerland
          "info": "South Spain has many resorts for budget holidays", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","Iberia","RyanAir"],
          "loc_radius" : "240000", //100miles
          "pic" : "assets/images/southern_spain.jpg"  //will need to be an array
        }

    ],
    //38.7223° N, 9.1393° W
    "Portugal": [

        {
          "coords": { "lat": "38.7223","lng":"9.1393"},
          "content": "Portugal",
          "Hol_type": "beach", //In latter version this will need to be an array to cover the other holiday types for Switzerland
          "info": "Portual has many resorts along its beautiful coast near the famous city Lisbon", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","Tap Air","British Airways"],
          "loc_radius" : "240000", //100miles
          "pic" : "assets/images/portugal.jpg"  //will need to be an array
        }

    ],
    //43.7102° N, 7.2620° E
    "Southern_France": [

        {
          "coords": { "lat": "43.7102","lng":"7.2620"},
          "content": "Southern France",
          "Hol_type": "beach", //In latter version this will need to be an array to cover the other holiday types for Switzerland
          "info": "Southern France has many exclusive resorts for the refined traveler in Nice, Caan and Monaco", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","Air France","British Airways"],
          "loc_radius" : "240000", //100miles
          "pic" : "assets/images/southern_france.jpg"  //will need to be an array
        }

    ],
    //40.8518° N, 14.2681
    "Southern_Italy": [

        {
          "coords": { "lat": "40.8518","lng":"14.2681"},
          "content": "Southern Italy",
          "Hol_type": "beach", //In latter version this will need to be an array to cover the other holiday types for Switzerland
          "info": "Southern Italy has many resorts along the Amalfi coast south of Naples", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","Air Italia","British Airways"],
          "loc_radius" : "240000", //100miles
          "pic" : "assets/images/southern_italy.jpg"  //will need to be an array
        }

    ],
    //42.6507° N, 18.0944
    "Croatia": [

        {
          "coords": { "lat": "42.6507","lng":"18.0944"},
          "content": "Croata",
          "Hol_type": "beach", //In latter version this will need to be an array to cover the other holiday types for Switzerland
          "info": "Croatia has many resorts along its beautiful coast near famous castle city of Debrovnic", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","RyanAir","British Airways"],
          "loc_radius" : "240000", //100miles
          "pic" : "assets/images/croatia.jpg"  //will need to be an array
        }

    ],
    //37.9838° N, 23.7275° E
    "Greece": [

        {
          "coords": { "lat": "37.9838","lng":"23.7275"},
          "content": "Greece",
          "Hol_type": "beach", //In latter version this will need to be an array to cover the other holiday types for Switzerland
          "info": "Greece has many beautiful Islands with beautiful beaches and coves", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","EasyJet","British Airways"],
          "loc_radius" : "240000", //100miles
          "pic" : "assets/images/greece.jpg"  //will need to be an array
        }
    ]


    }
  }; 
  
  /*
  This function gathers holiday type and its associated country - I have a feeling its not needed as we are just passing the it parameter
  hol_type to another function display_country_info
  */
  function getholCountry(hol_type){
    //removeOptions(document.getElementById('selectNumber'));
    var infodiv = document.getElementById('site_info'); //above link worked fix the map dive to be visible
    var div_display_state = getComputedStyle(infodiv).display;

    /*alert("trying to generate map to div map1_1 the display state is " + display_state);// shows overflow state is showing as hidden*/

    if (div_display_state == "block") {
                infodiv.style.display = "none";
                /*mapdiv.style.height= "500px";
                mapdiv.style.width= "800px";*/
                /*alert("trying to generate map to div map1_1 the display state is " + display_state);*/
    }
    console.log("in function getholCountry passed in holiday type is: " + hol_type);
    var options = [];
    var select = document.getElementById("selectNumber");

    if(hol_type === 'Skiing'){
      options = ["Andorra", "Austria", "France", "Italy","Switzerland"];
      //display_country_info(hol_type);
      display_country_info(options);
    }
    if(hol_type === 'Beach'){
      options = ["Southern_Spain", "Portugal", "Southern_France", "Southern_Italy","Croatia" ,"Greece"];
      alert("Beach holiday type is picked!!");
      display_country_info(options); //ERROR! at getholCountry (holinfo_javascript_test.js:431)

      //  //Southern_Spain, Portugal, Southern_France, Southern_Italy, Croatia, Greece
    }

  }  


  /*
  This function initialize() takes in params that will be used in the google map api and google places api
  */
  function initialize(holtype,lat,lng,device_map,button_div,airlines_arr) { 

    console.log("INITIALIZE MAP WITH COORDS " + lat + " " + lng);
    var center = new google.maps.LatLng(lat,lng)
    
    // device_map (which maybe desktop ver or mobile ver)
    map = new google.maps.Map(document.getElementById(device_map), {
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


    var mapdiv = document.getElementById(device_map); //above link worked fix the map div to be visible
    var display_state = getComputedStyle(mapdiv).display;


    //If div display is none and if its being viewed on a desktop then display it with height 500px and width 800px in center div id=map_desktop
    if (display_state == "none" && device_map == "map_desktop") {
                mapdiv.style.display = "block";
                mapdiv.style.height= "500px";
                mapdiv.style.width= "800px";
                /*alert("trying to generate map to div map1_1 the display state is " + display_state);*/
    }
    /*else If div display is none and its its being viewed on a mobile device then display it with height 300px and width 400px in
    div id=map1 or id=map2 etc - depending which country is clicked
    */
   else if (display_state == "none" && device_map != "map_desktop"){
                mapdiv.style.display = "block";
                mapdiv.style.height= "300px";
                mapdiv.style.width= "400px";
    }


    /* a condition to only create book button if it doesnt exist */ 
    if (btn === null){      
      btn = document.createElement("button");
      btn.innerHTML = "BOOK";
    }
    if (display_state == "none" && device_map == "map_desktop") {
        
      var container = document.getElementById("book_button");//this is the desktop button div 
      container.appendChild(btn);
      console.log("IN END OF MAP INITIALIZE function device_map is  " + device_map);
    }
    else if (display_state == "none" && device_map != "map_desktop"){

      console.log("IN END OF MAP INITIALIZE function device_map is  " + device_map);
      var container_mobile =  document.getElementById(button_div); //since non desktop referencing mobile button div button1, button2 ... 
      alert("new button created which is button" + button_div);
      container_mobile.appendChild(btn);
    }  


    btn.onclick = function () {
        alert("You want to book a resort in " + place_info[0].name);
        //place_info=[];
        /*added here 15:20 today add code below where book button info  is moved to booking forms dropdown */
        //This adds marker info on map - book button moves it to booking form resort dropdown
        console.log("You want to book a resort in " + place_info[0].name + "going to loop through places to add to resort dropdown");
        var select = document.getElementById("resort");
        for(var i = 0; i < place_info.length; i++) {
          var opt = place_info[i].name;
          console.log("add place: " + opt);
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
        }

        //This adds airlines which selected country moves it to booking form airlines dropdown
        //using the airlines_arr array which was passed into this initialize function 
        var airlines= document.getElementById("airlines");
        ////const myObj = JSON.parse(airlines_arr);
        console.log("LOOOK HEEERE!!!");
        console.log("1st element in Airlines array contains: " + airlines_arr.split(',')[0]);


        for(var i = 0; i < airlines_arr.length; i++) {
          var opts = airlines_arr.split(',')[i]; //got this from site - https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-jquery-or-javascript
          console.log('An element of Airlines array taken from json data var: ' + opts);
          var ele = document.createElement("option");
          ele.textContent = opts;
          ele.value = opts;
          airlines.appendChild(ele);
        }
      
        window.location.href='#booking_form';


    };

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
    /*added listener on click on marker to show places info*/ 
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
  
      alert('Clicking on marker!!');
     });

  }

  

  /*This function receives the holiday parameter passed for the Choose Holiday drop
    triggered by the Get Info button. It then uses a nested for loop to look through
    the Json object data for the Holiday type (hol_type - eg skiing, beach, City Tour)
    to assign to variables all countries that refer to this Hol_type, country info, country pic
    co-ordinates and assign to variables. In cases of country info new element p tags are created
    and for pic new element img tags are created and radio elements and its label are created an added
    to the DOM. To display on the site   
  */

  function display_country_info(hol_countries){
  
    var country_num=0; //initialise variable used to be added as counter for country1,country2.. elements on site page for all views
    var map_num=0; //initialise variable used to be added as counter for map1, map2.. elements on the site page for mobile view 
     var attr_num=0;

    //for (var loc in data.country) {
    for (var loc in hol_countries) {
       country_num = country_num + 1;
       map_num = map_num + 1;
       
       
       attr_num= attr_num + 1;

       for (var i = 0; i < data.country[hol_countries[loc]].length; i++) {
           
           var loc_coords_lat =  data.country[hol_countries[loc]][i].coords.lat;
           var loc_coords_lng = data.country[hol_countries[loc]][i].coords.lng;
           var place = data.country[hol_countries[loc]][i].content;
           console.log("referencing " + hol_countries[loc] + " PLACE PICKED in the data json object which are " + place);

           var type_hol = data.country[hol_countries[loc]][i].Hol_type;
           var type_info = data.country[hol_countries[loc]][i].info;
           var type_pic = data.country[hol_countries[loc]][i].pic;

           var airlines_arr =  data.country[hol_countries[loc]][i].airlines;

           
           console.log('COUNTRY : ' + place + ', latitude= ' +  loc_coords_lat + ',  longtitude = ' + loc_coords_lng + ' , ' + type_hol + ' , info: ' + type_info + ' resort pic: ' + type_pic + ' one of the airlines who flies there ' + airlines_arr);
           
           var tag = document.createElement("p");
           var text = document.createTextNode("COUNTRY : " + place + "<br> latitude= " +  loc_coords_lat + "  longtitude = " + loc_coords_lng + " Holiday type: " + type_hol + " info: " + type_info);
           
           tag.setAttribute('id', 'loc_info' + attr_num);
           
           tag.appendChild(text);


           var radioYes = document.createElement("input");
           radioYes.setAttribute("type", "radio");
           radioYes.setAttribute("name", "mapselect");
           radioYes.setAttribute("value", place);

           radioYes.setAttribute('id', 'radio_dot' + attr_num);
           
           var map_div = "map" + map_num; //variable to be used to reference the map divs for mobile view on site page to pass to country_map()

           var button_div = "button" + map_num; //variable record button number eg button1, button2... to pass to country_map()

           radioYes.setAttribute("onclick","country_map('"+type_hol+"','"+loc_coords_lat+"','"+loc_coords_lng+"','"+map_div +"','"+button_div +"','"+airlines_arr+"');");
           

           var lblgenerateMap = document.createElement("lable");
           var textgenerateMap = document.createTextNode("select to generate Map");

           lblgenerateMap.setAttribute('id', 'label_dot' + attr_num);

           lblgenerateMap.appendChild(textgenerateMap);
                                          
           
           var country_div = "country" + country_num;
           console.log("what country_div is generated " + country_div);

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
  function country_map(type_hol,selected_lat,selected_lng, map_div, button_div ,airlines_arr){
    var device_view_map = "";
    //check the device views site is larger than mobile view then map div will be using the div map_desktop at center of screen 
    var query = window.matchMedia("(min-width: 601px)");
    if (query.matches){
      //if the page is wider than 600px
      device_view_map = "map_desktop";
    }
    else {
      device_view_map = map_div; //then the map div will be for mobile view map1, map2 etc
    }
    console.log("device_view_map is: " + device_view_map);

  // this passes the info here to a function which prepares a call to function which will use google map api and google places api
  google.maps.event.addDomListener(window, "load", initialize(type_hol,selected_lat, selected_lng,device_view_map, button_div ,airlines_arr));

}