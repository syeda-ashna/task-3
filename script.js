const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  tasks.push(taskText);
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

// Render task list
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => editTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Edit task
function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index]);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index] = newTask.trim();
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
