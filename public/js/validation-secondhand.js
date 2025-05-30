// Function to get a cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return "";
}

// Function to delete saved cookies related to form data
function deleteMyCookies() {
    const names = ["name", "email", "number", "modelname", "size", "year", "RetailPrice", "DesiredPassingPrice"];
    names.forEach(name => {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
}

// Function to save form data into cookies (valid for 1 year)
function saveToCookies() {
    const fields = [
        { id: "fname", cookieName: "name" },
        { id: "email", cookieName: "email" },
        { id: "number", cookieName: "number" },
        { id: "modelname", cookieName: "modelname" },
        { id: "size", cookieName: "size" },
        { id: "year", cookieName: "year" },
        { id: "RetailPrice", cookieName: "RetailPrice" },
        { id: "DesiredPassingPrice", cookieName: "DesiredPassingPrice" }
    ];

    fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (el) {
            document.cookie = `${field.cookieName}=${encodeURIComponent(el.value)};path=/;max-age=31536000`; // 1 year
        }
    });
}

// Function to validate form inputs
function validateForm() {
    console.log("✅ Running validateForm...");

    const errorBox = document.getElementById("error-box");
    const errorList = document.getElementById("error-list");
    errorList.innerHTML = "";
    errorBox.style.display = "none";

    const errors = [];

    // Get input values trimmed
    const name = document.getElementById("fname").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const brand = document.getElementById("brand").value;
    const modelname = document.getElementById("modelname").value.trim();
    const size = document.getElementById("size").value.trim();
    const condition = document.getElementById("condition").value;
    const boxChecked = document.querySelector('input[name="Box"]:checked');
    const year = document.getElementById("year").value.trim();
    const retailPrice = document.getElementById("RetailPrice").value.trim();
    const desiredPrice = document.getElementById("DesiredPassingPrice").value.trim();
    const image = document.getElementById("image").value.trim();
    const checkAuth = document.getElementById("checkAuth").checked;

    // Validate required fields and formats
    if (name === "") errors.push("Please input your full name.");
    if (email === "") errors.push("Please input your email.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Please enter a valid email address.");
    }
    if (number === "") errors.push("Please input your phone number.");
    if (brand === "") errors.push("Please choose sneaker's brand.");
    if (modelname === "") errors.push("Please input model of sneaker.");
    if (size === "") errors.push("Please input sneaker's size.");
    if (condition === "") errors.push("Please choose condition of sneaker.");
    if (!boxChecked) errors.push("Please indicate if you have the full box.");
    if (year === "") errors.push("Please input year of sneaker purchased.");
    if (retailPrice === "") errors.push("Please input sneaker's retail price.");
    if (desiredPrice === "") errors.push("Please input the price you want.");
    if (image === "") errors.push("Please input the link of at least 3 images.");
    if (!checkAuth) errors.push("You must agree to the terms.");

    // If errors exist, display them and block submission
    if (errors.length > 0) {
        errorBox.style.display = "block";
        errors.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error;
            errorList.appendChild(li);
        });
        return false;
    }

    // Save to cookies if validation passes
    saveToCookies();
    return true;
}

// Setup event listeners once DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Clear saved cookies to keep form blank on page reload
    deleteMyCookies();

    // Clear form input values to prevent browser autofill after refresh
    const inputsToClear = ["fname", "email", "number", "modelname", "size", "year", "RetailPrice", "DesiredPassingPrice"];
    inputsToClear.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = "";
        }
    });

    const form = document.querySelector("form");
    if (!form) return;

    // Validate on form submit
    form.addEventListener("submit", function (e) {
        console.log("Submit event triggered");
        if (!validateForm()) {
            e.preventDefault(); // Prevent form submission if invalid
            console.log("Form submission prevented due to validation errors.");
        }
    });

    // Clear errors when form is reset
    form.addEventListener("reset", function () {
        console.log("Form reset triggered");
        const errorBox = document.getElementById("error-box");
        const errorList = document.getElementById("error-list");
        errorList.innerHTML = "";
        errorBox.style.display = "none";
    });
});
