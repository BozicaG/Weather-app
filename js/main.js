import "../src/style.css";
import { fetchWeather, fetchCurrentLocationWeather, currentData } from "./api.js";
import { toggleUnit } from "./utils.js";
import { renderWeather } from "./ui.js";



function searchCity() {
  const city = document.getElementById("city-input").value.trim();
  if (!city) {
    alert("Enter name of the City.");
    return;
  }
  fetchWeather(city);
}

document.getElementById("search-btn").addEventListener("click", searchCity);

document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchCity();
});

document.getElementById("toggle-temp").addEventListener("click", () => {
  toggleUnit(); // menja isCelsius u utils.js
  if (currentData) renderWeather(currentData);
});


fetchCurrentLocationWeather();
