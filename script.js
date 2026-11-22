const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

const STORAGE_KEY = 'my_todos';

// Завантажуємо справи з Local Storage або беремо початковий список
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false },
];

// Збереження масиву справ у Local Storage
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Крок 3: Додавання нової справи
function newTodo() {
  const text = prompt('Введіть нову справу:');
  if (!text || !text.trim()) {
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text.trim(),
    checked: false,
  };

  todos.push(newTask);
  saveTodos();
  render(todos);
  updateCounter();
}

// Крок 4: Створення HTML-розмітки для однієї справи
function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input
        type="checkbox"
        class="form-check-input me-2"
        id="${todo.id}"
        ${todo.checked ? 'checked' : ''}
        onchange="checkTodo(${todo.id})"
      />
      <label for="${todo.id}">
        <span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">
          ${todo.text}
        </span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">
        delete
      </button>
    </li>
  `;
}

// Крок 5: Відображення всього списку справ
function render(todosArray = todos) {
  list.innerHTML = todosArray.map((todo) => renderTodo(todo)).join('');
}

// Крок 6: Оновлення лічильників
function updateCounter() {
  itemCountSpan.textContent = todos.length;
  const uncheckedCount = todos.filter((todo) => !todo.checked).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

// Крок 7: Видалення справи
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render(todos);
  updateCounter();
}

// Крок 8: Відмітка виконання справи
function checkTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, checked: !todo.checked } : todo
  );
  saveTodos();
  render(todos);
  updateCounter();
}

// Початковий рендер при завантаженні сторінки
render(todos);
updateCounter();