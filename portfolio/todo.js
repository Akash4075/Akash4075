window.onload = () => {
  if (localStorage.getItem("tasks")) {
    document.getElementById("taskList").innerHTML = localStorage.getItem("tasks");
    addEventListeners();
  }
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">🗑️</button>
  `;
  li.addEventListener("click", function () {
    this.classList.toggle("checked");
    saveTasks();
  });

  document.getElementById("taskList").appendChild(li);
  input.value = "";
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

function addEventListeners() {
  document.querySelectorAll("#taskList li").forEach(li => {
    li.addEventListener("click", function () {
      this.classList.toggle("checked");
      saveTasks();
    });
  });
}
