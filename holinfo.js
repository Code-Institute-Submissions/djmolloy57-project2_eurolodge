window.addEventListener("load", function(){

    var country_divs = document.getElementById('hol_display');
    var div_display_state = getComputedStyle(country_divs).display;

     document.getElementById("cust_name").innerHTML=localStorage.getItem("customername_value");
     document.getElementById("selected_lodging").innerHTML=localStorage.getItem("accomdation_value");
     document.getElementById("flyin_airline").innerHTML=localStorage.getItem("airline_value");

     if (div_display_state === "flex"){
      country_divs.style.display = "none";
   }

  });
  
/* Function Triggered on Windows Resizing event */
function reportWindowSize(){
  // on resizing window if in mobile view and generated maps and change to non mobilr view it wont display mobile maps

  let query = window.matchMedia("(min-width: 601px)");
 
  if (query.matches){
        //if the page is wider than 600px

        device_view_map = "map_desktop";

        var mobile_map_frame=[];
        var mobile_btn_frame=[];

        for(var i= 1; i < 6; i++){
           mobile_map_frame[i] = document.getElementById("map"+i);
           mobile_map_frame[i].style.display = "none";
           mobile_btn_frame[i] =  document.getElementById("button"+i);
           mobile_btn_frame[i].style.display = "none";
        }

   }
   else {
       //device_view_map = map_div;
      var desktop_map_frame =  document.getElementById("map_desktop"); //tested by generating map on desktop view and reducing it to mobile view the desktop map should dissappear
      desktop_map_frame.style.display = "none"; 

      var desktop_btn_frame =  document.getElementById("book_button");
      desktop_btn_frame.style.display = "none";
  }

  
}

window.onresize = reportWindowSize;

  
  
/*This is the only Choose holiday type Get info button event */
  const hol_btn = document.querySelector('#hol_btn');
  const hol_picked = document.querySelector('#hol_picked');

  hol_btn.onclick = (event) => {
        document.getElementById("hol_btn").disabled = true;
        event.preventDefault();
        console.log(hol_picked.value);
        
      
        getholCountry(hol_picked.value);
  };

  hol_btn.onchange = () => {

    alert("changing event!!!");
  }

  function enablebutton(){
    document.getElementById("hol_btn").disabled = false;

    var map_div = document.getElementById("hol_display"); //above link worked fix the map div to be visible
    var displayState = getComputedStyle(map_div).display;
    console.log("changing HolidayType 1st holiday element is visible? " + displayState);

    var div_desktop_container = document.getElementById("desktop_container");
    var div_desktop_book_button = document.getElementById("book_button");
    var div_desktop_map =  document.getElementById("map_desktop");
    
    var country_num=[];
    var div_locpic_num=[];
    var div_locinfo_num=[];
    var div_radio_dot_num=[];
    var div_label_dot_num=[];
    var div_labelmap_num=[];
    var mobile_map_frame_num=[];

    var checked_div_locpic_num = "";
    var checked_div_locinfo_num = "";
    var checked_div_radio_dot_num ="";
    var checked_div_label_dot_num = "";
    var checked_div_labelmap_num = "";


    for(var i= 1; i < 6; i++){
       country_num[i] = document.getElementById("country"+i);

       div_locpic_num[i] = document.getElementById("loc_pic"+i);

       div_locinfo_num[i]= document.getElementById("loc_info"+i);

       div_radio_dot_num[i] = document.getElementById("radio_dot"+i);

       div_label_dot_num[i] = document.getElementById("label_dot"+i);

       div_labelmap_num[i] = document.getElementById("label_map"+i);

       if (typeof(div_locpic_num[i]) != 'undefined' && div_locpic_num[i] != null)
       {
          checked_div_locpic_num = div_locpic_num[i];
       }
       if (typeof( div_locinfo_num[i]) != 'undefined' &&  div_locinfo_num[i] != null)
       {
          checked_div_locinfo_num =  div_locinfo_num[i];
       }
       if (typeof(div_radio_dot_num[i]) != 'undefined' &&   div_radio_dot_num[i] != null)
       {
          checked_div_radio_dot_num = div_radio_dot_num[i];
       }
       if (typeof(div_label_dot_num[i]) != 'undefined' &&   div_label_dot_num[i] != null)
       {
          checked_div_label_dot_num = div_label_dot_num[i];
       }
       if (typeof(div_labelmap_num[i])!= 'undefined' &&  div_labelmap_num[i] != null)
       {
          checked_div_labelmap_num = div_labelmap_num[i];
       }
       remove_old_elements(country_num[i],checked_div_locpic_num,checked_div_locinfo_num,checked_div_radio_dot_num,checked_div_label_dot_num,checked_div_labelmap_num);
    }
    /*To determine if you are in desktop view or mobile view - desktop view on have to hide the desktop container
      else you are in mobile view and their may have been a number of map location that have been generated on last holiday choice and have to be removed!!
    */
    alert("whats display state: " + displayState);
    if (is_DesktopMap_Div()){
        alert("Your in desktop view!!");
        var desktop_container_map =  document.getElementById("desktop_container");
        desktop_container_map.style.display = "none";
    }else{
        alert("Your in mobile view!!");
        map_div.style.display = "none";
        var map_div_parent_node = document.getElementById('hol_display').children;
        if (map_div.children.length > 0){
          map_children = map_div.children;

          for (let i = 0; i < map_children.length; i++) {

             if (map_children[i].style.display=='block') {

               country_id = "country" + map_children[i].id.slice(-1);
               map_children[i].style.display = "none";
             }
          }

        }
    }

 }
     
  

  function remove_old_elements(country_num,div_locpic_num,div_locinfo_num,div_radio_dot_num,div_label_dot_num,div_labelmap_num){



        country_num.removeChild(div_locpic_num);
        country_num.removeChild(div_locinfo_num);
        country_num.removeChild(div_radio_dot_num);
        country_num.removeChild(div_label_dot_num);
        country_num.removeChild(div_labelmap_num);
    
    
    
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
          {
            "coords": { "lat": "46.8182","lng":"8.2275"},
            "content": "Switzerland",
            "Hol_type": "ski", 
            "info": "Switzerland has world famous skiing resorts, can be expensive",
            "airlines": ["Aer Lingus","British Airways","Swiss Air"], 
            "pic" : "assets/images/switzerland1.jpg"  
          }
      ],

      
      "Southern_Spain": [
        {
          "coords": { "lat": "36.7212","lng":"4.4217"},
          "content": "South Spain",
          "Hol_type": "beach", 
          "info": "South Spain has many resorts for budget holiday",
          "airlines": ["Aer Lingus","Iberia","RyanAir"],
          "loc_radius" : "240000", //100miles
          "pic" : "assets/images/southern_spain.jpg"  
        }

    ],
    
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
    ],

    "Berlin": [
      {
        "coords": { "lat": "52.5200","lng":"13.4050"},
        "content": "Berlin",
        "Hol_type": "tour",
        "info": "Berlin city capital of Germany, large city, with famous landmarks, and underground dance culture", //will need to be an array - Need different info each holiday type
        "airlines": ["Aer Lingus","Lufthansa","British Airways"],
        "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
        "pic" : "assets/images/berlin.jpg"  
      }
    ],

    "Dublin": [
      {
      //"coords": { "lat": "53.3498","lng":"6.2603"},
      "coords": { "lat": "53.33306","lng":"6.24889"},
      "content": "Dublin",
      "Hol_type": "tour",
      "info": "Dublin city capital of Ireland, river liffey runs through it, friendy city, with famous pubs,hotels and restaurants", //will need to be an array - Need different info each holiday type
      "airlines": ["Aer Lingus","RyanAir","British Airways"],
      "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
      "pic" : "assets/images/dublin1.jpg"  
      }
    ],

    "London": [
      {
        "coords": { "lat": "51.5074","lng":"0.1278"},
        "content": "London",
        "Hol_type": "tour", 
        "info": "London city capital of England, Thames river runs through it, large city, with famous landmarks,hotels and restaurants", //will need to be an array - Need different info each holiday type
        "airlines": ["Aer Lingus","RyanAir","British Airways, EasyJet"],
        "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
        "pic" : "assets/images/london.jpg"  
      }
    ],

    "Paris": [
      {
        "coords": { "lat": "48.8566","lng":"2.3522"},
        "content": "Paris",
        "Hol_type": "tour", 
        "info": "Paris city capital of France,Saine river runs through it, large city, with famous landmarks,hotels and restaurants", //will need to be an array - Need different info each holiday type
        "airlines": ["Aer Lingus","Air France","British Airways, EasyJet"],
        "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
        "pic" : "assets/images/paris.jpg"  
      }
    ],

    "Rome":  [
      {
        "coords": { "lat": "41.9028","lng":"12.4964"},
        "content": "Rome",
        "Hol_type": "tour", 
        "info": "Rome city capital of Italy,Tiber river runs through it, large city, with famous landmarks,hotels and restaurants", //will need to be an array - Need different info each holiday type
        "airlines": ["Aer Lingus","Air Italia","British Airways, RyanAir"],
        "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
        "pic" : "assets/images/rome.jpg"  
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

    alert("I am in getholCountry!!");
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
      
      alert("You picked skiing");
      display_country_info(options);
    }
    if(hol_type === 'Beach'){
      options = ["Southern_Spain", "Portugal", "Southern_France", "Southern_Italy","Croatia" ,"Greece"];
      //alert("Beach holiday type is picked!!");
      display_country_info(options); //ERROR! at getholCountry (holinfo_javascript_test.js:431)

      //  //Southern_Spain, Portugal, Southern_France, Southern_Italy, Croatia, Greece
    }
    if(hol_type === 'City'){
      options= ["Berlin","Dublin","London","Paris","Rome"];
     
      display_country_info(options);
   }

  }  
 


  /*
  This function initialize() takes in params that will be used in the google map api and google places api
  */
  function initialize(holtype,lat,lng,device_map,button_div,airlines_arr) { 

    
    console.log("IN START OF MAP INITIALIZE function device_map is  " + device_map); //WORKING!!!

    console.log("INITIALIZE MAP WITH COORDS " + lat + " " + lng);

    //ensure desktop map is displaying after it was previously set to display none by function enablebutton()
    var desktop_container_map =  document.getElementById("desktop_container");
    desktop_container_map.style.display = "block";
    desktop_container_map.style.paddingTop = "10px";
    desktop_container_map.style.MarginTop = "10px";




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
      //alert("new button created which is button" + button_div);
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
        
        //new add
        removeOptions(airlines);
        
        console.log("LOOOK HEEERE!!!");
        console.log("1st element in Airlines array contains: " + airlines_arr.split(',')[0]);


        for(var i = 0; i < airlines_arr.length; i++) {
          var opts = airlines_arr.split(',')[i]; //got this from site - https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-jquery-or-javascript
          console.log('An element of Airlines array taken from json data var: ' + opts);
          
          //new add
          if(opts === undefined){
            continue;
          }
          var ele = document.createElement("option");
          ele.textContent = opts;
          ele.value = opts;
          airlines.appendChild(ele);
        }
      
        window.location.href='#booking_form';


    };

  }
  //add new
  function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
      selectElement.remove(i);
    }
  }

 
  function callback(results,status){

    //add new
    var sel = document.getElementById('resort');
    for (i = sel.length - 1; i >= 0; i--){
        sel.remove(i);
    }

    //add new
    if (place_info.length > 0) {
      place_info = [];
    }



    if(status == google.maps.places.PlacesServiceStatus.OK){
      for (var i = 0; i < results.length; i++){
        createMarker(results[i]);
        place_info.push(results[i]);

      }
    }
    //console.log("callback assigned into array index 0: " + place_info[0].name);

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

  

    //add new to ensure hol_display section is displayed
    var map_div = document.getElementById("hol_display");
    map_div.style.display = "flex";

    var country_num=0; //initialise variable used to be added as counter for country1,country2.. elements on site page for all views
    var map_num=0; //initialise variable used to be added as counter for map1, map2.. elements on the site page for mobile view 
    var attr_num=0;

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
           

           var sel_generateMap = document.createElement("label");
           var textgenerateMap = document.createTextNode("select to generate Map");

           sel_generateMap.setAttribute('id', 'label_dot' + attr_num);       

           sel_generateMap.appendChild(textgenerateMap);

           lblgenerateMap = document.createElement("label");
           lblgenerateMap.setAttribute('id', 'label_map' + attr_num);
                                          
           
           var country_div = "country" + country_num;
           console.log("what country_div is generated " + country_div);
           
           var element = document.getElementById(country_div);
           var oImg = document.createElement("img");
           oImg.setAttribute('src', type_pic);

           oImg.setAttribute('alt', 'na');
           oImg.setAttribute('height', '150px');
           oImg.setAttribute('width', '150px');
           oImg.setAttribute('id', 'loc_pic' + attr_num);
           
           if (typeof(oImg) != 'undefined' && element != null)
           {
              element.appendChild(oImg);
           }
           if (typeof(tag) != 'undefined' && element != null)
           {
              element.appendChild(tag);
           }
           if (typeof(radioYes) != 'undefined' && element != null)
           {
              element.appendChild(radioYes);
           }
           if (typeof(sel_generateMap) != 'undefined' && element != null)
           {
              element.appendChild(sel_generateMap);
           }

           if (typeof(lblgenerateMap) != 'undefined' && element != null)
           {
              element.appendChild(lblgenerateMap);
           }

           
           

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

 function is_DesktopMap_Div(){
  //check the device views site is larger than mobile view
    var query = window.matchMedia("(min-width: 601px)");
    if (query.matches){
        return true;
    }else{
        return false;
    }
  }
 
 /*This function will be used to call a function to google map api */ 
  function country_map(type_hol,selected_lat,selected_lng, map_div, button_div ,airlines_arr){
    var device_view_map = "";
    
    alert("I am in country map function passing params over to initializer function for google maps");
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
 /*The function is below it to write values in the Booking for to a seperate booking history page  */
 function passvalues()
 {
   var customer_name = document.getElementById("formName").value;
   var accomodation_name = document.getElementById("resort").value;
    
   alert("I am in the passvalue funtcion");

   var select = document.getElementById('airlines');
   var selected_airline = select.options[select.selectedIndex].value;

   localStorage.setItem("customername_value",customer_name);
   localStorage.setItem("accomdation_value",accomodation_name);
   localStorage.setItem("airline_value",selected_airline);
   
   document.getElementById("cust_name").innerHTML=localStorage.getItem("customername_value");
   document.getElementById("selected_lodging").innerHTML=localStorage.getItem("accomdation_value");
   document.getElementById("flyin_airline").innerHTML=localStorage.getItem("airline_value");

   alert("Your details are booked!! Please see Booking History Menu");

   return true;



 }



   

   



  
