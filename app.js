const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for(currcode in countryList){
        let new_option=document.createElement("option");
        new_option.innerText = currcode;
        new_option.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            new_option.selected = "selected";
        }else if(select.name === "to" && currcode === "PKR"){
            new_option.selected = "selected";
        }
        select.append(new_option);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
};


const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    ExchangeRates();
});

const ExchangeRates = async () => {
    let amt=document.querySelector(".amount input");
    let amtVal=amt.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amt.value="1";
    }
    console.log(amtVal);
  
    console.log(fromCurr.value,toCurr.value);
    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let ExchangedAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value}=${ExchangedAmount} ${toCurr.value}`;
    console.log(data);
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    ExchangeRates();
});


window.addEventListener("load", ()=>{
    ExchangeRates();
});