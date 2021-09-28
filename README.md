# EUROHOL 

EUROHOL is a website where visitor can find accomadation for holiday types such as beach holiday, city holiday and skiing holiday and it will return the countries/cities that provide such holidays. 
Once a country is selected a google map is generated with markers of hotels/lodging where uses gets information on the particular marker.
When they click Book – the hotels/accommodation is populated in a dropdown list and another list is populated with the choice of airline to fly.
Select the hotel/accomodation and airline and select date and click submit to book holiday – which records it in booking history.

## Table of Contents
> - [Description](#description)
> - [Ux](#ux)
> - [Features](#features)
> - [Technologies Used](#technologies-used)
> - [Testing](#testing)
> - [Deployment](#deployment)
> - [Credits](#credits)
> - [Acknowledgments](#Acknowledgements)

# Description
A Euro holiday website which provides visitors the facility to look up locations for different holiday types around Europe. The website is intended to be accessible on all type of devices<br> mobile phone, tablet, laptop and desktop.

# UX

### Strategy
The object of the website is to inform visitor of different locations around Europe that cater for holiday type such as beach holiday, city breaks and skiing holidays. Providing location information and the ability to choose a resort/hotel, holiday date and airline to book. This booking will be saved to site holiday history.

### Business Goals
*  External user goals: <br>
   The site’s user are visitors looking to find information on holidaying around Europe according to holiday type (beach, city and skiing holidays)
   Then book holiday based on their choice of holiday.

* Site owner's goal: <br>
   To offer a site which is intuitive, easy to use for users. Where visitors can effortlessly find the lodging/accommodation for there choosen holiday type with minimum effort.

## User Stories
* As a First Time Visitor: <br>
    “I  would like to find holiday in Europe based on different holiday types”

“I  would like to find where I can book a skiing holiday resort choices around Europe”

“I  would like to book a holiday in Europe based on resort site information recommendations”

## Scope
This website incorporate Minimal Viable Product (MVP) elements.

   * Fullfills the needs of both the external user (visitors to the site) and business owner with features holiday type picker, google api map display based on country/city, map marker for resort/hotel with information and booking form for holiday.

   * Website not cluttered with too much information. Band and gig Information is clearly presented. Site is easy to navigate.

## Structure
The website comprises of one webpages. The page provides the visitor with information based on holiday type chosen populate countries where holiday type existing. From these countrys displayed a country is selected a map of the country is generated with map markers of the available resort/hotel.
A booking button is available to click on  which shows a form with the options(dropdown list) of the resort/hotels for the country to choose from, option(dropdown list) of airlines which fly there, a date picker and a submit button to submit your holiday choice. To enhance UX experience I have included a feature where the active site page button title name is underlined to inform user of what section he is on.

## Skeleton
In the main the wireframes more or less match my final project.
See links to relevent section of the wireframes below:
* desktop: <a href="wireframe/wireframe1_desktop.png" target="_blank" >Desktop Wireframe</a>
* mobile:  <a href="wireframe/wireframe2_mobile.png" target="_blank" >Mobile Wireframe</a>

##  Images
The images were choosen to convey a holiday vibe to entice the visitor to check out the site options. The images also blended in well with the 
sites colour scheme.

## Colours
I choose sky blue as background colour for the site. For the navigation bar and footer I choose a slightly darker blue. I feel this offers an easy on the eye
contrast.

## Typography
I used Google fonts to enhance some text sections of the site. I decided on Roboto with backup sans-serif for text headings on the home page.

# Features
  
  The site requires minimum input from the user<br>
    * Visitor/user selects a holiday type from the dropdown (Skiing, Beach or City Tour) then click's Get info button.<br>
    * The Get info button returns the countries that offer such holidays, the customer can choose a county and generate map.<br>
    * This map will show marker at different locations on the map. Clicking the map will provide information such as the name of the accommodation and its star rating.<br>
    * Clicking on the book button it will show a popup form asking for his name,a dropdown which contains the marker location name (Hotel, guesthouses), the date  
      he is looking to go, the airline choice. Once submitted it held in the Booking History menu option.<br>
      

# Technologies Used

* HTML
    * For basic website page structure / markup

* CSS3
    * CSS3 for styling the website pages aligning elements with padding, margins and I used Float for positioning elements 


* Bootstrap – to separate site into even grid sections. This allowed greater consistency in layout when interacting with site. 


* javascript
    * For making the site dynamic based on options selected – manipulating DOM

* google map/marker api
    * generating maps and markers based on site options


* Font Awesome
    * To provide social media icons for the page footer and for rating stars for Testimonial page. Accessed fontawsome from<br>
      its url as a link in the head of site Pages.
    
* Google Font
    * to make Paragraph Heading on Home page look clearer I used Roboto font-family referencing https://fonts.google.com/ CDN<br>
      in the style css.

# Testing

* Forms testing:<br>
  Testing was done by me, error was found where booking was allowed to be submitted without name and date. This was fixed by adding required for all fields
  in the form.
  
* Links (Internal & External): <br>
  The only external links on the site is Social Media links and they were tested ok.
  
Issue:<br>
For recording booking I use javascript local storage. In my testing I was checking the form fields as they were being passed to the function which looks after this
with console logging, it was passing over the values and assigning them to local storage. However it was not showiing in the Booking History menu option page, instead 
this was showing as blank.

fixed by:
By calling the window.addEventListener("load", function()  and assinging the localStorage.getItem to the specific Booking History fields.
fixed code with:
```
   window.addEventListener("load", function(){
     ....
     document.getElementById("cust_name").innerHTML=localStorage.getItem("customername_value");
     document.getElementById("selected_lodging").innerHTML=localStorage.getItem("accomdation_value");
     document.getElementById("flyin_airline").innerHTML=localStorage.getItem("airline_value");
     document.getElementById("selected_date").innerHTML=localStorage.getItem("date_value");
    }
```
As part of testing when developing used Chrome Developer tools, alert prompt to check variable status 
Also test functions like the following to check a radiobutton status when clicked next to a certain country
```
 function checkRadioBtnSelected(hol_type){
    var getSelectedValue = document.querySelector( 'input[name="mapselect"]:checked');
     if(getSelectedValue != null) {
          alert("Selected radio button values is: " + getSelectedValue.value);
    }
 }
```
There is checks what view the site is been viewed on mobile/desktop
```
function is_DesktopMap_Div(){
  //check the device views site is larger than mobile view
    var query = window.matchMedia("(min-width: 601px)");
    if (query.matches){
        return true;
    }else{
        return false;
    }
  }
```
This true false can be used in javascript other function to generate or remove or hide elements/chile nodes.




Ran the website url in responsive design site such as http://ami.responsivedesign.is
Which shows the site rendering correctly accross different device screens. 
http://ami.responsivedesign.is/?url=https://djmolloy57.github.io/project2_eurolodge/

I ran the site url through Google Mobile Friendly Test which confirmed site is mobile friendly see link:
https://search.google.com/test/mobile-friendly?id=VvnGk4nzNT3V0jJ9iwrycw


I tested the website on various device 
* Android mobile phones:  
  * Samsung: Galaxy A21e 

* IOS mobile phone
  * iphone 7 

* Android Samsung Tablet:  
  *  Samsung Tab A 10.1 

* Window Surface:
  *  Windows Surface Go.

* Mac OSX :
  * Mac Book Pro  

* Windows 10 :
  * Acer Nitro 15.6 inch - 1920x1080 IPS display
  * external 21 inch Samsung Monitor 1366 x 768

I tested on the websites in the following browsers
 * Chrome
 * Firefox
 * Safari

## Remaining issues:
On Tab A 10.1 top images still veering to the right 



# Deployment
Local git repository was initated in the begining of this project, gitpod and IDE  was used to write the code for this project and regular commits 
were done throughout the site development and were pushed to remote repository on https://github.com<br>
My project GitHub repository can be found here:

The site was deployed to GitHub pages. https://github.com/djmolloy57/project2_eurolodge/<br> 

Steps to deploy are as follows:<br>
* In the GitHub repository, navigate to the Settings tab<br>
* From the source section drop-down menu, select the Master Branch.<br> 
* Once the master branch has been selected, the page will be automatically refreshed<br> 
with a detailed ribbon  display to indicate the successful deployment.<br>

To run it on your local machine you can select "clone" which provides an URL you can use to open in the Github Desktop app
or you can select "download" which downloads the repository zip files on to the local machine.

The live link can be found here: https://djmolloy57.github.io/project2_eurolodge/

Note for this project you will need the Google Map and Places API which you can get if you signup for google account.
The google api url is a script url which will be placed at the bottom of the index page alongside the other javascript urls.

# Feature would like:
  It would be nice to have an api to airlines to get pricing.

# Credits

## Media
  * The photos used in this site were obtained from https://pexels.com 
    
   
## Acknowledgements

   * Nav menu and Mobile burger menu was heavily borrowed from Code Insitute Whickey Go project.
    
   * Got helpful hints on solving issue from https://stackoverflow.com/

   
   
   * 


