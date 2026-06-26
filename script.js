const cityInput=document.getElementById("cityInput");
const searchBtn=document.getElementById("searchBtn");

const loader=document.getElementById("loader");
const error=document.getElementById("error");
const weatherBox=document.getElementById("weatherBox");

const cityName=document.getElementById("cityName");
const temp=document.getElementById("temp");
const humidity=document.getElementById("humidity");
const wind=document.getElementById("wind");
const country=document.getElementById("country");
const condition=document.getElementById("condition");
const weatherIcon=document.getElementById("weatherIcon");

function weatherText(code){

if(code===0)return"Clear Sky";
if(code<=3)return"Partly Cloudy";
if(code<=48)return"Fog";
if(code<=67)return"Rain";
if(code<=77)return"Snow";
if(code<=82)return"Rain Showers";
if(code<=99)return"Thunderstorm";

return"Unknown";

}

async function getWeather(city){

loader.style.display="block";
weatherBox.style.display="none";
error.style.display="none";

try{

const geo=await fetch(

`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

);

const geoData=await geo.json();

if(!geoData.results){

throw new Error("City Not Found");

}

const place=geoData.results[0];

const weather=await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`

);

const weatherData=await weather.json();

cityName.textContent=place.name;

country.textContent=place.country;

temp.textContent=
weatherData.current.temperature_2m;

humidity.textContent=
weatherData.current.relative_humidity_2m;

wind.textContent=
weatherData.current.wind_speed_10m;

condition.textContent=
weatherText(weatherData.current.weather_code);

weatherIcon.src=
"https://cdn-icons-png.flaticon.com/512/1779/1779940.png";

weatherBox.style.display="block";

}

catch(err){

error.textContent=err.message;

error.style.display="block";

}

finally{

loader.style.display="none";

}

}

searchBtn.addEventListener("click",()=>{

const city=cityInput.value.trim();

if(city===""){

alert("Enter City Name");

return;

}

getWeather(city);

});

cityInput.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

searchBtn.click();

}

});

window.onload=()=>{

getWeather("Chennai");

};