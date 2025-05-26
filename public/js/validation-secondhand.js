// Validate form inputs
function validateForm() {
    console.log("✅ Running validateForm...");

    const errorBox = document.getElementById("error-box");
    const errorList = document.getElementById("error-list");
    errorList.innerHTML = "";
    errorBox.style.display = "none";

    const errors = [];

    // Get values
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

    // Validate required fields
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

    if (errors.length > 0) {
        errorBox.style.display = "block";
        errors.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error;
            errorList.appendChild(li);
        });
        return false;
    }

    saveToCookies();
    return true;
}

// Save form values into cookies
function saveToCookies() {
    document.cookie = "name=" + encodeURIComponent(document.getElementById("fname").value) + ";path=/";
    document.cookie = "email=" + encodeURIComponent(document.getElementById("email").value) + ";path=/";
    document.cookie = "number=" + encodeURIComponent(document.getElementById("number").value) + ";path=/";
    document.cookie = "modelname=" + encodeURIComponent(document.getElementById("modelname").value) + ";path=/";
    document.cookie = "size=" + encodeURIComponent(document.getElementById("size").value) + ";path=/";
    document.cookie = "year=" + encodeURIComponent(document.getElementById("year").value) + ";path=/";
    document.cookie = "RetailPrice=" + encodeURIComponent(document.getElementById("RetailPrice").value) + ";path=/";
    document.cookie = "DesiredPassingPrice=" + encodeURIComponent(document.getElementById("DesiredPassingPrice").value) + ";path=/";
}



// Set up event listeners
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (!form) return;

    // Load existing data
    loadCookies();

    form.addEventListener("submit", function (e) {
        const isValid = validateForm();
        if (!isValid) {
            e.preventDefault(); // Stop submission if invalid
        }
    });

    form.addEventListener("reset", function () {
        const errorBox = document.getElementById("error-box");
        const errorList = document.getElementById("error-list");
        errorList.innerHTML = "";
        errorBox.style.display = "none";
    });
});