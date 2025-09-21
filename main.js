// time
const time = document.querySelector("#time");
// form
const form = document.querySelector("#form");
const formInput = document.querySelector("#formInput");

form.addEventListener("submit", addNewTasks);
// task
const taskUlLeft = document.querySelector("#tasksLeft");
const checkMark = document.querySelector(".check");
const cross = document.querySelector(".cross");

const tasksUlRight = document.querySelector("#tasksRight");
const LenghtRightTasks = document.querySelector("#LenghtRightTasks");

function addNewTasks(event) {
  event.preventDefault();
  let valueForm = formInput.value.trim();

  if (formInput.value === "") {
    alert("Укажите название вашей задачи ❌");
    return;
  } else {
    alert("задача была успешно создана! ✅");
  }

  if (valueForm === "") {
    valueForm = "Секретная задача 🤫";
  } else if (valueForm === "Секретная задача 🤫") {
    valueForm = "Эта задача уже слишком секретная. 🤫";
  } else if (valueForm === "Эта задача уже слишком секретная. 🤫") {
    valueForm = "Эта шутка уже не работает! 😉";
  }

  let taskHTML = `
   <li class="task">
    <p class="task-value">${valueForm}</p>
     <div class="task-btn ">
      <button class="check">✔</button>
      <button class="cross">⛌</button>
     </div>
   </li>`;

  taskUlLeft.innerHTML += taskHTML;
  formInput.value = "";
  numberLeftTasks();
  localStorageTasks()
}

function numberLeftTasks() {
  const LenghtLeftTasks = document.querySelector("#LenghtLeftTasks");
  const leftTasks = taskUlLeft.querySelectorAll("li");
  LenghtLeftTasks.textContent = leftTasks.length;
}

function numberRightTasks() {
  const lenghtRightTasks = document.querySelector("#LenghtRightTasks");
  const rightTasks = tasksUlRight.querySelectorAll("li");
  lenghtRightTasks.textContent = rightTasks.length;
}

taskUlLeft.addEventListener("click", taskButtons);

function taskButtons(event) {
  const crossBtn = event.target.closest(".cross");
  const doneBtn = event.target.closest(".check");

  if (crossBtn) {
    const deleteBtn = crossBtn.closest(".task");
    deleteBtn.remove();
    numberLeftTasks();
    numberRightTasks();
    localStorageTasks()
  }

  if (doneBtn) {
    const checkMark = doneBtn.closest(".task");
    checkMark.querySelector(".check").remove();
    checkMark.querySelector(".task-value").classList.add("done");
    tasksUlRight.appendChild(checkMark);
    numberLeftTasks();
    numberRightTasks();
  }
}

tasksUlRight.addEventListener("click", tasksRight);

function tasksRight(event) {
  const crossBtn = event.target.closest(".cross");
  if (crossBtn) {
    const deleteBtn = crossBtn.closest(".task");
    deleteBtn.remove();
    numberLeftTasks();
    numberRightTasks();
    localStorageTasks()
  }
}

function localStorageTasks() {
  localStorage.setItem("TaskLeft", taskUlLeft.innerHTML);
  localStorage.setItem("TaskRight", rightTasks.innerHTML);
}

function showTask() {
  taskUlLeft.innerHTML = localStorage.getItem("TaskLeft");
  rightTasks.innerHTML = localStorage.getItem("TaskRight");
}

function currentTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  time.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(currentTime, 1000);
showTask()
