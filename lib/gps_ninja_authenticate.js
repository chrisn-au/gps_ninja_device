var https = require('https');

var client_id = 'clientidfromgoogleconsole.apps.googleusercontent.com';
var device_code = ''; 
var client_secret = 'clientsecretfromgoogleconsole';
create_token();

function create_token() 
 {
    //first use path code and client+id/scope to get code
    // returned in the json
         
    var querystring = require('querystring');  
   
    var post_domain = 'accounts.google.com';  
    var post_port = 443;  
   
    var post_path = '/o/oauth2/device/code'
    var scope = 'https://www.googleapis.com/auth/latitude.all.best'
    var post_data = querystring.stringify({'client_id': client_id, 'scope' : scope }); 
 
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
      console.log("Got response: " + res.statusCode);
  
      res.on('data', function (chunk) {  
      data = data + chunk;  
      
      });  
  
     res.on('end', function () {
       if (res.statusCode == 200)
       {
         var obj = JSON.parse(data);
         device_code = obj.device_code;
         console.log("FYI your device code is "+obj.device_code);
         console.log("Got special code");
         console.log("Please go to this URL "+obj.verification_url);
         console.log("And type in "+obj.user_code);
         console.log("Hurry it will expire "+obj.expires_in/60+" min");
         ask(retrieve_token); 
         
       }  
     });
  });
  
        
// write parameters to post body  
post_req.write(post_data);  
post_req.end();  


}
function ask(callback) {
    var stdin = process.stdin, stdout = process.stdout;
    stdin.resume();
    stdout.write("Please hit enter when ready: ");
 
    stdin.once('data', function(data) {
       console.log("data");
       callback();
       return;
     });
}      

function retrieve_token() 
 {
    console.log("Retrieve");   
    var querystring = require('querystring');  
    var post_domain = 'accounts.google.com';  
    var post_port = 443;  
    var post_path = '/o/oauth2/token';  
  
    var grant ='http://oauth.net/grant_type/device/1.0';
      
    var scope = 'https://www.googleapis.com/auth/latitude.all.best'
  
    var post_data = querystring.stringify({'client_id': client_id, 'client_secret' : client_secret,
                                       'code' : device_code, 'grant_type' : grant });   
  
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
       console.log(res.statusCode); 
       if (res.statusCode == 200)
       {
         var obj = JSON.parse(data);
         console.log("Got special code");
         console.log("Write down the refresh token you will need it " +obj.refresh_token);
         
         
       } 
       process.exit(); 
       return;    
    });  
   });    
   
   
// write parameters to post body  
post_req.write(post_data);  
post_req.end();  

}