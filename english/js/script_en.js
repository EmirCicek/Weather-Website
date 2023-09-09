const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "2ab92ea8f83687950a43795cb8d5f2c0";

const setQuery = (e) => {
    if (e.keyCode == 13) {
        getResults(searchBar.value);
    }
}

const getResults = (city) => {
    let query = `${url}?q=${city}&appid=${apiKey}&units=imperial&lang=en`; // Fahrenheit birimini kullanmak için units=imperial
    fetch(query)
        .then(weather => { return weather.json() })
        .then(displayResults);
}

const displayResults = (response) => {
    let city = response.name;
    let temp = Math.round(response.main.temp);
    let desc = response.weather[0].description;
    let capitalizedDesc = desc.charAt(0).toUpperCase() + desc.slice(1);
    let icon = response.weather[0].icon;
    let image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    let country = response.sys.country;
    let min = Math.round(response.main.temp_min);
    let max = Math.round(response.main.temp_max);
    document.querySelector(".image").style.display = "block";

    let cityElements = document.getElementsByClassName("city");
    let tempElements = document.getElementsByClassName("temp");
    let descElements = document.getElementsByClassName("description");
    let imageElements = document.getElementsByClassName("image");
    let minMaxElements = document.getElementsByClassName("min_max");

    // Update weather information by traversing all HTML elements of the same class
    for (let i = 0; i < cityElements.length; i++) {
        cityElements[i].innerText = city + ", " + country;
        tempElements[i].innerText = temp + "°F"; // Fahrenheit birimi eklendi
        descElements[i].innerText = capitalizedDesc;
        imageElements[i].children[0].src = image;
        minMaxElements[i].innerText = min + "°F / " + max + "°F"; // Fahrenheit birimi eklendi
    }
}

const searchBar = document.getElementById("search_bar");
searchBar.addEventListener("keypress", setQuery);
