document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const input = document.getElementById("pass");
    const input2 = document.getElementById("repass");
    const eye = document.querySelector(".fa-solid");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        const errors = validateForm();

        if (errors.length > 0) {
            e.preventDefault();
            showErrors(errors);
        } else {
            saveToCookies();
            alert("Form submitted");
        }
    });
    let isShow = false;
    let isShow2 = false;

    if (input && eye && input2) {
        eye.addEventListener('click', () => {
            isShow = !isShow;
            if (isShow) {
                input.setAttribute('type', 'text');
                input2.setAttribute('type', 'text');
                eye.setAttribute('class', 'fa-solid fa-eye-slash');
            } else {
                input.setAttribute('type', 'password');
                input2.setAttribute('type', 'password');
                eye.setAttribute('class', 'fa-solid fa-eye');
            }
        });
    }
});

function validateForm() {
    const errors = [];
    const fname = getVal("fname");
    const lname = getVal("lname");
    const email = getVal("email");
    const pass = getVal("pass");
    const repass = getVal("repass");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fname) errors.push("Please input first name");
    if (!lname) errors.push("Please input last name");
    if (!email) errors.push("Please input your email.");
    else if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");
    if (!pass) errors.push("Please input your password.");
    else if (pass != repass) errors.push("Replay Password is incorrect");

    return errors;
}

function getVal(id) {
    const e1 = document.getElementById(id);
    return e1 ? e1.value.trim() : "";
}

function showErrors(errors) {
    const errorList = document.getElementById("error-list");
    const errorBox = document.getElementById("error-box");

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

