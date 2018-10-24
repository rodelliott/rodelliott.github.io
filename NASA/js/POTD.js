//Let the user see the date they selected
var dateStr = "You entered the date: ";
var description = "Description: ";
var minimumDate = '1995-09-25';
var hdVarLink = "FULL HD RESOLUTION IMAGE";

//Start function to grab user input and append it correctly to the URL
function getDatePhoto() {
    var photoDate = document.getElementById("theDate").value;
    var url = "https://api.nasa.gov/planetary/apod?date=";
    var apiKey = "&api_key=Ty3PnddASQSq9M2u7KAdxDHQb8AvOIvZHY22cgYC";

    /*
      This block is used to get the days date. I then use it later to display
      an error message to the user if they input an incorrect date. Users can't
      enter a bad date on Firefox/Safari as the jQuery datepicker allows for easy
      date range setup. This is mostly used for Google Chrome and iOS devices
    */
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
     if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
    today = yyyy+'-'+mm+'-'+dd;
    //////////////////////////////////////////

$(document).ready(function() {
    $.ajax({
      url: url+photoDate+apiKey,
      success: function(result) {
        //Use the console.log to check the object that is returned
        //console.log(result);
        if("copyright" in result)
          //Print the author's name of the picture
          $("#copyright").text("Image Credits: " + result.copyright);
        else
          //If no author just say it's public domain
          $("#copyright").text("Image Credits: " + "Public Domain");
        //Control what happens with a video
        if(result.media_type == "video") {
          //Show the video ID
          $("#main_title").hide();
          $("#apod_vid_id").show();
          $("#hideImageLink").hide();
          $("#hideDescrip").show();
          $("#hideNFO").show();
          $("#apod_hdurl").hide();
          $("#hideTable").show();
          $("#apod_vid_id").attr("src", result.url);
          $("#errorMessage").hide();
          //Hide the image ID
          $("#apod_img_id").hide();
        }
        //Control what happens with an image
        else {
          //Show the image ID
          $("#main_title").hide();
          $("#apod_img_id").show();
          $("#hideImageLink").show();
          $("#apod_hdurl").show();
          $("#hideDescrip").show();
          $("#hideNFO").show();
          $("#hideTable").show();
          $("#apod_img_id").attr("src", result.url);
          $("#errorMessage").hide();
          //Hide the video ID
          $("#apod_vid_id").hide();

        }
        $("#reqObject").text(url);
        $("#returnObject").text(JSON.stringify(result, null, 4));
        var address = '<a href="' + result.hdurl + '">' + hdVarLink + '</a>';
        $('#apod_hdurl').html(address);
        $("#apod_explanation").text(description + result.explanation);
        $("#apod_title").text(result.title);
      }
    })
  })

  //This begins the error message block. I'm simply hiding the items if the date
  //is out of range, otherwise, I repopulate them.
  if (photoDate > today || photoDate < minimumDate)
  {
    $("#apod_vid_id").hide();
    $("#hideImageLink").hide();
    $("#hideDescrip").hide();
    $("#hideNFO").hide();
    $("#apod_img_id").hide();
    $("#apod_explanation").hide();
    $("#apod_title").hide();
    $("#hideTable").hide();
    $("#apod_hdurl").hide();
    $("#main_title").show();
    $("#errorMessage").text("Please input a date within the specified ranges.");
    $("#errorMessage").show();
  }
  else{
    $("#apod_title").show();
    $("#apod_hdurl").show();
    $("#apod_explanation").show();
}
  };
