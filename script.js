const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const totalCountEl = document.getElementById('total-count');
const completedCountEl = document.getElementById('completed-count');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item' + (task.completed ? ' completed' : '');

    const label = document.createElement('label');
    label.htmlFor = `task-${index}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task-${index}`;
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(index));

    const text = document.createElement('p');
    text.className = 'task-text';
    text.textContent = task.text;

    label.appendChild(checkbox);
    label.appendChild(text);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '✕';
    deleteButton.addEventListener('click', () => deleteTask(index));

    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });

  updateSummary();
}

function updateSummary() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  totalCountEl.textContent = `${total} task${total === 1 ? '' : 's'}`;
  completedCountEl.textContent = `${completed} completed`;
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  tasks.push({ text: trimmed, completed: false });
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

renderTasks();