document.addEventListener('DOMContentLoaded', function() {
    let forma = document.getElementById('todo-form');
    let input = document.getElementById('todo-input');
    let b = document.getElementById('todo-list');
    let a = JSON.parse(localStorage.getItem('tasks')) || [];

    a.forEach(a => {
        renderTask(a);
    });


    forma.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = input.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            input.value = '';
        }
    });  
    function addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        a.push(task);
        renderTask(task);
        updateLocalStorage();
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
            <button class="complete-btn">Complete</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteBtn = li.querySelector('.delete-btn');
        const completeBtn = li.querySelector('.complete-btn');

        deleteBtn.addEventListener('click', function() {
            deleteTask(task.id);
        });

        completeBtn.addEventListener('click', function() {
            toggleComplete(task.id);
        });

        b.appendChild(li);
    }

    function deleteTask(id) {
        a = a.filter(task => task.id !== id);
        updateLocalStorage();
        renderTasks();
    }

    function toggleComplete(id) {
        a.forEach(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
        });
        updateLocalStorage();
        renderTasks();
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(a));
    }

});
