let balance = 10000;
let correctPin = "1234";

function verifyPin() {
  let pin = prompt("Enter Your PIN:");

  if (pin === correctPin) {
    return true;
  } else {
    alert("Incorrect PIN");
    return false;
  }
}

function withdrawMoney() {
  if (verifyPin()) {
    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0) {
      alert("Enter valid amount");
    } else if (amount > balance) {
      alert("Insufficient Balance");
    } else {
      balance = balance - amount;
      alert("Withdrawal Successful");
      checkBalanceDisplay();
    }
  }
}

function depositMoney() {
  if (verifyPin()) {
    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0) {
      alert("Enter valid amount");
    } else {
      balance = balance + amount;
      alert("Deposit Successful");
      checkBalanceDisplay();
    }
  }
}

function checkBalanceDisplay() {
  document.getElementById("balance").innerText =
    "Current Balance: Rs. " + balance;
}
