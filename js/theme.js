export function setTheme(now, sunrise, sunset) {
  const body = document.body;
  body.classList.remove("day", "sunset", "night");

  const sunsetStart = sunset - 3600;
  const sunriseEnd = sunrise + 3600;

  if (now >= sunrise && now < sunsetStart) {
    body.classList.add("day");
  } else if (
    (now >= sunrise && now < sunriseEnd) ||
    (now >= sunsetStart && now < sunset)
  ) {
    body.classList.add("sunset");
  } else {
    body.classList.add("night");
  }
}
