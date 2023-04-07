let addBtn = document.querySelector('#addBtn');
let taskInput = document.querySelector('#taskInput');
let list = document.querySelector('#list');


let tasks = [];

if (localStorage.getItem('tasksLS')) {
    list.innerHTML = localStorage.getItem('tasksLS')
}

function addTask(newItem) {
    newItem.classList.add('item');
    newItem.textContent = taskInput.value;
    let itemBtns = document.createElement('div');
    newItem.append(itemBtns);
    itemBtns.className = 'item__btns';

    let doneBtn = document.createElement('i');
    doneBtn.className = 'fa-regular fa-square-check';
    itemBtns.append(doneBtn);
    doneBtn.setAttribute('data-action', 'complete');

    let deleteButton = document.createElement('i');
    deleteButton.className = 'fa-solid fa-trash-can';
    itemBtns.append(deleteButton);
    deleteButton.setAttribute('data-action', 'delete');

    let newTask = {
        id: Date.now(),
        text: taskInput.value,
        done: false
    }

    tasks.push(newTask);
    newItem.setAttribute('id', newTask.id);
}

addBtn.addEventListener('click', function () {
    let newItem = document.createElement('li');
    addTask(newItem);
    list.append(newItem);
    taskInput.value = '';
    localStorage.setItem('tasksLS', list.innerHTML);
});

list.addEventListener('click', function (event) {
    let target = event.target;
    if (target.dataset.action == 'complete') {
        completeBtn(target);
    }
    if (target.dataset.action == 'delete') {
        removeTask(target);
    }
})

function completeBtn(target) {
    target.closest('li').classList.toggle('done');
    localStorage.setItem('tasksLS', list.innerHTML)
}

function removeTask(target) {
    target.closest('li').remove();
    taskInput.value = '';
    localStorage.setItem('tasksLS', list.innerHTML);
    let index = tasks.findIndex(function (task) {
        return task.id == target.closest('li').id
    })

    tasks.splice(index, 1);
    console.log(tasks);
}