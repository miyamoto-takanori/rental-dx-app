const activeEl = document.getElementById("active");
const doneEl = document.getElementById("done");

function render() {
  activeEl.innerHTML = "";
  doneEl.innerHTML = "";

  cars.sort((a, b) => a.id - b.id);

  const activeCars = cars.filter(c => c.status === "active").slice(0, 4);
  const doneCars = cars.filter(c => c.status === "done").slice(0, 11);

  activeCars.forEach(car => createCard(car, true));
  doneCars.forEach(car => createCard(car, false));
}

function createCard(car, isActive) {
  const card = document.createElement("div");
  card.className = "card";
  if (isActive) card.classList.add("active-card");

  const tagClass = car.isInbound ? "black-tag" : "white-tag";

  card.innerHTML = `
    <div class="call ${tagClass}">${car.callNumber}</div>
    <div class="number">${car.carNumber}</div>
    <div class="type">${car.carType}</div>
  `;

  let timer;

  const start = () => {
    timer = setTimeout(() => {
      car.status = "done";
      render();
    }, 800);
  };

  const cancel = () => clearTimeout(timer);

  card.addEventListener("mousedown", start);
  card.addEventListener("mouseup", cancel);
  card.addEventListener("mouseleave", cancel);
  card.addEventListener("touchstart", start);
  card.addEventListener("touchend", cancel);

  if (car.status === "active") {
    activeEl.appendChild(card);
  } else {
    doneEl.appendChild(card);
  }
}

render();