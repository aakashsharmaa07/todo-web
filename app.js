class Task {
    constructor(title){
        this.id = Date.now()
        this.title = title;
        this.status = "todo";
    }
}


let tasksArray = [];

let taskInput = document.querySelector("#taskInput");
let addTaskBtn = document.querySelector("#addTaskBtn");
let taskForm = document.querySelector("#taskForm");
let todoList = document.querySelector("#todoList");
let inProgressList = document.querySelector("#inProgressList");
let doneList = document.querySelector("#doneList");
let totalTasksCount = document.querySelector("#totalTasksCount");
let todoCount = document.querySelector("#todoCount");
let progressCount = document.querySelector("#progressCount");
let doneCount = document.querySelector("#doneCount");


taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = taskInput.value.trim();

    if(title === ""){
        alert("Please enter your task");
        return;
    }

    let task = new Task(title);
    tasksArray.push(task);

    taskForm.reset();
    renderTasks();
    
});


function renderTasks() {
    
    todoList.innerHTML = "";
    inProgressList.innerHTML = "";
    doneList.innerHTML = "";

    tasksArray.forEach((task, index) => {
        
        let cardHTML = `
            <div class="task-card">
                <div class="task-title">${task.title}</div>
                <div class="task-actions">
                    ${task.status === 'todo' ? `<button onclick="moveTask(${index}, 'in-progress')">Start &rarr;</button>` : ''}
                    ${task.status !== 'done' ? `<button onclick="moveTask(${index}, 'done')">Done &check;</button>` : ''}
            
                    <button onclick="deleteTask(${index})" class="delete-task-btn">Delete</button>
                </div>
            </div>
        
        `;

        if (task.status === "todo") {
            todoList.innerHTML += cardHTML;
        } 
        else if (task.status === "in-progress") {
            inProgressList.innerHTML += cardHTML;
        } 
        else if (task.status === "done") {
            doneList.innerHTML += cardHTML;
        }
    });
   
    totalTasksCount.innerText = `${tasksArray.length} Task${tasksArray.length === 1 ? '' : 's'}`;
    todoCount.innerText = tasksArray.filter(t => t.status === "todo").length;
    progressCount.innerText = tasksArray.filter(t => t.status === "in-progress").length;
    doneCount.innerText = tasksArray.filter(t => t.status === "done").length;

}  

function deleteTask(index) {
    tasksArray.splice(index,1);
    renderTasks();
}


function moveTask(index, newStatus) {
    tasksArray[index].status = newStatus; 
    renderTasks(); 
}
