function render() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  cars.forEach(car => {
    const tr = document.createElement("tr");

    const tagClass = car.inbound ? "black-tag" : "white-tag";

    tr.innerHTML = `
      <td>
        <div class="call ${tagClass}">${car.call}</div>
      </td>
      <td>${car.time}</td>
      <td>
        <div>${car.class}</div>
        <div><b>${car.carType}</b></div>
      </td>
      <td>
        <div class="number-cell">
          <div class="area">${car.area}</div>
          <div class="number">${car.number}</div>
        </div>
      </td>
      <td>${car.options.join("<br>")}</td>
      <td>
        <div class="location">
          <span class="location-icon">📍</span>
          ${car.location}
        </div>
      </td>
      <td>
        <div class="status ${car.status}">
          ${label(car.status)}
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  updateTime();
}

function label(status) {
  if (status === "preparing") return "準備中";
  if (status === "ready") return "準備完了";
  return "受付済";
}

function updateTime() {
  const now = new Date();

  document.getElementById("time").innerText =
    now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });

  document.getElementById("date").innerText =
    now.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric", weekday: "short" });
}

render();
setInterval(updateTime, 60000);