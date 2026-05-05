let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentDate = new Date();

const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = endX - startX;

  if (diff > 50) {
    // 👉 右スワイプ（前の月）
    currentDate.setMonth(currentDate.getMonth() - 1);
    render();
  } else if (diff < -50) {
    // 👉 左スワイプ（次の月）
    currentDate.setMonth(currentDate.getMonth() + 1);
    render();
  }
}
// 追加
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  tasks.push({
    text,
    done: false,
    date: new Date().toISOString()
  });

  saveTasks();
  render();
  input.value = "";
}

// 月ラベル
function updateMonthLabel() {
  const label = document.getElementById("monthLabel");
  if (!label) return;

  const y = currentDate.getFullYear();
  const m = currentDate.getMonth() + 1;
  label.textContent = `${y}年 ${m}月`;
}

// 表示
function render() {
  taskList.innerHTML = "";

  updateMonthLabel();

  const y = currentDate.getFullYear();
  const m = currentDate.getMonth();

  tasks
    .filter(task => {
      if (!task.date) return true;
      const d = new Date(task.date);
      return d.getFullYear() === y && d.getMonth() === m;
    })
    .forEach((task, index) => {

      const li = document.createElement("li");

      if (task.done) li.classList.add("done");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;

      checkbox.onchange = () => {
        task.done = !task.done;
        saveTasks();
        render();
      };

      const span = document.createElement("span");
      span.textContent = task.text;

      const delBtn = document.createElement("button");
      delBtn.textContent = "削除";
      delBtn.onclick = () => {
        tasks.splice(index, 1);
        saveTasks();
        render();
      };

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(delBtn);

      taskList.appendChild(li);
    });
}
let mouseStartX = 0;

document.addEventListener("mousedown", (e) => {
  mouseStartX = e.clientX;
});

document.addEventListener("mouseup", (e) => {
  const diff = e.clientX - mouseStartX;

  if (diff > 50) {
    currentDate.setMonth(currentDate.getMonth() - 1);
    render();
  } else if (diff < -50) {
    currentDate.setMonth(currentDate.getMonth() + 1);
    render();
  }
});
// 初期表示
render();