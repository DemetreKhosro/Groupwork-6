let apiKey = "47646ae3b9f8550edb16e511e6c8e165";

document.getElementById("searchBtn").onclick = getWeather;

async function getWeather() {
    let city = document.getElementById("city").value;
    let resultBox = document.getElementById("result");
    let body = document.body;

    if (city === "") {
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = "Please enter a city name.";
        return;
    }

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod != 200) {
            resultBox.classList.remove("hidden");
            resultBox.innerHTML = "City not found.";
            return;
        }

        resultBox.classList.remove("hidden");
        resultBox.innerHTML = "<h2>" + data.name + "</h2>" +
            "<div class='row'>" +
            "<div class='item'>Temp: " + data.main.temp + "°C</div>" +
            "<div class='item'>Feels: " + data.main.feels_like + "°C</div>" +
            "<div class='item'>Humidity: " + data.main.humidity + "%</div>" +
            "<div class='item'>Wind: " + data.wind.speed + " m/s</div>" +
            "<div class='item'>Weather: " + data.weather[0].main + "</div>" +
            "</div>";

        let weather = data.weather[0].main.toLowerCase();

        if (weather === "rain") {
            body.style.backgroundImage = "url('images/rain.png')";
        } else if (weather === "sunny") {
            body.style.backgroundImage = "url('images/sunny.png')";
        } else if (weather === "clear") {
            body.style.backgroundImage = "url('images/clouds.png')";
        } else if (weather === 'cloudy') {
            body.style.backgroundImage = "url('images/cloudy.png')"
        } else {
            body.style.backgroundColor = 'lightblue'
        }

        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";

    } catch (error) {
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = "Error fetching data.";
    }
}