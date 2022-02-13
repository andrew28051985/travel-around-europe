const navToggle = document.querySelector(".page-header__toggle-nav");
const navLogo = document.querySelector(".logo");
const navWrapper = document.querySelector(".page-header__wrapper-nav");

navWrapper.classList.remove("page-header__wrapper-nav--no-js-nav");
navWrapper.classList.add("page-header__wrapper-nav--closed-nav");
navToggle.classList.remove("page-header__toggle-nav--no-js");
navToggle.classList.add("page-header__toggle-nav--closed-nav");

navToggle.addEventListener("click", function() {
  if (navWrapper.classList.contains("page-header__wrapper-nav--closed-nav")) {
    navToggle.classList.remove("page-header__toggle-nav--closed-nav")
    navToggle.classList.add("page-header__toggle-nav--opened-nav")
    navWrapper.classList.remove("page-header__wrapper-nav--closed-nav")
    navWrapper.classList.add("page-header__wrapper-nav--opened-nav")
    navLogo.classList.add("logo--opened-nav");
  } else {
    navToggle.classList.remove("page-header__toggle-nav--opened-nav")
    navToggle.classList.add("page-header__toggle-nav--closed-nav")
    navWrapper.classList.remove("page-header__wrapper-nav--opened-nav")
    navWrapper.classList.add("page-header__wrapper-nav--closed-nav")
    navLogo.classList.remove("logo--opened-nav");
  }
});
