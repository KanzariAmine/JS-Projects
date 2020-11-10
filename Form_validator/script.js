const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm__password = document.getElementById("confirm__password");

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form__control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form__control success";
}

//Check email is valid
function isValidEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//Get Field Name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)}must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)}must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Check password match
function checkPasswordMatch(input1, input2) {
  if (
    input1.value !== input2.value ||
    input1.value.length !== input2.value.length
  ) {
    showError(input2, "Confirm Password do not match");
  }
}

//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  checkRequired([username, email, password, confirm__password]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  isValidEmail(email);
  checkPasswordMatch(password, confirm__password);
});
