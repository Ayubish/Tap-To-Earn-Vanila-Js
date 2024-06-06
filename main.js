const coin = document.querySelector(".coin");
const div = document.querySelector(".count-wrapper");
const nameBox = document.querySelector(".name-box");
const counter = document.querySelector(".counter");
const progressFill = document.querySelector(".progress-bar-fill");
let magnitude = 10;
let totalAmount = localStorage.getItem("amount")
  ? parseInt(localStorage.getItem("amount"))
  : 0;
counter.innerText = totalAmount;
nameBox.innerHTML = localStorage.getItem("name");
let maxCapacity = 3000;
let leftCapacity = localStorage.getItem("leftCapacity")
  ? parseInt(localStorage.getItem("leftCapacity"))
  : 3000;

const capacity = document.querySelector(".capacity");

capacity.innerHTML = `${leftCapacity}/${maxCapacity}`;

let leftPercentage = (leftCapacity / maxCapacity) * 100;
progressFill.style.width = `${leftPercentage}%`;

coin.addEventListener("touchstart", (e) => {
  if (leftCapacity > 0) {
    e.preventDefault;
    [...e.changedTouches].forEach((touch) => {
      totalAmount += magnitude;
      counter.innerText = totalAmount;
      localStorage.setItem("amount", totalAmount);

      leftCapacity -= magnitude;
      capacity.innerHTML = `${leftCapacity}/${maxCapacity}`;
      localStorage.setItem("leftCapacity", leftCapacity);

      let leftPercentage = (leftCapacity / maxCapacity) * 100;
      progressFill.style.width = `${leftPercentage}%`;
      const floatingNumber = document.createElement("h2");
      floatingNumber.innerText = `+${magnitude}`;
      floatingNumber.className = "floating-count";
      floatingNumber.style.top = `${touch.pageY}px`;
      floatingNumber.style.left = `${touch.pageX}px`;

      div.append(floatingNumber);
    });
    setTimeout(() => {
      const floatingCoin = document.querySelector(".floating-count");
      div.removeChild(floatingCoin);
    }, 500);
  }
});

setInterval(() => {
  if (leftCapacity < maxCapacity) {
    leftCapacity += 5;
    capacity.innerHTML = `${leftCapacity}/${maxCapacity}`;
    localStorage.setItem("leftCapacity", leftCapacity);
  }
}, 1000);
