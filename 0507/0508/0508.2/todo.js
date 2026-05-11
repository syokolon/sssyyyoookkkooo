/* 要素取得 */
const folderList =
document.getElementById("folderList");

const addFolderBtn =
document.getElementById("addFolderBtn");

const modal =
document.getElementById("modal");

const folderInput =
document.getElementById("folderInput");

const createBtn =
document.getElementById("createBtn");

const cancelBtn =
document.getElementById("cancelBtn");

const monthTitle =
document.getElementById("monthTitle");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

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

/* 月ごとの保存 */
const foldersByMonth = {};

/* 現在の月 */
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

/* フォルダ表示 */
function renderFolders(){

  folderList.innerHTML = "";

  const key =
  `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  const folders =
  foldersByMonth[key] || [];

  folders.forEach(data => {

    const folder =
    document.createElement("div");

    folder.className = "folder";

    folder.style.background =
    data.color;

    folder.innerHTML = `
      <div class="icon">📁</div>
      <div>${data.name}</div>
    `;

    folderList.appendChild(folder);

  });

}

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

  const key =
  `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  if(!foldersByMonth[key]){
    foldersByMonth[key] = [];
  }

  foldersByMonth[key].push({
    name: folderName,
    color: colors[colorIndex]
  });

  colorIndex++;

  if(colorIndex >= colors.length){
    colorIndex = 0;
  }

  renderFolders();

  modal.style.display = "none";

}

/* ← */
prevBtn.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderMonth();
  renderFolders();

});

/* → */
nextBtn.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderMonth();
  renderFolders();

});

/* 最初表示 */
renderMonth();
renderFolders();

/* ← */
document.getElementById("prevBtn")
.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderMonth();

});

/* → */
document.getElementById("nextBtn")
.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderMonth();

});
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
const foldersByMonth = {};
let colorIndex = 0;
let colorIndex = 0;

/* 月ごとの保存 */
const foldersByMonth = {};
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
function renderFolders(){

  folderList.innerHTML = "";

  const key =
  `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  const folders =
  foldersByMonth[key] || [];

  folders.forEach(data => {

    const folder =
    document.createElement("div");

    folder.className = "folder";

    folder.style.background =
    data.color;

    folder.innerHTML = `
      <div class="icon">📁</div>
      <div>${data.name}</div>
    `;

    folderList.appendChild(folder);

  });

}
});

/* フォルダ作成 */
function createFolder(){

  const folderName = folderInput.value.trim();

  if(folderName === "") return;

  /* 今の年月キー */
  const key =
  `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  /* 初回なら配列作る */
  if(!foldersByMonth[key]){
    foldersByMonth[key] = [];
  }

  /* 保存 */
  foldersByMonth[key].push({
    name: folderName,
    color: colors[colorIndex]
  });

  colorIndex++;

  if(colorIndex >= colors.length){
    colorIndex = 0;
  }

  /* 再表示 */
  renderFolders();

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

const todoPage =
document.getElementById("todoPage");

const todoTitle =
document.getElementById("todoTitle");

const backBtn =
document.getElementById("backBtn");

const taskInput =
document.getElementById("taskInput");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskList =
document.getElementById("taskList");

function renderMonth(){


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
backBtn.addEventListener("click", () => {

  todoPage.style.display = "none";

  folderList.style.display = "grid";

});
addTaskBtn.addEventListener("click", () => {

  const text =
  taskInput.value.trim();

  if(text === "") return;

  const li =
  document.createElement("li");

  li.textContent = text;

  taskList.appendChild(li);

  taskInput.value = "";

});