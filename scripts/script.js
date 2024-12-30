class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.sortBy = 'date';
        this.filterBy = 'all';
        this.theme = localStorage.getItem('theme') || 'light';

        ['todoForm', 'todoInput', 'todoList', 'sortSelect', 'filterSelect', 'themeToggle']
            .forEach(id => this[id] = document.getElementById(id));

        this.initializeTheme();
        this.bindEvents();
        this.render();
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return date.toDateString() === today.toDateString() ? `Today at ${time}` :
               date.toDateString() === yesterday.toDateString() ? `Yesterday at ${time}` :
               `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${time}`;
    }

    initializeTheme() {
        document.body.setAttribute('data-theme', this.theme);
        this.themeToggle.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }

    bindEvents() {
        this.todoForm.onsubmit = e => { e.preventDefault(); this.addTodo(); };
        this.sortSelect.onchange = e => { this.sortBy = e.target.value; this.render(); };
        this.filterSelect.onchange = e => { this.filterBy = e.target.value; this.render(); };
        this.themeToggle.onclick = () => {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', this.theme);
            this.initializeTheme();
        };
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (text) {
            this.todos.unshift({ id: Date.now().toString(), text, completed: false, createdAt: Date.now() });
            this.saveTodos();
            this.todoInput.value = '';
            this.render();
        }
    }

    toggleTodo = id => {
        this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        this.saveTodos();
        this.render();
    }

    deleteTodo = id => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    editTodo = (id, newText) => {
        this.todos = this.todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo);
        this.saveTodos();
        this.render();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getSortedAndFilteredTodos() {
        let filteredTodos = this.todos;
        if (this.filterBy !== 'all') {
            filteredTodos = filteredTodos.filter(todo => this.filterBy === 'completed' ? todo.completed : !todo.completed);
        }
        return filteredTodos.sort((a, b) => this.sortBy === 'date' ? b.createdAt - a.createdAt : Number(a.completed) - Number(b.completed));
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const active = total - completed;
        ['totalTasks', 'activeTasks', 'completedTasks'].forEach((id, index) =>
            document.getElementById(id).textContent = [total, active, completed][index]);
    }

    createTodoElement(todo) {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.onchange = () => this.toggleTodo(todo.id);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'todo-content';
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo.text;
        const dateText = document.createElement('span');
        dateText.className = 'todo-date';
        dateText.textContent = this.formatDate(todo.createdAt);
        contentWrapper.append(todoText, dateText);

        const actions = document.createElement('div');
        actions.className = 'todo-actions';
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.onclick = () => {
            const input = document.createElement('input');
            input.className = 'edit-input';
            input.value = todo.text;
            todoText.replaceWith(input);
            input.focus();
            const handleEdit = () => { if (input.value.trim()) this.editTodo(todo.id, input.value.trim()); };
            input.onblur = handleEdit;
            input.onkeypress = e => { if (e.key === 'Enter') handleEdit(); };
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.onclick = () => this.deleteTodo(todo.id);

        actions.append(editButton, deleteButton);
        todoItem.append(checkbox, contentWrapper, actions);
        return todoItem;
    }

    render() {
        this.todoList.innerHTML = '';
        const todos = this.getSortedAndFilteredTodos();
        if (todos.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Пожалуйста, добавьте новые задачи';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.opacity = '0.7';
            this.todoList.appendChild(emptyMessage);
        } else {
            todos.forEach(todo => this.todoList.appendChild(this.createTodoElement(todo)));
        }
        this.updateStats();
    }
}

new TodoList();
