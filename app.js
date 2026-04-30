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
        <div class="class-badge">${car.class}</div>
        <div class="car-type"><b>${car.carType}</b></div>
      </td>
      <td>
        <div class="number-cell">
          <div class="area">${car.area}</div>
          <div class="number">${car.number}</div>
        </div>
      </td>
      <td>
        <ul class="info-list">
          ${car.options.map(option => `<li>${option}</li>`).join("")}
        </ul>
      </td>
      <td>
        <div class="location">
          <span class="location-icon icon-svg" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span>${car.location}</span>
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