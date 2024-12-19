// Event listener to toggle dark/light mode
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// Event listener for search input
document.getElementById("search").addEventListener("input", filterCrimes);

// Fetch data from the UK Police API for January 2023 crimes
const apiUrl = 'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2023-01';

async function fetchCrimeData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayCrimes(data);
        console.log(data);
    } catch (error) {
        console.error('Error fetching crime data:', error);
    }
}

// Function to display crime data
function displayCrimes(crimes) {
    const crimeListContainer = document.getElementById("crime-list");
    crimeListContainer.innerHTML = ""; // Clear previous data

    crimes.forEach(crime => {
        const crimeElement = document.createElement("div");
        crimeElement.classList.add("crime");

        // Category
        const crimeCategory = document.createElement("h3");
        crimeCategory.textContent = crime.category;

        // Month as number instead of name
        const crimeMonth = document.createElement("p");
        const month = new Date(crime.date).getMonth() + 1; // Extract the month as a number (0-11, so add 1)
        crimeMonth.textContent = `Month: ${month}`;

        // Outcome
        const crimeOutcome = document.createElement("p");
        crimeOutcome.textContent = `Outcome: ${crime.outcome_status ? crime.outcome_status.category : 'No Outcome'}`;

        // Street Name (from location)
        const crimeStreet = document.createElement("p");
        const streetName = crime.location.street.name ? crime.location.street.name : "Unknown Street";
        crimeStreet.textContent = `Street: ${streetName}`;

        // Append all the elements to the crime element
        crimeElement.appendChild(crimeCategory);
        crimeElement.appendChild(crimeMonth);
        crimeElement.appendChild(crimeOutcome);
        crimeElement.appendChild(crimeStreet);

        crimeListContainer.appendChild(crimeElement);
    });
}

// Function to filter crimes based on search input
function filterCrimes() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const allCrimes = document.querySelectorAll(".crime");

    allCrimes.forEach(crime => {
        const crimeCategory = crime.querySelector("h3").textContent.toLowerCase();
        if (crimeCategory.includes(searchTerm)) {
            crime.style.display = 'block';
        } else {
            crime.style.display = 'none';
        }
    });
}

// Function to toggle dark and light modes
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Initial data fetch
fetchCrimeData();
