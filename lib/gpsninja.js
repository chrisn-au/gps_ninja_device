var stream = require('stream')
  , util = require('util');

var gpslatitude = require('./gpslatitude');
// Give our device a stream interface
util.inherits(GPS_Ninja,stream);

// Export it
module.exports=GPS_Ninja;

// util.inherits(getLocation,stream);

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the Ninja Platform
 *
 * @fires data - Emit this when you wish to send data to the Ninja Platform
 */
function GPS_Ninja() {

  var self = this;
  var time_int_ms = 30 * 1000;
  var home_lat = -11.12345
  var home_lng = 12.3287

  // This device will emit data
  this.readable = true;
   
  this.G = "GPS_Ninja"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 9; // 2000 is a generic Ninja Blocks sandbox device
  this.dfh = 0;

  var glat = new gpslatitude(updatelocation); //create new google latitude instance
  
  function updateNinja()
  {
      this.dfh = glat.getDistancefrompoint(home_lat,home_lng); 
      self.emit('data',this.dfh); 
  }     

  function updatelocation()
  {
      glat.updateLocation(updateNinja); //get the location and call myColour as the callback to update the ninga
  }
        
  this._interval = setInterval(function() {
         glat.updateLocation(updateNinja);
   },time_int_ms);
   
};

