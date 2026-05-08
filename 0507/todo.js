/* 要素取得 */
const folderList =
document.getElementById("folderList");

const addFolderBtn =
document.getElementById("addFolderBtn");

const monthTitle =
document.getElementById("monthTitle");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

/* 月 */
let currentDate = new Date();

/* 月表示 */
function renderMonth(){

  const year =
  currentDate.getFullYear();

  const month =
  currentDate.getMonth() + 1;

  monthTitle.textContent =
  `${year}年 ${month}月`;

}

renderMonth();

/* ← */
prevBtn.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderMonth();

});

/* → */
nextBtn.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderMonth();

});

/* 色 */
const colors = [
  "#FFD966",
  "#A4C2F4",
  "#B6D7A8",
  "#F4CCCC",
  "#D9B3FF",
  "#F9CB9C",
  "#D0E0E3",
  "#EAD1DC"
];

let colorIndex = 0;

/* フォルダ追加 */
addFolderBtn.addEventListener("click", () => {

  const folderName =
  prompt("フォルダ名を入力");

  if(!folderName) return;

  const folder =
  document.createElement("div");

  folder.className = "folder";

  folder.style.background =
  colors[colorIndex];

  colorIndex++;

  if(colorIndex >= colors.length){

    colorIndex = 0;

  }

  folder.innerHTML = `
    <div class="icon">📁</div>
    <div>${folderName}</div>
  `;

  folderList.appendChild(folder);

});

/* スワイプ */
let startX = 0;

document.addEventListener("touchstart", (e) => {

  startX = e.touches[0].clientX;

});

document.addEventListener("touchend", (e) => {

  let endX =
  e.changedTouches[0].clientX;

  let diff = endX - startX;

  /* 右 */
  if(diff > 50){

    currentDate.setMonth(
      currentDate.getMonth() - 1
    );

    renderMonth();

  }

  /* 左 */
  if(diff < -50){

    currentDate.setMonth(
      currentDate.getMonth() + 1
    );

    renderMonth();

  }

});

});

nextBtn.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderMonth();

});

/* 色 */
const colors = [
  "#FFD966",
  "#A4C2F4",
  "#B6D7A8",
  "#F4CCCC",
  "#D9B3FF",
  "#F9CB9C",
  "#D0E0E3",
  "#EAD1DC"
];

let colorIndex = 0;

/* ＋ボタン */
addFolderBtn.addEventListener("click", () => {

  modal.style.display = "flex";

  folderInput.value = "";

  folderInput.focus();

});

/* キャンセル */
cancelBtn.addEventListener("click", () => {

  modal.style.display = "none";

});

/* 作成 */
createBtn.addEventListener("click", createFolder);

/* Enter */
folderInput.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){

    createFolder();

  }

});

/* フォルダ作成 */
function createFolder(){

  const folderName =
  folderInput.value.trim();

  if(folderName === "") return;

  const folder =
  document.createElement("div");

  folder.className = "folder";

  folder.style.background =
  colors[colorIndex];

  colorIndex++;

  if(colorIndex >= colors.length){

    colorIndex = 0;

  }

  folder.innerHTML = `
    <div class="icon">📁</div>
    <div>${folderName}</div>
  `;

  folderList.appendChild(folder);

  modal.style.display = "none";

}

/* 外クリック */
modal.addEventListener("click", (e) => {

  if(e.target === modal){

    modal.style.display = "none";

  }

});

/* スワイプ */
let startX = 0;

document.addEventListener("touchstart", (e) => {

  startX = e.touches[0].clientX;

});

document.addEventListener("touchend", (e) => {

  let endX =
  e.changedTouches[0].clientX;

  let diff = endX - startX;

  /* 右 */
  if(diff > 50){

    currentDate.setMonth(
      currentDate.getMonth() - 1
    );

    renderMonth();

  }

  /* 左 */
  if(diff < -50){

    currentDate.setMonth(
      currentDate.getMonth() + 1
    );

    renderMonth();

  }

});let currentDate = new Date();

const monthTitle =
document.getElementById("monthTitle");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

function renderMonth(){

  const year =
  currentDate.getFullYear();

  const month =
  currentDate.getMonth() + 1;

  monthTitle.textContent =
  `${year}年 ${month}月`;

}

renderMonth();

prevBtn.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderMonth();

});

nextBtn.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderMonth();

});