document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const input = document.getElementById("pass");
    const eye = document.querySelector(".fa-solid");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        const errors = validateForm();

        if (errors.length > 0) {
            e.preventDefault(); // Prevent submit form if sth miss
            showErrors(errors);
        } else {
            saveToCookies();
        }
    });

    let isShow = false;

    if (input && eye) {
        eye.addEventListener('click', () => {
            isShow = !isShow;
            if (isShow) {
                input.setAttribute('type', 'text');
                eye.setAttribute('class', 'fa-solid fa-eye-slash');
            } else {
                input.setAttribute('type', 'password');
                eye.setAttribute('class', 'fa-solid fa-eye');
            }
        });
    }
});


function validateForm() {
    const errors = [];

    const email = getVal("email");
    const password = getVal("pass");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) errors.push("Please input your email.");
    else if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");
    if (!password) errors.push("Please input your password.");

    return errors;
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
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
    const keys = [
        "email", "pass"
    ];

    keys.forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            document.cookie = `${key}=${el.value};path=/`;
        }
    });
}


