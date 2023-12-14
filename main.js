var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var TodoApp = /** @class */ (function () {
    function TodoApp() {
        var _this = this;
        var _a, _b;
        this.todos = [];
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'text';
        this.inputElement.placeholder = 'Add a new todo';
        this.todoContainer = document.createElement('div');
        var addButton = document.createElement('button');
        addButton.textContent = 'Add Todo';
        addButton.classList.add('btn', 'btn-primary', 'mr-2');
        addButton.addEventListener('click', this.addTodo.bind(this));
        var clearButton = document.createElement('button');
        clearButton.textContent = 'Clear All';
        clearButton.classList.add('btn', 'btn-danger', 'mr-2');
        clearButton.addEventListener('click', this.clearTodos.bind(this));
        (_a = document.getElementById('app')) === null || _a === void 0 ? void 0 : _a.append(this.inputElement, addButton, clearButton);
        (_b = document.getElementById('todo-container')) === null || _b === void 0 ? void 0 : _b.appendChild(this.todoContainer);
        this.loadTodos();
        this.renderTodos();
        this.todoContainer.style.height = '300px';
        this.todoContainer.style.overflowY = 'auto';
        this.todoContainer.style.overflowX = 'hidden';
        this.todoContainer.style.scrollbarWidth = 'none'; // For Firefox
        this.todoContainer.style.msOverflowStyle = 'none'; // For IE and Edge
        this.todoContainer.style.webkitOverflowScrolling = 'auto'; // For iOS
        this.inputElement.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                _this.addTodo();
            }
        });
    }
    TodoApp.prototype.addTodo = function () {
        var todoText = this.inputElement.value.trim();
        if (todoText !== '') {
            var newTodo = {
                id: this.todos.length + 1,
                text: todoText,
                isDone: false,
            };
            this.todos.push(newTodo);
            this.saveTodos();
            this.renderTodos();
            var addedTodo = document.getElementById("todo-".concat(newTodo.id));
            if (addedTodo) {
                addedTodo.style.animation = 'fadeIn 0.5s ease-out';
            }
            this.inputElement.value = '';
        }
    };
    TodoApp.prototype.deleteTodo = function (id) {
        var _this = this;
        var deletedTodo = document.getElementById("todo-".concat(id));
        if (deletedTodo) {
            deletedTodo.style.animation = 'slideAndFadeOut 0.5s ease-out';
            setTimeout(function () {
                _this.todos = _this.todos.filter(function (todo) { return todo.id !== id; });
                _this.saveTodos();
                _this.renderTodos();
            }, 500);
        }
    };
    TodoApp.prototype.clearTodos = function () {
        var _this = this;
        this.todos.forEach(function (todo) {
            var deletedTodo = document.getElementById("todo-".concat(todo.id));
            if (deletedTodo) {
                deletedTodo.style.animation = 'slideAndFadeOut 0.5s ease-out';
            }
        });
        setTimeout(function () {
            _this.todos = [];
            _this.saveTodos();
            _this.renderTodos();
        }, 500);
    };
    TodoApp.prototype.toggleDone = function (id) {
        this.todos = this.todos.map(function (todo) { return (__assign(__assign({}, todo), { isDone: todo.id === id ? !todo.isDone : todo.isDone })); });
        this.saveTodos();
        this.renderTodos();
    };
    TodoApp.prototype.editTodo = function (id) {
        var _a;
        var newText = prompt('Edit todo:', ((_a = this.todos.find(function (todo) { return todo.id === id; })) === null || _a === void 0 ? void 0 : _a.text) || '');
        if (newText !== null) {
            this.todos = this.todos.map(function (todo) { return (__assign(__assign({}, todo), { text: todo.id === id ? newText : todo.text })); });
            this.saveTodos();
            this.renderTodos();
        }
    };
    TodoApp.prototype.renderTodos = function () {
        var _this = this;
        this.todoContainer.innerHTML = '';
        this.todos.forEach(function (todo) {
            var todoItem = document.createElement('div');
            todoItem.id = "todo-".concat(todo.id);
            todoItem.classList.add('todo-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'p-2', 'bg-light', 'rounded');
            var todoTextElement = document.createElement('span');
            todoTextElement.textContent = todo.text;
            if (todo.isDone) {
                todoTextElement.classList.add('text-muted', 'text-decoration-line-through');
            }
            var buttonsContainer = document.createElement('div');
            var markAsDoneButton = document.createElement('button');
            markAsDoneButton.textContent = todo.isDone ? 'Undo' : 'Done';
            markAsDoneButton.classList.add('btn', 'btn-success', 'mr-2');
            markAsDoneButton.addEventListener('click', function () { return _this.toggleDone(todo.id); });
            var editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-warning', 'mr-2');
            editButton.addEventListener('click', function () { return _this.editTodo(todo.id); });
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.addEventListener('click', function () { return _this.deleteTodo(todo.id); });
            buttonsContainer.appendChild(markAsDoneButton);
            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(deleteButton);
            todoItem.appendChild(todoTextElement);
            todoItem.appendChild(buttonsContainer);
            _this.todoContainer.appendChild(todoItem);
        });
    };
    TodoApp.prototype.saveTodos = function () {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    };
    TodoApp.prototype.loadTodos = function () {
        var storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    };
    return TodoApp;
}());
var app = new TodoApp();
