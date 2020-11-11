// Select item from DOM
const currencyEl_One = document.getElementById("container__currencyOne");
const amountEl_One = document.getElementById("container__amountOne");

const currencyEl_Two = document.getElementById("container__currencyTwo");
const amountEl_Two = document.getElementById("container__amountTwo");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_One.value;
  const currency_two = currencyEl_Two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_Two.value = (amountEl_One.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEl_One.addEventListener("change", calculate);
amountEl_One.addEventListener("input", calculate);
currencyEl_Two.addEventListener("change", calculate);
amountEl_Two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_One.value;
  currencyEl_One.value = currencyEl_Two.value;
  currencyEl_Two.value = temp;
  calculate();
});

calculate();
