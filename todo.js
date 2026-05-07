/* 要素取得 */
const folderList = document.getElementById("folderList");

const addFolderBtn = document.getElementById("addFolderBtn");

const modal = document.getElementById("modal");

const folderInput = document.getElementById("folderInput");

const createBtn = document.getElementById("createBtn");

const cancelBtn = document.getElementById("cancelBtn");

/* フォルダ色 */
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

/* ＋ボタン押した */
addFolderBtn.addEventListener("click", () => {

  modal.style.display = "flex";

  folderInput.value = "";

  folderInput.focus();

});

/* キャンセル */
cancelBtn.addEventListener("click", () => {

  modal.style.display = "none";

});

/* 作成ボタン */
createBtn.addEventListener("click", createFolder);

/* Enterキー */
folderInput.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){

    createFolder();

  }

});

/* フォルダ作成 */
function createFolder(){

  const folderName = folderInput.value.trim();

  if(folderName === "") return;

  /* フォルダ生成 */
  const folder = document.createElement("div");

  folder.className = "folder";

  /* 色 */
  folder.style.background = colors[colorIndex];

  colorIndex++;

  if(colorIndex >= colors.length){

    colorIndex = 0;

  }

  /* 中身 */
  folder.innerHTML = `
    <div class="icon">📁</div>
    <div>${folderName}</div>
  `;

  /* 追加 */
  folderList.appendChild(folder);

  /* 閉じる */
  modal.style.display = "none";

}

/* モーダル外クリック */
modal.addEventListener("click", (e) => {

  if(e.target === modal){

    modal.style.display = "none";

  }

});