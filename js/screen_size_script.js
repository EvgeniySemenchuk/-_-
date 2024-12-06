var device = window.devicePixelRatio;
if (device == 1.5) {
  document.documentElement.classList.add("laptop");
} else if (device == 1.25) {
  document.documentElement.classList.add("desktop");
} else if (device == 1.0) {
  document.documentElement.classList.add("laptop2");
}
