const taskNameInput = document.getElementById("task-name");
const taskDateInput = document.getElementById("task-date");
const taskCategorySelect = document.getElementById("task-category");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("tasks");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const overdueTasks = document.getElementById("overdue-tasks");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";
  let completedCount = 0;
  let overdueCount = 0;

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add(`category-${task.category.toLowerCase()}`);

    const taskDetails = document.createElement("div");
    taskDetails.className = "task-details";
    taskDetails.innerHTML = `
      <strong>${task.name}</strong>
      <small>Due: ${task.dueDate}</small>
    `;

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", () => {
      task.completed = true;
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    if (task.completed) {
      taskItem.style.textDecoration = "line-through";
      completedCount++;
    } else if (new Date(task.dueDate) < new Date()) {
      overdueCount++;
      taskItem.style.backgroundColor = "#f8d7da";
    }

    taskItem.appendChild(taskDetails);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedCount;
  overdueTasks.textContent = overdueCount;
}

addTaskButton.addEventListener("click", () => {
  const taskName = taskNameInput.value.trim();
  const taskDate = taskDateInput.value;
  const taskCategory = taskCategorySelect.value;

  if (taskName && taskDate) {
    tasks.push({
      name: taskName,
      dueDate: taskDate,
      category: taskCategory,
      completed: false,
    });
    taskNameInput.value = "";
    taskDateInput.value = "";
    renderTasks();
  }
});
