document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        const errors = validateForm();

        if (errors.length > 0) {
            e.preventDefault(); //prevent submit when sth wrong
            showErrors(errors);
        } else {
            saveToCookies();
            alert("Form submitted");
        }
    });
})

function validateForm() {
    const errors = [];
    const email = getVal("email");
    const ordercode = getVal("ordercode");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) errors.push("Please input your email");
    else if (!emailPattern.test(email)) errors.push("Please enter a valid email address");
    if (!ordercode) errors.push("Please input your Order Code");

    return errors;
}

function getVal(id) {
    const e1 = document.getElementById(id);
    return e1 ? e1.value.trim() : "";
}

function showErrors(errors) {
    const errorBox = document.getElementById("error-box");
    const errorList = document.getElementById("error-list");

    errorList.innerHTML = "";
    errorBox.style.display = "block";

    errors.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = msg;
        errorList.appendChild(li);
    });
}

function saveToCookies() {
    const keys = ["ordercode", "email"];

    keys.forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            document.cookie = `${key}=${el.value};path=/`;
        }
    });
}