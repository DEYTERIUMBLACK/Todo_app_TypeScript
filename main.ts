interface Todo {
    id: number;
    text: string;
    isDone: boolean;
}

class TodoApp {
    private todos: Todo[] = [];
    private inputElement: HTMLInputElement;
    private todoContainer: HTMLDivElement;

    constructor() {
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'text';
        this.inputElement.placeholder = 'Add a new todo';
        this.todoContainer = document.createElement('div');

        const addButton = document.createElement('button');
        addButton.textContent = 'Add Todo';
        addButton.classList.add('btn', 'btn-primary', 'mr-2');
        addButton.addEventListener('click', this.addTodo.bind(this));

        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear All';
        clearButton.classList.add('btn', 'btn-danger', 'mr-2');
        clearButton.addEventListener('click', this.clearTodos.bind(this));

        document.getElementById('app')?.append(this.inputElement, addButton, clearButton);
        document.getElementById('todo-container')?.appendChild(this.todoContainer);

        this.loadTodos();
        this.renderTodos();
        this.todoContainer.style.height = '300px'; 
        this.todoContainer.style.overflowY = 'auto'; 
        this.todoContainer.style.overflowX = 'hidden'; 

        this.todoContainer.style.scrollbarWidth = 'none'; // For Firefox
        this.todoContainer.style.msOverflowStyle = 'none'; // For IE and Edge
        this.todoContainer.style.webkitOverflowScrolling = 'auto'; // For iOS


        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.addTodo();
            }
        });
    }

    private addTodo() {
        const todoText = this.inputElement.value.trim();
        if (todoText !== '') {
            const newTodo: Todo = {
                id: this.todos.length + 1,
                text: todoText,
                isDone: false,
            };

            this.todos.push(newTodo);
            this.saveTodos();
            this.renderTodos();

            const addedTodo = document.getElementById(`todo-${newTodo.id}`);
            if (addedTodo) {
                addedTodo.style.animation = 'fadeIn 0.5s ease-out';
            }

            this.inputElement.value = '';
        }
    }

    private deleteTodo(id: number) {
        const deletedTodo = document.getElementById(`todo-${id}`);
        if (deletedTodo) {
            deletedTodo.style.animation = 'slideAndFadeOut 0.5s ease-out';

            setTimeout(() => {
                this.todos = this.todos.filter(todo => todo.id !== id);
                this.saveTodos();
                this.renderTodos();
            }, 500);
        }
    }

    private clearTodos() {
        this.todos.forEach(todo => {
            const deletedTodo = document.getElementById(`todo-${todo.id}`);
            if (deletedTodo) {
                deletedTodo.style.animation = 'slideAndFadeOut 0.5s ease-out';
            }
        });

        setTimeout(() => {
            this.todos = [];
            this.saveTodos();
            this.renderTodos();
        }, 500);
    }

    private toggleDone(id: number) {
        this.todos = this.todos.map(todo => ({
            ...todo,
            isDone: todo.id === id ? !todo.isDone : todo.isDone,
        }));
        this.saveTodos();
        this.renderTodos();
    }

    private editTodo(id: number) {
        const newText = prompt('Edit todo:', this.todos.find(todo => todo.id === id)?.text || '');
        if (newText !== null) {
            this.todos = this.todos.map(todo => ({
                ...todo,
                text: todo.id === id ? newText : todo.text,
            }));
            this.saveTodos();
            this.renderTodos();
        }
    }

    private renderTodos() {
        this.todoContainer.innerHTML = '';
        this.todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.id = `todo-${todo.id}`;
            todoItem.classList.add('todo-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'p-2', 'bg-light', 'rounded');

            const todoTextElement = document.createElement('span');
            todoTextElement.textContent = todo.text;
            if (todo.isDone) {
                todoTextElement.classList.add('text-muted', 'text-decoration-line-through');
            }

            const buttonsContainer = document.createElement('div');

            const markAsDoneButton = document.createElement('button');
            markAsDoneButton.textContent = todo.isDone ? 'Undo' : 'Done';
            markAsDoneButton.classList.add('btn', 'btn-success', 'mr-2');
            markAsDoneButton.addEventListener('click', () => this.toggleDone(todo.id));

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-warning', 'mr-2');
            editButton.addEventListener('click', () => this.editTodo(todo.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.addEventListener('click', () => this.deleteTodo(todo.id));

            buttonsContainer.appendChild(markAsDoneButton);
            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(deleteButton);

            todoItem.appendChild(todoTextElement);
            todoItem.appendChild(buttonsContainer);
            this.todoContainer.appendChild(todoItem);
        });
    }

    private saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    private loadTodos() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }
}

const app = new TodoApp();
