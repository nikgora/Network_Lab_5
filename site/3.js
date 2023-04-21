var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", Clear);
var confirmationClose = document.querySelector(".confirmation_close");
confirmationClose.addEventListener("click", closeConfirmation);
var form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  form.checkValidity();
  event.preventDefault();
  Save();
});
var name2 = document.getElementById("name");
name2.addEventListener("invalid", (event) => {
  console.log(name2.validationMessage);
});
blocking();
Clear();

function Save() {
  var name_doctor = document.getElementById("name_doctor");
  var date = document.getElementById("date");
  var time = document.getElementById("time");
  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var patronymic = document.getElementById("patronymic");
  var sex = document.getElementById("sex");
  var birthdate = document.getElementById("birthdate");
  var phone = document.getElementById("phone");

  document.querySelector(".confirmation").style.visibility = "visible";
  var confirmationContent = document.querySelector(".confirmation_content");
  confirmationContent.insertAdjacentHTML(
    "afterbegin",
    `
        ${name_doctor.value}<br>
        ${date.value}<br>
        ${time.value}<br>
        ${name.value}<br>
        ${surname.value}<br>
        ${patronymic.value}<br>
        ${sex.value}<br>
        ${birthdate.value}<br>
        ${phone.value}<br>
        `
  );
}

function Clear() {
  var name_doctor = document.getElementById("name_doctor");
  var date = document.getElementById("date");
  var time = document.getElementById("time");
  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var patronymic = document.getElementById("patronymic");
  var sex = document.getElementById("sex");
  var birthdate = document.getElementById("birthdate");
  var phone = document.getElementById("phone");

  name_doctor.value = "";
  date.value = "";
  time.value = "";
  name.value = "";
  surname.value = "";
  patronymic.value = "";
  sex.value = "";
  birthdate.value = "";
  phone.value = "";
}

function closeConfirmation() {
  document.querySelector(".confirmation").style.visibility = "hidden";
}

function blocking() {
  const validate = (dateString) => {
    const day = new Date(dateString).getDay();
    if (day == 0 || day == 6) {
      return false;
    }
    return true;
  };
  document.querySelector("#date").onchange = (evt) => {
    if (!validate(evt.target.value)) {
      evt.target.value = "";
      alert("У вихідні лікар не працює, виберіть будь-який будній день");
    }
  };
}
