document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const todosContainer = document.getElementById("todos");

  todoForm.addEventListener("submit", handleAddTodo);

  function handleAddTodo(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === '' || description === '') {
      alert('Please fill in both fields');
      return;
    }

    const todo = { title, description, completed: false };
    addTodoToLocalStorage(todo);
    renderTodos();
    titleInput.value = '';
    descriptionInput.value = '';
  }

  function addTodoToLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    todosContainer.innerHTML = '';
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach((todo, index) => {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      if (todo.completed) {
        todoDiv.classList.add('completed');
      }

      const todoTitle = document.createElement('h3');
      todoTitle.textContent = `${index + 1}. ${todo.title}`;

      const todoDescription = document.createElement('p');
      todoDescription.textContent = todo.description;

      const completeButton = document.createElement('button');
      completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
      completeButton.addEventListener('click', () => toggleTodoCompleted(index));

      todoDiv.appendChild(todoTitle);
      todoDiv.appendChild(todoDescription);
      todoDiv.appendChild(completeButton);

      todosContainer.appendChild(todoDiv);
    });
  }

  function toggleTodoCompleted(index) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }

  renderTodos();
});
