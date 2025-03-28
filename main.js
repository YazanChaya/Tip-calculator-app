const inputPer = document.querySelector(".person-input");
const personNums = document.querySelector(".person-num");
const buttons = document.querySelectorAll(".input-div-pro .tip-div button");
const inTip = document.querySelector(".div-intip");
const inTotal = document.querySelector(".div-intip-total");
const resetBut = document.querySelector(".reset");

function validateInputs() {
  const billAmount = Number(inputPer.value);
  const numOfPeople = Number(personNums.value);

  if (billAmount <= 0 || isNaN(billAmount)) {
    alert("Please enter a valid bill amount");
    return false;
  }

  if (numOfPeople <= 0 || isNaN(numOfPeople)) {
    alert("Please enter a valid number of people");
    return false;
  }

  return true;
}

function calculateTip(tipPercentage) {
  if (!validateInputs()) return;

  const billAmount = Number(inputPer.value);
  const numOfPeople = Number(personNums.value);

  if (isNaN(tipPercentage)) {
    console.error("Invalid tip percentage value:", tipPercentage);
    return;
  }

  const tipAmount = billAmount * tipPercentage;

  const totalAmount = billAmount + tipAmount;

  const amountPerPerson = totalAmount / numOfPeople;

  const amountTip = tipAmount / numOfPeople;

  if (isNaN(amountPerPerson)) {
    console.error("Invalid result. Values used:", {
      billAmount,
      tipPercentage,
      numOfPeople,
      tipAmount,
      totalAmount,
    });
    inTotal.innerHTML = "$0.00";
    inTip.innerHTML = "$0.00";
    return;
  }

  inTotal.innerHTML = `$${amountPerPerson.toFixed(2)}`;
  inTip.innerHTML = `$${amountTip.toFixed(2)}`;
}

function initializeButtons() {
  console.log("data-pro values for buttons:");
  buttons.forEach((button, index) => {
    console.log(`Button ${index + 1}:`, button.dataset.pro);
  });

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      let tipPercentage = e.target.dataset.pro;
      console.log("Original data-pro value:", tipPercentage);

      if (typeof tipPercentage === "string" && tipPercentage.includes("%")) {
        tipPercentage = Number(tipPercentage.replace("%", "")) / 100;
      } else {
        tipPercentage = Number(tipPercentage);
      }

      console.log("Tip percentage after conversion:", tipPercentage);

      calculateTip(tipPercentage);
    });
  });

  inputPer.addEventListener("input", () => {
    const activeButton = document.querySelector(".tip-div button.active");
    if (activeButton) {
      let tipPercentage = activeButton.dataset.pro;
      if (typeof tipPercentage === "string" && tipPercentage.includes("%")) {
        tipPercentage = Number(tipPercentage.replace("%", "")) / 100;
      } else {
        tipPercentage = Number(tipPercentage);
      }
      calculateTip(tipPercentage);
    }
  });

  personNums.addEventListener("input", () => {
    const activeButton = document.querySelector(".tip-div button.active");
    if (activeButton) {
      let tipPercentage = activeButton.dataset.pro;
      if (typeof tipPercentage === "string" && tipPercentage.includes("%")) {
        tipPercentage = Number(tipPercentage.replace("%", "")) / 100;
      } else {
        tipPercentage = Number(tipPercentage);
      }
      calculateTip(tipPercentage);
    }
  });
}

function resetButton() {
  resetBut.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    inputPer.value = "";
    personNums.value = "";
    inTotal.innerHTML = "$0.00";
    inTip.innerHTML = "$0.00";
  });
}

resetButton();
initializeButtons();
