const todoForm = document.querySelector('.todo-form');
const taskInput = document.querySelector('#task-input');
const todoList = document.querySelector('#todo-list');


todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    addTask(task);
    taskInput.value = '';
  }
});


function addTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span onclick="editTask(this)">${task}</span>
      <div>
        <button onclick="editTaskPrompt(this)">Edit</button>
        <button onclick="deleteTask(this)">&times;</button>
      </div>
    `;
    li.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        li.classList.toggle('completed');
      }
    });
    todoList.appendChild(li);
  }

 
  function editTaskPrompt(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('span');
    const newTask = prompt('Edit your task:', taskText.textContent);
    if (newTask) {
      taskText.textContent = newTask;
    }
  }


function deleteTask(button) {
  button.parentElement.remove();
}