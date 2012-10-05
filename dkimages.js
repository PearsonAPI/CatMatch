var dki = (function() {

  var dki = {};
  var url = "https://api.pearson.com/dk/v1/images";
  dki.apikey = null;

  dki.fetchImages = function(criteria, data_handler) {
    if (dki.apikey == null) alert("API key has not been set");
    var data = jQuery.extend( { apikey: dki.apikey }, criteria );
    console.log("Calling " + url + " passing " + JSON.stringify(data));
    jQuery.ajax( url,
      {
        data: data,
        dataType: 'jsonp',
        jsonp: "jsonp",
        success: data_handler
      });
  };

  return dki;
}) ();
