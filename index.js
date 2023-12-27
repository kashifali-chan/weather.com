window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".discription-temerature");
    let temperatureDegree = document.querySelector(".temperature-dgree");
    let locationTimezone = document.querySelector(".location-timezon");
    let temperature = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

             const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = 'http://api.weatherapi.com/v1/current.json?key=ba9b26f005b6461ba5e33637232712&q=${lat}, ${long}';
          
            fetch(api)
                .then(response => {         
                    return response.json();
                })
                .then(data => {
                // console.log(data);
                    const {feelslike_f} = data.current;
                    const {text} = data.current.condition;  
                    const {icon} = data.current.condition;  
                    const {tz_id} = data.location; 
                    temperatureDegree.textContent = feelslike_f;
                    temperatureDescription.textContent = text;
                    locationTimezone.textContent = tz_id;
                    let celsius = (feelslike_f-32)* (5/9);

                    setIcons(icon, document.querySelector('.icon'));
                    temperature.addEventListener("click", ()=>{
                     if(temperatureSpan.textContent==="F"){
                         temperatureSpan.textContent = "C";
                         temperatureDegree.textContent = Math.floor(celsius);
                     }else{
                         temperatureSpan.textContent = "F";
                         temperatureDegree.textContent = feelslike_f;
                      }
                     
                    })
                });
        });
    }
    function setIcons(icon, iconID){
        var skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});

  // function setIcons(icon, iconID) {
    //     var skycons = new Skycons({ "color": "white" });
    //     const currentIcon = skycons.add(document.getElementById("icon2"), Skycons.FOG);
    //     skycons.play();
      
    //}