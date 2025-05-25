// form input valid
function validateForm() {
    console.log("✅ validateForm is running");

    let name = document.getElementById("fname").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("number").value;
    let brand = document.getElementById("brand").value;
    let modelname = document.getElementById("modelname").value;
    let size = document.getElementById("size").value;
    let condition = document.getElementById("condition").value;
    let boxChecked = document.querySelector('input[name="Box"]:checked');
    let year = document.getElementById("year").value;
    let RetailPrice = document.getElementById("RetailPrice").value;
    let DesiredPassingPrice = document.getElementById("DesiredPassingPrice").value;
    let imageInput = document.getElementById("images");
    let checkAuth = document.getElementById("checkAuth").checked;
    let errorBox = document.getElementById("error-box");
    let errorList = document.getElementById("error-list");
    errorList.innerHTML = "";
    errorBox.style.display = "none";

    let errors = [];

    // Email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== "" && !emailPattern.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    // Check required fields
    if (name === "") errors.push("Please input your full name.");
    if (email === "") errors.push("Please input your email.");
    if (number === "") errors.push("Please input your phone number.");
    if (brand === "") errors.push("Please choose sneaker's brand.");
    if (modelname === "") errors.push("Please input model of sneaker.");
    if (size === "") errors.push("Please input sneaker's size.");
    if (condition === "") errors.push("Please choose condition of sneaker.");
    if (!boxChecked) errors.push("Please check did you have full box.");
    if (year === "") errors.push("Please input year of sneaker purchased.");
    if (RetailPrice === "") errors.push("Please input sneaker's retail price.");
    if (DesiredPassingPrice === "") errors.push("Please input the price you want.");
    if (!imageInput || imageInput.files.length < 3)
        errors.push("Please input at least 3 images of your sneaker.");
    if (!checkAuth) errors.push("You must agree to the terms of form.");

    if (errors.length > 0) {
        errorBox.style.display = "block";
        errors.forEach(error => {
            let li = document.createElement("li");
            li.textContent = error;
            errorList.appendChild(li);
        });
        return false;
    }

    // Save to cookies
    saveToCookies();
    alert("Form submitted successfully!");
    return true;
}

// Save values into cookies
function saveToCookies() {
    document.cookie = "name=" + document.getElementById("fname").value + ";path=/";
    document.cookie = "email=" + document.getElementById("email").value + ";path=/";
    document.cookie = "number=" + document.getElementById("number").value + ";path=/";
    document.cookie = "modelname=" + document.getElementById("modelname").value + ";path=/";
    document.cookie = "size=" + document.getElementById("size").value + ";path=/";
    document.cookie = "year=" + document.getElementById("year").value + ";path=/";
    document.cookie = "RetailPrice=" + document.getElementById("RetailPrice").value + ";path=/";
    document.cookie = "DesiredPassingPrice=" + document.getElementById("DesiredPassingPrice").value + ";path=/";
}

// Load from cookies (nếu cần)
function loadCookies() {
    let cookies = document.cookie.split("; ");
    let data = {};
    cookies.forEach(cookie => {
        let [key, value] = cookie.split("=");
        data[key] = value;
    });

    if (data.name) document.getElementById("fname").value = data.name;
    if (data.email) document.getElementById("email").value = data.email;
    if (data.number) document.getElementById("number").value = data.number;
    if (data.modelname) document.getElementById("modelname").value = data.modelname;
    if (data.size) document.getElementById("size").value = data.size;
    if (data.year) document.getElementById("year").value = data.year;
    if (data.RetailPrice) document.getElementById("RetailPrice").value = data.RetailPrice;
    if (data.DesiredPassingPrice) document.getElementById("DesiredPassingPrice").value = data.DesiredPassingPrice;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            const isValid = validateForm();
            if (!isValid) {
                e.preventDefault();
            }
        });

        form.addEventListener("reset", function () {
            // Xóa cảnh báo khi reset
            const errorBox = document.getElementById("error-box");
            const errorList = document.getElementById("error-list");

            errorList.innerHTML = "";
            errorBox.style.display = "none";
        });
    }
});