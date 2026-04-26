const calendar = document.getElementById("calendar");
const stamp = document.getElementById("stamp");
const stampImg = document.getElementById("stampImg");
let stampInterval;
let currentDate = new Date();
// 月管理



function getMonthKey() {
  const y = currentDate.getFullYear();
  const m = String(currentDate.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// データ
let data = JSON.parse(localStorage.getItem(getMonthKey())) || {};

// UI
const modal = document.getElementById("modal");
const suzuEl = document.getElementById("suzu");
const hidaEl = document.getElementById("hida");
const nadeEl = document.getElementById("nade");
const ajiEl = document.getElementById("aji");

const okBtn = document.getElementById("okBtn");



const cancelBtn = document.getElementById("cancelBtn");

const monthLabel = document.getElementById("monthLabel");

let currentDay = null;
let dayElements = {};

// 月表示
function updateMonthLabel() {
  const y = currentDate.getFullYear();
  const m = currentDate.getMonth() + 1;
  monthLabel.innerText = `${y}年 ${m}月`;
}

// カレンダー生成
function renderCalendar() {
  calendar.innerHTML = "";
  dayElements = {};

  data = JSON.parse(localStorage.getItem(getMonthKey())) || {};

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

  // 空白
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  // 日付
  for (let day = 1; day <= daysInMonth; day++) {

    const div = document.createElement("div");
    div.className = "day";

    // 今日を赤枠
    const today = new Date();
   if (
  day === today.getDate() &&
  currentDate.getMonth() === today.getMonth() &&
  currentDate.getFullYear() === today.getFullYear()
) {
  div.style.background = "#ffe4ec";       // ピンク
  div.style.border = "2px solid #ff69b4"; // 濃いピンク
  div.style.borderRadius = "10px";        // 角丸
  div.style.boxShadow = "0 0 8px #ffb6c1"; // ふんわり光
}

    // データ初期化
    if (!data[day]) {
      data[day] = { suzu: 0, hida: 0, nade: 0, aji: 0 };
    }

    dayElements[day] = div;

    renderDay(day);

    // クリック
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

  updateMonthLabel();
}

// 日表示
function renderDay(day) {
  const div = dayElements[day];
  const d = data[day];
  const total = d.suzu + d.hida + d.nade + d.aji;

  div.innerHTML = `
    <div class="date">${day}</div>
    <div class="total">合計: ${total}h</div>

    <div class="place"><img src="images/suzuran.png"> ${d.suzu}h</div>
    <div class="place"><img src="images/hidamari.png"> ${d.hida}h</div>
    <div class="place"><img src="images/nadeshiko.png"> ${d.nade}h</div>
    <div class="place"><img src="images/ajisai.png"> ${d.aji}h</div>
  `;
}

// カウンター
function change(type, num) {
  const el = document.getElementById(type);
  let value = Number(el.innerText);

  value += num;
  if (value < 0) value = 0;

  el.innerText = value;
}

// OKボタン
okBtn.addEventListener("click", () => {
  data[currentDay] = {
    suzu: Number(suzuEl.innerText),
    hida: Number(hidaEl.innerText),
    nade: Number(nadeEl.innerText),
    aji: Number(ajiEl.innerText),
  };

  localStorage.setItem(getMonthKey(), JSON.stringify(data));

  renderDay(currentDay);

  // モーダル確実に閉じる
  modal.classList.add("hidden");

  // スタンプ表示
  stamp.classList.remove("hidden"); // ←ここ重要
  stamp.classList.add("show");

  let toggle = false;

  stampInterval = setInterval(() => {
    toggle = !toggle;
    stampImg.src = toggle ? "images/stamp1.png" : "images/stamp2.png";
  }, 200);

  setTimeout(() => {
    clearInterval(stampInterval);
    stamp.classList.add("hidden");  // ←showじゃなくhiddenで戻す
    stamp.classList.remove("show");
  }, 1000);
});


// キャンセル
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// 月切り替え
document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// 初期表示
renderCalendar();
  