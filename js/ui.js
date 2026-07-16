import { normalizeCityName, formatTemp, formatTime, formatUV, getWeatherImage } from "./utils.js";
import { setTheme } from "./theme.js";
import { currentData } from "./api.js";

export function renderWeather(data) {
  const cityName = data.resolvedAddress.split(",")[0].trim();
  document.getElementById("city-name").textContent = normalizeCityName(cityName);

  const current = data.currentConditions;
  const today = data.days[0];

  document.getElementById("weather-icon").src = getWeatherImage(current.conditions);
  document.getElementById("current-temp").textContent = formatTemp(current.temp);
  document.getElementById("max-temp").textContent = formatTemp(today.tempmax);
  document.getElementById("min-temp").textContent = formatTemp(today.tempmin);
  document.getElementById("condition").textContent = current.conditions;
  document.getElementById("feels-like").textContent = formatTemp(current.feelslike);
  document.getElementById("humidity").textContent = `${current.humidity}%`;
  document.getElementById("wind-speed").textContent = `${current.windspeed} km/h`;
  document.getElementById("uv-index").textContent = formatUV(current.uvindex);
  document.getElementById("sunrise").textContent = formatTime(current.sunrise);
  document.getElementById("sunset").textContent = formatTime(current.sunset);

  renderHourly(today.hours, data.days[1].hours, data);
  renderForecast(data.days.slice(1, 8));

  setTheme(current.datetimeEpoch, current.sunriseEpoch, current.sunsetEpoch);
}

export function renderHourly(hoursToday, hoursTomorrow, data) {
  const container = document.getElementById("hourly-container");
  container.innerHTML = "";

  const now = data.currentConditions.datetimeEpoch;
  const allHours = [...hoursToday, ...hoursTomorrow];
  const futureHours = allHours.filter(hour => hour.datetimeEpoch > now);

  const nextHours = [];
  for (let i = 0; i < futureHours.length && nextHours.length < 5; i += 2) {
    nextHours.push(futureHours[i]);
  }

  nextHours.forEach(hour => {
    const time = new Date(hour.datetimeEpoch * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: data.timezone
    });

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <p>${time}</p>
      <img class="hour-icon" src="${getWeatherImage(hour.conditions)}" alt="">
      <p>${formatTemp(hour.temp)}</p>
    `;

    container.appendChild(card);
  });
}

export function renderForecast(days) {
  const container = document.getElementById("forecast-container");
  container.innerHTML = "";

  days.forEach(day => {
    const dayName = new Date(day.datetimeEpoch * 1000)
      .toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: currentData.timezone
      })
      .toUpperCase();

    container.innerHTML += `
      <div class="forecast-item">
        <span class="forecast-day">${dayName}</span>
        <img class="forecast-icon" src="${getWeatherImage(day.conditions)}" alt="">
        <span class="forecast-temp">
          ${formatTemp(day.tempmin)} / ${formatTemp(day.tempmax)}
        </span>
      </div>
    `;
  });
}
