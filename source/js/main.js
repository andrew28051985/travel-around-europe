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
const byTripModal = document.querySelector(".buy-trip__wrapper");
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
  const itsModal = byTripModal.contains(target);
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

// Валидация формы

// Зададим регулярные выражения для проверки ввода данных пользователем в поля ввода
const validityEmail = /^[A-Za-z0-9]{1,19}@[A-Za-z0-9]{1,19}.[rsucomwinf]{1,8}$/;
const validityInputNumber = /^[0-9]{1,20}$/;
const formQuestions = document.querySelector(".questions__form");
const inputPhone = formQuestions.querySelector(".form__input--phone");
const inputEmail = formQuestions.querySelector(".form__input--email");
const formModal = document.querySelector(".buy-trip__form");
const inputPhoneModal = formModal.querySelector(".form__input--phone");
const inputEmailModal = formModal.querySelector(".form__input--email");
const MIN_LENGTH_PHONE = 5;
const MAX_LENGTH_PHONE = 10;

const onInputValueMissing = (evt) => {
  const field = evt.target;
  if (field.validity.valueMissing) {
    field.setCustomValidity('Заполните обязательное поле.');
    setFormError(field);
  }
};

const onInputValueError = (evt) => {
  const field = evt.target;
  setFormError(field);
}

const setFormError = (nameInput) => {
  nameInput.classList.add("form__input--invalid");
  nameInput.previousElementSibling.classList.add("form__invalid--active");
};

const setFormValidityOk = (evt) => {
  const field = evt.target;
  field.previousElementSibling.classList.remove("form__invalid--active");
  field.classList.remove("form__input--invalid");
};

const validation = (namePhone, nameEmail) => {
  namePhone.addEventListener("input", (evt) => {
    const lengthInputPhone = namePhone.value.length;

    if (!validityInputNumber.test(namePhone.value)) {
      onInputValueError(evt)
      namePhone.setCustomValidity(`Номера телефона должен содержать только цыфры`);
    } else if (lengthInputPhone < MIN_LENGTH_PHONE) {
      onInputValueError(evt)
      namePhone.setCustomValidity(`Еще нужно ввести минимум ${MIN_LENGTH_PHONE - lengthInputPhone} цыфр`);
    } else if (lengthInputPhone >  MAX_LENGTH_PHONE) {
      onInputValueError(evt)
      namePhone.setCustomValidity(`Нужно удалить ${lengthInputPhone - MAX_LENGTH_PHONE} цыфр`);
    } else {
      namePhone.setCustomValidity("");
      setFormValidityOk(evt);
    };
    namePhone.reportValidity();
  });

  nameEmail.addEventListener("input", (evt) => {
    if (!validityEmail.test(nameEmail.value)) {
      onInputValueError(evt)
      nameEmail.setCustomValidity(`Введите корректный Email`);
    } else {
      nameEmail.setCustomValidity("");
      setFormValidityOk(evt);
    };
    nameEmail.reportValidity();
  });

  namePhone.addEventListener('invalid', onInputValueMissing, true);
};

validation(inputPhone, inputEmail);
validation(inputPhoneModal, inputEmailModal);

// Очистка формы

const reset = (nameForm, modal) => {
  const formInputs = nameForm.querySelectorAll('input');
  modal;
  formInputs.forEach((input) => {
    input.value = '';
  });
};

// Открытие модального окна успешной отправки данных формы
const openSuccessModal = () => {
  const modalOk = document.querySelector(".form-send-ok");
  modalOk.classList.remove("form-send-ok--no-active");
};

// Отправка формы
const URL_SERVER = 'https://echo.htmlacademy.ru';

const sendData = ((body, onSuccess, onFail) => {
  fetch(
    URL_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((responce) => {
      if (responce.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
});

const sendUserFormData = (nameForm) => {
  nameForm.addEventListener("submit", (evt) => {
    const field = evt.target;
    evt.preventDefault();
    if (nameForm.contains(field)) {
      byTrip.classList.remove("buy-trip--active");
    };
    sendData(
      new FormData(evt.target),
      () => reset(nameForm, openSuccessModal()),
      () => console.log("Данные НЕотправлены11"),
    );
  });
};

sendUserFormData(formQuestions);
sendUserFormData(formModal);
