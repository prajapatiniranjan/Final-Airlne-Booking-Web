// Function to handle flight search
document.getElementById("flightSearchForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const departure = document.getElementById("departure").value.trim();
    const arrival = document.getElementById("arrival").value.trim();
    const date = document.getElementById("date").value;

    // Basic validation for input fields
    if (!departure || !arrival || !date) {
        alert("Please fill out all fields.");
        return;
    }

    // Fetch available flights from the backend (JSON Server)
    fetch(`http://localhost:3000/flights?departure_like=${departure}&arrival_like=${arrival}&date=${date}`)
        .then(response => response.json())
        .then(flights => {
            displayFlights(flights);
        })
        .catch(error => console.error('Error fetching flights:', error));
});

// Function to display the search results (matching flights)
function displayFlights(flights) {
    const flightsList = document.getElementById("flightsList");
    flightsList.innerHTML = "";  // Clear previous results

    if (flights.length === 0) {
        flightsList.innerHTML = "<p>No flights found matching your search criteria.</p>";
        return;
    }

    // Display flights
    flights.forEach(flight => {
        const flightDiv = document.createElement("div");
        flightDiv.classList.add("flight");

        flightDiv.innerHTML = `
            <h3>${flight.flightNumber}</h3>
            <p><strong>From:</strong> ${flight.departure}</p>
            <p><strong>To:</strong> ${flight.arrival}</p>
            <p><strong>Date:</strong> ${flight.date}</p>
            <p><strong>Available Seats:</strong> ${flight.seats}</p>
            <button onclick="selectFlight('${flight.flightNumber}')">Select Flight</button>
        `;

        flightsList.appendChild(flightDiv);
    });
}

// Function to select a flight and populate the booking form
function selectFlight(flightNumber) {
    document.getElementById("flightNumber").value = flightNumber;
}

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const passengerName = document.getElementById("passengerName").value.trim();
    const flightNumber = document.getElementById("flightNumber").value.trim();
    const seat = document.getElementById("seat").value.trim();
    const status = document.getElementById("status").value.trim();

    // Basic validation for input fields
    if (!passengerName || !flightNumber || !seat || !status) {
        alert("Please fill out all fields.");
        return;
    }

    // Create the passenger object
    const passenger = {
        name: passengerName,
        flightNumber,
        seat,
        status
    };

    // Send POST request to the backend (JSON Server)
    fetch("http://localhost:3000/passengers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(passenger)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Passenger booked:', data);
        alert("Flight booked successfully!");
        document.getElementById("bookingForm").reset();  // Reset the form
    })
    .catch(error => console.error('Error booking flight:', error));
});
