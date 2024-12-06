let slideIndex = 0;
showSlides(slideIndex);

function showSlides(index) {
  const slides = document.getElementsByClassName("slides")[0].children;
  const dots = document.getElementsByClassName("dot");

  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active");
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

document
  .querySelector(".prev-slide")
  .addEventListener("click", () => plusSlides(-1));
document
  .querySelector(".next-slide")
  .addEventListener("click", () => plusSlides(1));

const dots = document.querySelectorAll(".dot");
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => currentSlide(index));
});
