document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill out all fields.");
        return;
    }

    // Fetch users from the JSON server
    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(users => {
            // Check if there is a matching user
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                alert("Login successful!");
                // Redirect to User Dashboard
                window.location.href = "user-dashboard.html";
            } else {
                alert("Invalid email or password.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong, please try again.");
        });
});
