document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currency-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const amount = parseFloat(document.getElementById("amount").value);
        const fromCurrency = document.getElementById("from-currency").value;
        const toCurrency = document.getElementById("to-currency").value;
        const resultElement = document.getElementById("result");

        if (isNaN(amount)) {
            alert("Please enter a valid amount.");
            return;
        }

        fetch(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        )
            .then((response) => response.json())
            .then((data) => {
                const conversionRate = data.rates[toCurrency];
                if (conversionRate) {
                    const convertedAmount = (amount * conversionRate).toFixed(2);
                    document.getElementById("converted-value").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                    resultElement.classList.add("show"); // Add animation class
                } else {
                    alert("Conversion rate not available. Please try again later.");
                }
            })
            .catch((error) => {
                console.error("Error fetching exchange rates:", error);
                alert("Error fetching exchange rates. Please try again later.");
            });
    });
});
