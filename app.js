const activeEl = document.getElementById("active");
const doneEl = document.getElementById("done");

function render() {
  activeEl.innerHTML = "";
  doneEl.innerHTML = "";

  // 並び順（ID順）
  cars.sort((a, b) => a.id - b.id);

  const activeCars = cars.filter(c => c.status === "active").slice(0, 4);
  const doneCars = cars.filter(c => c.status === "done").slice(0, 11);

  activeCars.forEach(createCard);
  doneCars.forEach(createCard);
}

function createCard(car) {
  const card = document.createElement("div");
  card.className = "card";

  const tagClass = car.isInbound ? "black-tag" : "white-tag";

  card.innerHTML = `
    <div class="call ${tagClass}">${car.callNumber}</div>
    <div class="number">${car.carNumber}</div>
    <div class="type">${car.carType}</div>
    <div class="loc">${car.location}</div>
  `;

  // 長押しで「案内完了」
  let timer;

  card.addEventListener("mousedown", () => {
    timer = setTimeout(() => {
      car.status = "done";
      render();
    }, 800);
  });

  card.addEventListener("mouseup", () => clearTimeout(timer));
  card.addEventListener("mouseleave", () => clearTimeout(timer));

  // どこに追加するか
  if (car.status === "active") {
    activeEl.appendChild(card);
  } else {
    doneEl.appendChild(card);
  }
}

render();