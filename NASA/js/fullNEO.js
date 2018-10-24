function getNEO() {
    var photoDate = document.getElementById("theDate").value;
    var url1 = "https://ssd-api.jpl.nasa.gov/cad.api?";
    var url2 = "dist-max=5LD&date-min=";
    var url3 = "&sort=dist";
    var apiKey = "api_key=8t2JdQfwqQTdDhoPsGVreMwWcSFeJus0aBH5GapN";

$(document).ready(function() {
  $.ajax({
    url:url1+url2+photoDate+url3,
    success: function(result) {
      $("#objectName").empty();
      console.log(result.count);
      console.log(result);
      var totalCounts = result.count;
      //Limit the near earth objects printed out to 10.
      if (totalCounts > 10) {
        totalCounts = 10;
      }
      //Loop through the name and distance within the JSON response
      for (var i = 0; i < totalCounts; i++) {
        var aUnit = result.data[i][4];
        var convertAU = aUnit * 92960000;
        var roundIt = Math.round(convertAU);
        var formatMiles = roundIt.toLocaleString();
        //console.log(result.data[i][0]);
        //console.log(formatMiles);
        $("#objectName").append("<tr><td><center>" + result.data[i][0] + "</center></td><td><center>" + formatMiles + " miles" + "</center></td></tr>");
      }
      totalCounts = 0;
    }
  })
})
};
