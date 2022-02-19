"use strict";

const navToggle = document.querySelector(".page-header__toggle-nav");
const navLogo = document.querySelector(".logo");
const navWrapper = document.querySelector(".page-header__wrapper-nav");

let ScrollPosition = 0;
let isModalActive = false;
const description = document.querySelector(".section-nav__list");
const links = document.querySelectorAll(".section-nav__link");
const cardTitleDescriptions = document.querySelectorAll(".card-description-and-feedback__title-description");
const wrapperDescriptionList = document.querySelectorAll(".card-description-and-feedback__item");
const galleryLinks = document.querySelectorAll(".gallery__link");
const byTrip = document.querySelector(".buy-trip");
const buttonCloseModal = byTrip.querySelector(".buy-trip__close-button");
const buttonBuyListTrip = document.querySelectorAll(".card-description-and-feedback__button");
const buttonBuyListPrice = document.querySelectorAll(".price__item-button");
const NUMBER_COUNTRY = 10;
const NAME_TAB = {
  1: 'Албания',
  2: 'Греция',
  3: 'Македония',
  4: 'Черногория',
  5: 'Хорватия',
};

navWrapper.classList.remove("page-header__wrapper-nav--no-js-nav");
navWrapper.classList.add("page-header__wrapper-nav--closed-nav");
navToggle.classList.remove("page-header__toggle-nav--no-js");
navToggle.classList.add("page-header__toggle-nav--closed-nav");

const navigation = () => {
  navToggle.addEventListener("click", function() {
    if (navWrapper.classList.contains("page-header__wrapper-nav--closed-nav")) {
      navToggle.classList.remove("page-header__toggle-nav--closed-nav")
      navToggle.classList.add("page-header__toggle-nav--opened-nav")
      navWrapper.classList.remove("page-header__wrapper-nav--closed-nav")
      navWrapper.classList.add("page-header__wrapper-nav--opened-nav")
      navLogo.classList.add("logo--opened-nav");
      document.addEventListener('scroll', onScrollMenuClose);
    } else {
      navToggle.classList.remove("page-header__toggle-nav--opened-nav")
      navToggle.classList.add("page-header__toggle-nav--closed-nav")
      navWrapper.classList.remove("page-header__wrapper-nav--opened-nav")
      navWrapper.classList.add("page-header__wrapper-nav--closed-nav")
      navLogo.classList.remove("logo--opened-nav");
      document.removeEventListener('scroll', onScrollMenuClose);
    }
  });
};

const onScrollMenuClose = () => {
  ScrollPosition = window.scrollY;
  if (ScrollPosition > 300) {
    navToggle.classList.remove("page-header__toggle-nav--opened-nav")
    navToggle.classList.add("page-header__toggle-nav--closed-nav")
    navWrapper.classList.remove("page-header__wrapper-nav--opened-nav")
    navWrapper.classList.add("page-header__wrapper-nav--closed-nav")
    navLogo.classList.remove("logo--opened-nav");
    document.removeEventListener('scroll', onScrollMenuClose);
  }
};

const tabs = () => {
  links.forEach((link) => {
    link.addEventListener("click", () => {
      const activeTab = document.querySelector(".section-nav__link--active");
      activeTab.classList.remove("section-nav__link--active");
      link.classList.add("section-nav__link--active");
      const nextActiveTab = document.querySelector(".section-nav__link--active").textContent;
      viewDescription(nextActiveTab);
    });
  });
};

const viewDescription = (text) => {
  const activeDescription = document.querySelector(".card-description-and-feedback__item--active");
  activeDescription.classList.remove("card-description-and-feedback__item--active");
  for (let i=1; i <= NUMBER_COUNTRY; i++) {
    let tabName = NAME_TAB[i];
    if (text === tabName) {
      activeDescription.classList.remove("card-description-and-feedback__item--active");
      [].forEach.call(wrapperDescriptionList, (description) => {
        if (description.childNodes[0].childNodes[0].textContent === text) {
          description.classList.add("card-description-and-feedback__item--active");
        };
      });
    };
  };
};

const linkTabActive = (tab) => {
  const activeTab = document.querySelector(".section-nav__link--active");
  activeTab.classList.remove("section-nav__link--active");
  for (let i = 0; i < links.length; i++) {
    if (links[i].textContent === tab) {
      links[i].classList.add("section-nav__link--active");
    }
  }
};

const galleryTabs = () => {
  galleryLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const galleryTitle = link.childNodes[1].textContent
      viewDescription(galleryTitle);
      linkTabActive(galleryTitle);
    });
  });
};

navigation();
galleryTabs();
tabs();

const isEscapeKey = (evt) =>
  evt.key === 'Escape';

const onModalEscKeydown = (evt) => {
  isEscapeKey(evt) ? closeModal() : false;
};

const onModalCloseClick = (evt) => {
  const target = evt.target;
  const itsButton = target == buttonCloseModal;
  const itsModal = byTrip.contains(target);
  (!itsModal || itsButton && isModalActive) ? closeModal() : false;
};

const closeModalOnClick = () => {
  document.addEventListener("keydown", onModalEscKeydown);
  document.addEventListener("click", onModalCloseClick);
};

const closeModal = () => {
  byTrip.classList.remove("buy-trip--active");
  isModalActive = false;
  document.removeEventListener("keydown", onModalEscKeydown);
  document.removeEventListener("click", closeModalOnClick);
  document.removeEventListener("click", onModalCloseClick);
};

const openModal = (button) => {
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", (evt) => {
      byTrip.classList.add("buy-trip--active");
      isModalActive = true;
      document.addEventListener("click", closeModalOnClick);
    });
  }
};

openModal(buttonBuyListTrip);
openModal(buttonBuyListPrice);
