Objective
Control A LimitlessLED RGB light via a Ninja block using location data
Proof of technology
Using an iphone running Google latitude, extract data using google latitude API, determine distance to a fixed location (home), change colour of light depending on  distance from home via the Ninja API


Why
because I thought it would be cool, Why Ninja - the Abstraction from device implementation
means this could control Nina's eyes, turn on/off lights, brew a coffee with little or no code
change


Technology


Aging iphone 4s running google latitude 
a Node.js app accessing the latitude
A couple of node.js scripts (running on Windows 7)
Ninja block API
Ninja block dashboard
Nina's lovely eyes or a LimitlessLED light


High level steps


Configure google app with access to latitude
Authorize the gps_lighting app to access google latitude
Configure the device (in code at the sec) with your details
Restart the ninjaclient and see you anew temperature device appear with your distance


Process


1) Create or update an application for google
https://code.google.com/apis/console/
Create the application
Select google latitude under services
Configure api access
Make sure it is Installed Application and other (application type)
 
Client ID for installed applications
Client ID:        myclientid.apps.googleusercontent.com
Client secret:        ljxxxxxxxxxxxxxxxxxxx
You will need to keep Client ID  == client_id ,  and Client Secret == client_secret


2. Get the code from https://github.com/chrisn-au/gps_ninja 

Install the geolib library npm install geolib A great node.js library for distances between co-ordinates(thanks manuel)
Install the https://github.com/chrisn-au/gps_ninja into your NinjaClient/drivers directory

3. Configure and run authenticate script (found in ./lib(
gps_ninja_authenticate.js
This script (developed as a part of my learning) is an to attempt to simplify doing the upfront OAuth2 authentication with the google API. At a minimum it should give a guide on how to use the google oauth2 APIs.

Read https://developers.google.com/accounts/docs/OAuth2InstalledApp for further info.

Retrieve the client_id and client_secret from the google app registration and update in the script.

Run the script "node gps_ninja_authenticate.js"  and assuming the deities are shining on you you will receive the 
refresh_token and device_id  which along with client_id and client_secret and update the gps_lights_run.js script.


3. Configure the driver (will use Dans new mechanism one day

Edit gpslatiude.js and update refresh_token; client_id;client_secret

You will need also to update youe  latitude and longitude of your fixed point in gpsninja, 

4. Restart the NinjaClient and watch console for messages).All working you will have a new Temperature device on your dashboard with updates on distance from the point
