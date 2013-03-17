var stream = require('stream')
  , util = require('util');

// Give our device a stream interface
util.inherits(gpslatitude,stream);

// Export it
module.exports=gpslatitude;

var https = require('https');
var geolib = require('geolib');


function gpslatitude(cb)
{
  self = this;
   
  this.secret_token = 'abc'; // this will be set by refresh token
  this.current_lat = 1.0;
  this.current_lng = 1.0;
   
  this.client_secret = '; //from your new google console
  this.client_id = 'qglop.apps.googleusercontent.com';//from google console
  this.ref_token ='1Q'; //from register
  this.refresh_token(cb);
  
  
  this._interval = setInterval(function() {
          self.refresh_token(cb);
  },330000);
};

gpslatitude.prototype.updateLocation = function(cb)
{
   var self = this;
   var myTimeout = 5000; 
   var header = {"Authorization":  "Bearer " + self.secret_token}; 
   var path_token = '/latitude/v1/currentLocation?access_token='+self.secret_token+"&granularity=best";
   
         
   var options = {
    host: 'www.googleapis.com',
    port: 443,
    path: path_token,
    method: 'GET',
    headers: header
   }
   
   callback = function(response) {
      var str = '';
      response.on('data', function (chunk) {
      str += chunk;
   });

    response.on('socket', function (socket) {
          socket.setTimeout(myTimeout);  
          socket.on('timeout', function() {
          console.log("time out - get location");
          // log it and move on hopefully temporary
          response.abort();
          });
    });
    
     response.on('end', function () {
        
        var obj = JSON.parse(str)
        
        if (response.statusCode == 200)
        {
            
           var obj = JSON.parse(str)
           
           self.current_lat = obj.data.latitude;
           self.current_lng = obj.data.longitude;
           self.current_ts = obj.data.timestampMs
                         
           cb();
           
         }
        else console.log("Error: gps "+ response.statusCode ); 
    });
  }
 
  https.request(options, callback).end(); 
  
};

 
gpslatitude.prototype.refresh_token = function(cb) 
{

    var self = this;
    var querystring = require('querystring');  
    var post_domain = 'accounts.google.com';  
    var post_port = 443;  
    var post_path = '/o/oauth2/token';  
    var grant_refresh = "refresh_token"
    
    var post_data = querystring.stringify({'client_id': self.client_id, 'client_secret' : self.client_secret,
                                        'refresh_token' : self.ref_token, 'grant_type' : grant_refresh });  
                                         
      
    var post_options = {  
       host: post_domain,  
       port: post_port,
       path: post_path,  
       method: 'POST',  
       headers: {  
         'Content-Type': 'application/x-www-form-urlencoded',  
         'Content-Length': post_data.length  
          }  
    };  
  
    var post_req = https.request(post_options, function(res) {  
       res.setEncoding('utf8');
       var data ='';  
       
       res.on('data', function (chunk) {  
       data = data + chunk;  
       });  
  
       res.on('end', function () {
          var obj = JSON.parse(data);
      //    console.log(obj); 
          if  (res.statusCode == 200)
          {
              self.secret_token = obj.access_token;          
              cb(); // return the fact all is good
           }   
       });
      
    });  
  
   // write parameters to post body  
   post_req.write(post_data);  
   post_req.end();  

}

gpslatitude.prototype.getCurrentLatidude = function()
{  
    return this.current_lat;
}    

gpslatitude.prototype.getCurrentLongitude = function()
{  
    return this.current_lng;
}    

gpslatitude.prototype.getDistancefrompoint = function(clat,clng)
{  
    var dis_frompoint = geolib.getDistance(
               {latitude: clat, longitude: clng}, {latitude: self.current_lat, longitude: self.current_lng}
               );
    return dis_frompoint;           
}    