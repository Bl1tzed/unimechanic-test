const buttons = document.querySelectorAll(".button");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal__form");
const modalBox = document.querySelector(".modal__box");
const modalCloseButton = document.querySelectorAll(".closeButton");

const reqInputs = document.querySelectorAll("[data-req]");
const overallErrorMessage = document.querySelector("[data-overallError]");
const modalSubmitButton = document.querySelector("#modalSubmitButton");

const emailInput = document.querySelector("[name=email]");
const phoneNumberInput = document.querySelector("[name=phoneNumber]");

const fileInput = document.querySelector(".modal__inputField__file");
const fileInputLabel = document.querySelector(".modal__inputLabel__file");

const tableToHide = document.querySelector("table");

function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(fileInput.files[0]);

  oFReader.onload = function (oFREvent) {
    fileInputLabel.style.setProperty(
      "--background",
      `url(${oFREvent.target.result})`
    );
  };
}

function closeModal(modal) {
  modal.style.display = "none";
  tableToHide.style.display = "";
}

function validateEmail(email) {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone));
}

function overallError(
  state,
  text = "Пожалуйста, заполните все необходимые поля"
) {
  overallErrorMessage.setAttribute("data-overallError", state);
  overallErrorMessage.classList.add("redColor");
  overallErrorMessage.textContent = text;
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    modal.style.display = "flex";
    tableToHide.style.display = "none";
  });
}
for (let i = 0; i < modalCloseButton.length; i++) {
  modalCloseButton[i].addEventListener("click", () => closeModal(modal));
}

document.addEventListener("mousedown", (e) => {
  if (!modalBox.contains(e.target) && e.target === modal) {
    closeModal(modal);
  }
});

modalForm.addEventListener("change", () => {
  const emptyInputs = Array.from(reqInputs).filter(
    (input) => input.value === "" || input?.files?.length === "0"
  );
  if (emptyInputs.length === 0) modalSubmitButton.removeAttribute("disabled");
});

modalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const emailValue = emailInput.value;
  const phoneValue = phoneNumberInput.value;
  const emptyInputs = Array.from(reqInputs).filter(
    (input) => input.value === ""
  );

  let isPhoneValid = false;
  let isEmailValid = false;

  if (!validateEmail(emailValue)) {
    emailInput.setAttribute("data-error", "true");
    emailInput.nextSibling.nextSibling.textContent = "Неправильный Email";
    overallError(true, "Поля имеют некорректные данные");
  } else {
    emailInput.removeAttribute("data-error");
    isEmailValid = true;
    overallError(false);
  }

  if (!validatePhone(phoneValue)) {
    phoneNumberInput.setAttribute("data-error", "true");
    phoneNumberInput.nextSibling.nextSibling.textContent =
      "Неправильный номер телефона";
    overallError(true, "Поля имеют некорректные данные");
  } else {
    phoneNumberInput.removeAttribute("data-error");
    isPhoneValid = true;
    overallError(false);
  }

  reqInputs.forEach((input) => {
    if (input.value === "") {
      input.setAttribute("empty-error", "true");
      input.nextSibling.nextSibling.textContent =
        "Это поле необходимо заполнить";
    } else {
      input.removeAttribute("empty-error");
    }
  });

  if (emptyInputs.length !== 0) {
    overallError(true);
    return false;
  } else {
    overallError(false);
  }

  if (!isPhoneValid || !isEmailValid) {
    overallError(true, "Поля имеют некорректные данные");
    return false;
  }

  closeModal(modal);
});
