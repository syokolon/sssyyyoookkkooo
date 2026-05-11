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

/* 現在月 */
let currentDate = new Date();

/* 月キー */
function getMonthKey(){

  return `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

}

/* 月表示 */
function renderMonth(){

  const year =
  currentDate.getFullYear();

  const month =
  currentDate.getMonth() + 1;

  monthTitle.textContent =
  `${year}年 ${month}月`;

  renderFolders();

}

/* フォルダ表示 */
function renderFolders(){

  folderList.innerHTML = "";

  const key = getMonthKey();

  if(!foldersByMonth[key]){
    foldersByMonth[key] = [];
  }

  foldersByMonth[key].forEach(folderData => {

    const folder =
    document.createElement("div");

    folder.className = "folder";

    folder.style.background =
    folderData.color;

    folder.innerHTML = `
      <div class="icon">📁</div>
      <div>${folderData.name}</div>
    `;

    folderList.appendChild(folder);

  });

}

/* 最初 */
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

/* ＋ボタン */
addFolderBtn.addEventListener("click", () => {

  modal.style.display = "flex";

});

/* キャンセル */
cancelBtn.addEventListener("click", () => {

  modal.style.display = "none";

});

/* 作成 */
createBtn.addEventListener("click", () => {

  const name =
  folderInput.value.trim();

  if(name === "") return;

  const color =
  colors[colorIndex];

  colorIndex++;

  if(colorIndex >= colors.length){
    colorIndex = 0;
  }

  const key =
  getMonthKey();

  if(!foldersByMonth[key]){
    foldersByMonth[key] = [];
  }

  foldersByMonth[key].push({
    name:name,
    color:color
  });

  renderFolders();

  folderInput.value = "";

  modal.style.display = "none";

});