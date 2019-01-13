$( document ).ready(function() {
    //$("p").css("color", "yellow");

    

});
		
function tempLink(){
    	location.href = "./max-temp.html";
    }

    function humidLink(){
    	location.href = "./humidity.html";
    }

    function cloudLink(){
    	location.href = "./cloudiness.html";
    }

    function windLink(){
    	location.href = "./wind-speed.html";
    }


//data page
 function getStats(){
                         
    var theUrl = "../assets/citiescsv.json";
        $.ajax({
            type: "GET",
            dataType: "json",
            url: theUrl,
            success: function(data){
            console.log(data);
            
            //var theData = city + "," + city_id + "," + cloudiness + "," + country + "," + date + "," + humidity + "," + lat + "," + lng + "," + max_temp + "," + wind_speed;
            var theData = "<div class='row columnTitles'><div class='col-md-2'>city</div><div class='col-md-1'>city_id</div><div class='col-md-1'>cloudiness</div><div class='col-md-1'>country</div><div class='col-md-2'>date</div><div class='col-md-1'>humidity</div><div class='col-md-1'>lat</div><div class='col-md-1'>lng</div><div class='col-md-1'>max_temp</div><div class='col-md-1'>wind_speed</div></div>";  
            $(".data").append(theData);
            
            for (i=1; i<data.length; i++){
                var city = data[i].City;
                var city_id = data[i].City_ID;
                var cloudiness = data[i].Cloudiness;
                var country = data[i].Country;
                var date = data[i].Date;
                var humidity = data[i].Humidity;
                var lat = data[i].Lat;
                var lng = data[i].Lng;
                var max_temp = data[i].MaxTemp;
                var wind_speed = data[i].WindSpeed;
                //console.log(city, city_id, cloudiness, country, date, humidity, lat, lng, max_temp, wind_speed);
                $(".theTable").append(row);
                if(i % 2 == 0){
                    var row = "<div class='row tableRows'><div class='col-md-2'>" + city + "</div>" + "<div class='col-md-1'>" + city_id + "</div>" + "<div class='col-md-1'>" + cloudiness + "</div>" + "<div class='col-md-1'>" + country + "</div>" + "<div class='col-md-2'>" + date + "</div>" + "<div class='col-md-1'>" + humidity + "</div>" + "<div class='col-md-1'>" + lat + "</div>" + "<div class='col-md-1'>" + lng + "</div>" + "<div class='col-md-1'>" + max_temp + "</div>" + "<div class='col-md-1'>" + wind_speed + "</div></div>";
                }else{
                    var row = "<div class='row tableRows greyBG'><div class='col-md-2'>" + city + "</div>" + "<div class='col-md-1'>" + city_id + "</div>" + "<div class='col-md-1'>" + cloudiness + "</div>" + "<div class='col-md-1'>" + country + "</div>" + "<div class='col-md-2'>" + date + "</div>" + "<div class='col-md-1'>" + humidity + "</div>" + "<div class='col-md-1'>" + lat + "</div>" + "<div class='col-md-1'>" + lng + "</div>" + "<div class='col-md-1'>" + max_temp + "</div>" + "<div class='col-md-1'>" + wind_speed + "</div></div>";

                }
            }           
            }
        });

    }
    

     
    //only run ajax call on datapage
    $(document).ready(function () {
        if(window.location.href.indexOf("data.html") > -1) // This doesn't work, any suggestions?
        {
             getStats();
             console.log('dataPage')
        }
    });








