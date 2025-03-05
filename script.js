let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency");
const toDropDown = document.getElementById("to-currency");
const amountInput = document.querySelector(".styled-input");
const convertButton = document.getElementById("convert");
const result = document.getElementById("result");
const clearIcon = document.getElementById("clear");
const deleteIcon = document.getElementById("delete");

currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    fromDropDown.add(option1);
});

currencies.forEach((currency) =>{
    const option2 = document.createElement("option");
    option2.value = currency;
    option2.text = currency;
    toDropDown.add(option2);
});

//Setting default values
fromDropDown.value="USD";
toDropDown.value="LKR";

let convertCurrency = () => {
    const amount = amountInput.value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if (amount.length != 0) {
        fetch(api)
            .then((resp) => resp.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates[fromCurrency];
                let toExchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
                    2
                )} ${toCurrency}`;
            });
    } else {
        result.innerHTML = "Please enter amount";
    }
};

convertButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    convertCurrency();
});

clearIcon.addEventListener("click", () => {
    amountInput.value = amountInput.value.slice(0, -1);
});

deleteIcon.addEventListener("click", () => {
    amountInput.value = "";
});



