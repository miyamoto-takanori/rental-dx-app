function render() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  cars.forEach((car, index) => {
    const tr = document.createElement("tr");
    tr.className = car.keyObtained ? "row-key-obtained" : "";

    const tagClass = car.inbound ? "black-tag" : "white-tag";
    const statusClass = car.status === "preparing" ? "pending" : "received";
    const statusText = statusLabel(car.status);
    const infoContent = car.options.length > 0
      ? car.options.map(option => `<span class="info-tag">${option}</span>`).join("")
      : '<span class="info-empty">特記事項なし</span>';

    tr.innerHTML = `
      <td>
        <div class="call ${tagClass}">${car.call}</div>
      </td>
      <td>${car.time}</td>
      <td>
        <div class="class-badge">${car.class}</div>
        <div class="car-type">${car.carType}</div>
      </td>
      <td>
        <div class="number-cell">
          <div class="area">${car.area}</div>
          <div class="number">${car.number}</div>
        </div>
      </td>
      <td>
        <div class="info-panel">
          ${infoContent}
        </div>
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
        <div class="status ${statusClass}">
          ${statusText}
        </div>
      </td>
      <td class="action-cell">
        <label class="key-toggle">
          <input type="checkbox" ${car.keyObtained ? "checked" : ""} onchange="toggleKey(${index}, this)">
          <span>鍵取得</span>
        </label>
        <button class="delete-button" onclick="deleteRow(${index})">完了削除</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  updateTime();
}

function statusLabel(status) {
  return status === "preparing" ? "受付中" : "受付済";
}

function toggleKey(index, checkbox) {
  cars[index].keyObtained = checkbox.checked;
  render();
}

function deleteRow(index) {
  const car = cars[index];
  const confirmText = `${car.carType} ${car.number} の案内が完了したら、この行を削除しますか？`;
  if (!confirm(confirmText)) return;
  cars.splice(index, 1);
  render();
}

function updateTime() {
  const now = new Date();

  document.getElementById("time").innerText =
    now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  document.getElementById("date").innerText =
    now.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric", weekday: "short" });
}

render();
setInterval(updateTime, 1000);
