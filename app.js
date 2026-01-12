

let baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

let btn = document.querySelector("button");
const dropdwns = document.querySelectorAll(".dropdown select");
import { countryList } from "./code.js";

let fromcurr = document.querySelector("select[name='from']");
let tocurr = document.querySelector("select[name='to']");



for (let select of dropdwns) {

    for (const currencycode in countryList) {
        let newcurency = document.createElement("option");
        newcurency.innerText = currencycode;
        newcurency.value = currencycode;
        if (select.name === "from" && currencycode === "USD") {
            newcurency.selected = "true";

        } else if (select.name === "to" && currencycode === "INR") {
            newcurency.selected = "true";

        }
        select.append(newcurency);



    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);

    })

}
let updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#amount")
    let amountval = amount.value;
    if (amountval === "" || amountval <= 0) {
        amountval = 0;
        amount.value = "0";
        alert("Give proper forment");
    }
    let fromCurrencyCode = fromcurr.value.toLowerCase();
    let toCurrencyCode = tocurr.value.toLowerCase();


    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyCode}.json`;
   
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurrencyCode][toCurrencyCode];
    let finalAmount = amountval * rate.toFixed(5);
    
    let show = document.querySelector("#exchange-rate");

    

    show.innerText = `${finalAmount} ${toCurrencyCode.toUpperCase()}`;
})



