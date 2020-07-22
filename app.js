window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const {temperature, summary, icon} = data.currently;
                    temperatureDegree.textContent = temperature;
                    document.getElementById('span-temperature').textContent = '° F';
                    document.getElementById('options').textContent = 'Change the units with a click on the temperature!'
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // formula for celsius
                    let celsius = (temperature - 32)*(5 / 9)
                    // set icon
                    setIcons(icon, document.querySelector('.icon'));
                    // change temperature C/F
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === '° F') {
                            temperatureSpan.textContent = "° C"
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "° F"
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons ({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }


});