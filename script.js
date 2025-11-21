let apiKey = "47646ae3b9f8550edb16e511e6c8e165";
let lastWeatherData = null;

document.getElementById("searchBtn").onclick = getWeather;

async function getWeather() {
    let city = document.getElementById("city").value;
    let resultBox = document.getElementById("result");
    let body = document.body;

    if (city === "") {
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = texts[currentLang].enterCity;
        return;
    }

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod != 200) {
            resultBox.classList.remove("hidden");
            resultBox.innerHTML = texts[currentLang].notFound;
            return;
        }

        lastWeatherData = data;
        displayWeather(data);

        let weather = data.weather[0].main.toLowerCase();

        function setFullBackground(src) {
            body.style.backgroundImage = `url('${src}')`;
            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "center";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundColor = "";
        }

        if (weather === "rain") {
            setFullBackground("images/rain.png");
        } else if (weather === "sunny") {
            setFullBackground("images/sunny.png");
        } else if (weather === "clear") {
            setFullBackground("images/clouds.png");
        } else if (weather === "cloudy") {
            setFullBackground("images/cloudy.png");
        } else if (weather === "mist") {
            body.style.backgroundImage = "";
            body.style.backgroundColor = "rgba(37, 174, 228, 1)";
        }

    } catch (error) {
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = texts[currentLang].fetchError;
    }
}

function displayWeather(data) {
    let resultBox = document.getElementById("result");
    resultBox.classList.remove("hidden");

    const langTexts = texts[currentLang];

    resultBox.innerHTML = `<h2>${data.name}</h2>
        <div class='row'>
            <div class='item'>${langTexts.temp}: ${data.main.temp}°C</div>
            <div class='item'>${langTexts.feels}: ${data.main.feels_like}°C</div>
            <div class='item'>${langTexts.humidity}: ${data.main.humidity}%</div>
            <div class='item'>${langTexts.wind}: ${data.wind.speed} m/s</div>
            <div class='item'>${langTexts.weather}: ${data.weather[0].main}</div>
        </div>`;
}

let currentLang = 'en';

const texts = {
    en: {
        title: "Weather Forecast",
        placeholder: "City name",
        searchBtn: "Search",
        enterCity: "Please enter a city name.",
        notFound: "City not found.",
        fetchError: "Error fetching data.",
        temp: "Temp",
        feels: "Feels",
        humidity: "Humidity",
        wind: "Wind",
        weather: "Weather"
    },
    geo: {
        title: "ამინდის პროგნოზი",
        placeholder: "ქალაქი",
        searchBtn: "ძებნა",
        enterCity: "გთხოვთ, შეიყვანეთ ქალაქის სახელი.",
        notFound: "ქალაქი ვერ მოიძებნა.",
        fetchError: "შეცდომა მონაცემების მიღებისას.",
        temp: "ტემპ",
        feels: "გრძნობის ტემპერატურა",
        humidity: "ნესტი",
        wind: "ქარი",
        weather: "ამინდი"
    }
};


function setLang(lang) {
    currentLang = lang;

    document.getElementById('title').textContent = texts[lang].title;
    document.getElementById('city').placeholder = texts[lang].placeholder;
    document.getElementById('searchBtn').textContent = texts[lang].searchBtn;

    if (lastWeatherData) {
        displayWeather(lastWeatherData);
    }
}