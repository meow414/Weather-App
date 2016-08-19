var clicked = false;
$(document).ready(function() {
  var xhr = new XMLHttpRequest(); //to be used in fething weather json data from open weather api
  var getLoc = new XMLHttpRequest(); //new http request to get city name,country code

  getLoc.open("GET", "http://ipinfo.io/json", false); //this code is for getting city name,country code from IP address to provide for search query field in weather api,we will need to parse the json object
  getLoc.send(); //send request
  var locres = getLoc.response; //to  store json object response

  var parseloc = JSON.parse(locres); //to parse json

  var cityloc = parseloc.city; //for getting city name from parsed json data
  var countryloc = parseloc.country; //for getting country code

  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityloc + "," + countryloc + "&units=metric&APPID=b10811ac33cbff62d9facbabc293bbbf"; //to be used below to call weather api with dynamic q values

  xhr.open("GET", url, false);

  xhr.send();
  var data = xhr.response;

  var json = JSON.parse(data);
  var conditions = json.weather[0].main;
  var temperature = Math.floor(json.main.temp);
  //var C = temperature - 273.15;
  //var F = temperature*1.8 - 459.67;

  var im = json.weather[0].icon; // for storing icon code of weather condition
  var weathericon = "http://openweathermap.org/img/w/" + im + ".png";

  /*console.log(conditions);
  console.log(temperature);
  console.log(json.name);
  console.log(json.sys.country);*/
  var html = "";
  html += "<h2>" + json.name + "," + json.sys.country + "</h2>" + "<br>" + "<h3>" + conditions + "</h3>" + " " + "<img src=" + weathericon + ">" + "<br>" + "<h2 id='tempo'>" + temperature + "<button class='btn '>" +
    "°C" +
    "</button>" + "</h2>";

  $(".forecast").html(html);

  $("button").on("click", function() {

    if (clicked == false) {
      var F = temperature * 9 / 5 + 32;
      document.getElementById("tempo").innerHTML = F + "<button class='btn '>" +
        "°F" +
        "</button>";
      clicked = true;
    } else if (clicked == true) {
      document.getElementById("tempo").innerHTML = temperature + "<button class='btn '>" +
        "°C" +
        "</button>";
      clicked = false;
    }

  });

});
