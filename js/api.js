import { renderWeather } from "./ui.js";

const API_KEY = "THDHFHQ53MYRJL4J79DZGRQV7";
let currentData = null;

export async function fetchWeather(city = "Novi Sad") {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    document.getElementById("loader").style.display = "block";
    const res = await fetch(url);

    if (!res.ok) throw new Error("City is not found");

    const data = await res.json();
    currentData = data;
    renderWeather(data);

    document.getElementById("loader").style.display = "none";
  } catch (error) {
    document.getElementById("loader").style.display = "none";
    console.error(error);
  }
}

export function fetchCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=${API_KEY}&contentType=json`;

        const res = await fetch(url);
        const data = await res.json();

        currentData = data;
        renderWeather(data);
      },
      () => fetchWeather("Novi Sad")
    );
  } else {
    fetchWeather("Novi Sad");
  }
}

export { currentData };
