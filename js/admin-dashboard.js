// Handle adding a new flight
document.getElementById("addFlightForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const flightNumber = document.getElementById("flightNumber").value.trim();
    const departure = document.getElementById("departure").value.trim();
    const arrival = document.getElementById("arrival").value.trim();
    const date = document.getElementById("date").value;
    const seats = document.getElementById("seats").value.trim();
    const price = document.getElementById("price").value.trim();  // New price field

    // Validate inputs
    if (!flightNumber || !departure || !arrival || !date || !seats || !price) {
        alert("Please fill out all fields.");
        return;
    }

    // Add the new flight to the backend (JSON Server)
    const flight = {
        flightNumber,
        departure,
        arrival,
        date,
        seats,
        price  // Include price in flight details
    };

    fetch("http://localhost:3000/flights", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(flight)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Flight added:', data);
        updateFlightsTable();  // Refresh flight list
    })
    .catch(error => console.error('Error adding flight:', error));
});

// Function to update the flights table from the backend
function updateFlightsTable() {
    fetch("http://localhost:3000/flights")
    .then(response => response.json())
    .then(flights => {
        const tableBody = document.getElementById("flightsTable").getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";  // Clear previous entries

        flights.forEach((flight) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${flight.flightNumber}</td>
                <td>${flight.departure}</td>
                <td>${flight.arrival}</td>
                <td>${flight.date}</td>
                <td>${flight.seats}</td>
                <td>${flight.price}</td>
                <td>
                    <button onclick="deleteFlight(${flight.id})">Delete</button>
                    <button onclick="updateFlightPrice(${flight.id})">Update Price</button>
                </td>
            `;
        });
    })
    .catch(error => console.error('Error fetching flights:', error));
}

// Function to delete a flight from the backend
function deleteFlight(flightId) {
    fetch(`http://localhost:3000/flights/${flightId}`, {
        method: "DELETE"
    })
    .then(() => updateFlightsTable())  // Refresh the flight list after deletion
    .catch(error => console.error('Error deleting flight:', error));
}

// Function to update flight price (price as a new field)
function updateFlightPrice(flightId) {
    const newPrice = prompt("Enter the new price for this flight:");
    if (newPrice) {
        fetch(`http://localhost:3000/flights/${flightId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ price: newPrice })
        })
        .then(() => updateFlightsTable())  // Refresh the flight list after updating the price
        .catch(error => console.error('Error updating flight price:', error));
    }
}

// Function to view passengers
function updatePassengersTable() {
    fetch("http://localhost:3000/passengers")
    .then(response => response.json())
    .then(passengers => {
        const tableBody = document.getElementById("passengersTable").getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";  // Clear previous entries

        passengers.forEach(passenger => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${passenger.name}</td>
                <td>${passenger.flightNumber}</td>
                <td>${passenger.seat}</td>
                <td>
                    <select onchange="updatePassengerStatus(${passenger.id}, this.value)">
                        <option value="Confirmed" ${passenger.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Pending" ${passenger.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    </select>
                </td>
            `;
        });
    })
    .catch(error => console.error('Error fetching passengers:', error));
}

// Function to update the booking status of a passenger
function updatePassengerStatus(passengerId, newStatus) {
    fetch(`http://localhost:3000/passengers/${passengerId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
    })
    .then(() => updatePassengersTable())  // Refresh the passenger table after updating status
    .catch(error => console.error('Error updating passenger status:', error));
}

// Call to populate the flights and passengers table on page load
updateFlightsTable();  // Display existing flights in the admin dashboard
updatePassengersTable();  // Display passengers in the admin dashboard
