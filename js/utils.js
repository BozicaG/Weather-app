export let isCelsius = true;

export function toggleUnit() {
  isCelsius = !isCelsius;
}

export function normalizeCityName(name) {
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatTemp(temp) {
  return isCelsius
    ? `${temp.toFixed(1)}°C`
    : `${((temp * 9/5) + 32).toFixed(1)}°F`;
}

export function formatTime(time) {
  return time.slice(0, 5);
}

export function formatUV(index) {
  const el = document.getElementById("uv-index");
  el.classList.remove("uv-low","uv-moderate","uv-high","uv-very-high","uv-extreme");

  if (index < 3) {
    el.classList.add("uv-low");
    return `${index} (Low)`;
  }
  if (index < 6) {
    el.classList.add("uv-moderate");
    return `${index} (Moderate)`;
  }
  if (index < 8) {
    el.classList.add("uv-high");
    return `${index} (High)`;
  }
  if (index < 11) {
    el.classList.add("uv-very-high");
    return `${index} (Very High)`;
  }
  el.classList.add("uv-extreme");
  return `${index} (Extreme)`;
}

export function getWeatherImage(condition) {
  condition = condition.toLowerCase();
  if(condition.includes("storm")) return "../icons/thunder.svg";
  if(condition.includes("rain")) return "../icons/rain.svg";
  if(condition.includes("snow")) return "../icons/snow.svg";
  if(condition.includes("cloud")) return "../icons/cloudy.svg";
  return "../icons/clear-day.svg";
}
