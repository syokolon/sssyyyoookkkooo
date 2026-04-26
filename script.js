const calendar = document.getElementById("calendar");
const stamp = document.getElementById("stamp");
const stampImg = document.getElementById("stampImg");

const modal = document.getElementById("modal");
const suzuEl = document.getElementById("suzu");
const hidaEl = document.getElementById("hida");
const nadeEl = document.getElementById("nade");
const ajiEl = document.getElementById("aji");

const okBtn = document.getElementById("okBtn");
const cancelBtn = document.getElementById("cancelBtn");
const monthLabel = document.getElementById("monthLabel");
const totalBtn = document.getElementById("toggleTotal");
const totalBar = document.getElementById("monthTotal");

totalBtn.addEventListener("click", () => {
  totalBar.classList.toggle("show");
});
let currentDate = new Date();
let currentDay = null;
let dayElements = {};
let stampInterval;
let selectedType = "";
const RATE = 1180;

// ----------------------
// 月キー
// ----------------------
function getMonthKey() {
  const y = currentDate.getFullYear();
  const m = String(currentDate.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// ----------------------
// データ
// ----------------------
function loadData() {
  return JSON.parse(localStorage.getItem(getMonthKey())) || {};
}

let data = loadData();

// ----------------------
// 月表示
// ----------------------
function updateMonthLabel() {
  const y = currentDate.getFullYear();
  const m = currentDate.getMonth() + 1;
  monthLabel.innerText = `${y}年 ${m}月`;
}

// ----------------------
// 1日表示
// ----------------------
function renderDay(day) {
  const div = dayElements[day];
  const d = data[day];
  const total = d.suzu + d.hida + d.nade + d.aji;

  div.style.background = "";
  div.style.borderRadius = "";

  // 🏥 病院
  if (d.type === "病院") {
    div.style.background = "#ffd6d6";
    div.style.borderRadius = "10px";

    div.innerHTML = `
      <div class="date">${day}</div>
      <div class="type-big hospital">🏥 病院</div>
    `;
    return; // ←ここ超重要（これで止める）
  }

  // 🌙 休み
  if (d.type === "休み") {
    div.style.background = "#f0f0f0";
    div.style.borderRadius = "10px";

    div.innerHTML = `
      <div class="date faint-date">${day}</div>
      <div class="rest-big">休み</div>
    `;
    return; // ←これも必須
  }

  // 通常表示
  div.innerHTML = `
    <div class="date">${day}</div>
    <div class="total">合計: ${total}h</div>

    <div class="place">
      <img src="images/suzuran.png">
      suzu ${d.suzu}h
    </div>

    <div class="place">
      <img src="images/hidamari.png">
      hida ${d.hida}h
    </div>

    <div class="place">
      <img src="images/nadeshiko.png">
      nade ${d.nade}h
    </div>

    <div class="place">
      <img src="images/ajisai.png">
      aji ${d.aji}h
    </div>
  `;
}

// ----------------------
// カレンダー作成
// ----------------------
function renderCalendar() {
  calendar.innerHTML = "";
  dayElements = {};

  data = loadData();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.className = "day";

    if (!data[day]) {
      data[day] = {
        suzu: 0,
        hida: 0,
        nade: 0,
        aji: 0,
        type: ""
      };
    }

    dayElements[day] = div;

    renderDay(day);

    div.addEventListener("click", () => {
      currentDay = day;

      const d = data[day];
      suzuEl.innerText = d.suzu;
      hidaEl.innerText = d.hida;
      nadeEl.innerText = d.nade;
      ajiEl.innerText = d.aji;

      modal.classList.remove("hidden");
    });

     calendar.appendChild(div);
  }

  updateMonthTotal(); // ⭐これここに入れるのが正解
  updateMonthLabel();
}

// ----------------------
// OK保存
// ----------------------
okBtn.addEventListener("click", () => {
  data[currentDay] = {
    suzu: Number(suzuEl.innerText),
    hida: Number(hidaEl.innerText),
    nade: Number(nadeEl.innerText),
    aji: Number(ajiEl.innerText),
    type: selectedType
  };

  localStorage.setItem(getMonthKey(), JSON.stringify(data));

  renderCalendar();
  modal.classList.add("hidden");

  stamp.classList.remove("hidden");
  stamp.classList.add("show");

  let toggle = false;

  stampInterval = setInterval(() => {
    toggle = !toggle;
    stampImg.src = toggle
      ? "images/stamp1.png"
      : "images/stamp2.png";
  }, 200);

  setTimeout(() => {
    clearInterval(stampInterval);
    stamp.classList.add("hidden");
    stamp.classList.remove("show");
  }, 1000);
});

// ----------------------
// キャンセル
// ----------------------
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// ----------------------
// カウンター
// ----------------------
function change(type, num) {
  const el = document.getElementById(type);
  let value = Number(el.innerText);

  value += num;
  if (value < 0) value = 0;

  el.innerText = value;
}

// ----------------------
// タイプ選択
// ----------------------


function toggleType(type) {
  if (selectedType === type) {
    selectedType = "";
  } else {
    selectedType = type;
  }

  updateTypeUI();
}
function updateTypeUI() {
  const hospitalBtn = document.getElementById("btn-hospital");
  const holidayBtn = document.getElementById("btn-holiday");

  hospitalBtn.classList.remove("active");
  holidayBtn.classList.remove("active");

  if (selectedType === "病院") {
    hospitalBtn.classList.add("active");
  }

  if (selectedType === "休み") {
    holidayBtn.classList.add("active");
  }
}

function updateMonthTotal() {
  let suzu = 0;
  let hida = 0;
  let nade = 0;
  let aji = 0;

 for (let day in data) {
  const d = data[day];

  suzu += d.suzu || 0;
  hida += d.hida || 0;
  nade += d.nade || 0;
  aji += d.aji || 0;
}

  const totalHours = suzu + hida + nade + aji;
  const totalMoney = totalHours * RATE;

  document.getElementById("monthTotal").innerHTML = `
    すずらん：${suzu}h（¥${suzu * RATE}） /
    ひだまり：${hida}h（¥${hida * RATE}） /
    なでしこ：${nade}h（¥${nade * RATE}） /
    あじさい：${aji}h（¥${aji * RATE}）

    <hr>

    <div>
      <b>合計：${totalHours}h（¥${totalMoney}）</b>
    </div>
  `;
}
  document.getElementById("monthTotal").classList.add("show");
  document.getElementById("monthTotal").classList.remove("hidden");

// ----------------------
// 月移動
// ----------------------
document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// ----------------------
// 初期表示
// ----------------------

renderCalendar();
updateMonthLabel();