
/* フォルダ名 */
const params =
new URLSearchParams(location.search);

const folderName =
params.get("folder");

/* 要素 */
const title =
document.getElementById("title");

const taskInput =
document.getElementById("taskInput");

const addBtn =
document.getElementById("addBtn");

const taskList =
document.getElementById("taskList");

const monthTitle =
document.getElementById("monthTitle");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

/* タイトル */
title.textContent = folderName;

/* 現在月 */
let currentDate = new Date();

/* 月ごとのTODO */
const tasksByMonth = {};

/* キー */
function getKey(){

  return (
    folderName + "-" +
    currentDate.getFullYear() + "-" +
    currentDate.getMonth()
  );

}

/* 月表示 */
function renderMonth(){

  const year =
  currentDate.getFullYear();

  const month =
  currentDate.getMonth() + 1;

  monthTitle.textContent =
  `${year}年 ${month}月`;

  renderTasks();

}

/* TODO表示 */
function renderTasks(){

  taskList.innerHTML = "";

  const key = getKey();

  if(!tasksByMonth[key]){
    tasksByMonth[key] = [];
  }

  tasksByMonth[key].forEach(task => {

    const li =
    document.createElement("li");

    li.textContent = task;

    taskList.appendChild(li);

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

/* 追加 */
addBtn.addEventListener("click", () => {

  const text =
  taskInput.value.trim();

  if(text === "") return;

  const key = getKey();

  if(!tasksByMonth[key]){
    tasksByMonth[key] = [];
  }

  tasksByMonth[key].push(text);

  renderTasks();

  taskInput.value = "";

});
#backBtn{
  border:none;
  background:#FFD966;
  padding:12px 18px;
  border-radius:16px;
  font-size:16px;
  margin-bottom:20px;
}