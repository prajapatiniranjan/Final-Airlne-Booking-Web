document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validate the form data
    if (!fullName || !email || !password || !confirmPassword) {
        alert("Please fill out all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const user = {
        fullName,
        email,
        password
    };

    // Send POST request to save user data in the db.json
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        alert("Account created successfully!");
        // Redirect to login page
        window.location.href = "login.html"; // Redirect to login page after successful signup
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong, please try again.");
    });
});
