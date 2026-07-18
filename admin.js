const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const correctUsername = "VALparai HOMEstay";
    const correctPassword = "8248517526";

    if (username === correctUsername && password === correctPassword) {

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("error").innerHTML =
            "❌ Invalid Username or Password";

    }

});