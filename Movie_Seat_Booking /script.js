// Select elements from DOM
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const moviesSelect = document.getElementById("movie");

populateUi();

let ticketPrice = +moviesSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get Data from localStorage and populate UI
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > -1) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    moviesSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie select event
moviesSelect.addEventListener("change", (evt) => {
  ticketPrice = +evt.target.value;
  setMovieData(evt.target.selectedIndex, evt.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (evt) => {
  console.log("hi");
  if (
    evt.target.classList.contains("seat") &&
    !evt.target.classList.contains("occupied")
  ) {
    evt.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial Count and total set
updateSelectedCount();
