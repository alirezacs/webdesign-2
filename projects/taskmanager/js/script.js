
const API = "http://localhost:3000/tasks";

const taskList = document.getElementById("taskList");
const taskModal = document.getElementById("taskModal");
const editTaskModal = document.getElementById('editTaskModal');
const taskForm = document.getElementById("taskForm");

let tasks = [];
let currentFilter = "all";

// Open modal
document.getElementById("addTaskBtn").onclick = () => {
  taskForm.reset();
  document.getElementById("taskId").value = "";
  document.getElementById("modalTitle").textContent = "Add New Task";
  taskModal.classList.add("show");
};

// Close modal
function closeModal() {    
  taskModal.classList.remove("show");
  editTaskModal.classList.remove('show');
}

document.getElementById("closeModal").onclick = closeModal;
document.getElementById("cancelBtn").onclick = closeModal;

document.getElementById("closeEditModal").onclick = closeModal;
document.getElementById("editModalCancelBtn").onclick = closeModal;

// Create Task
taskForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // Collecting Data
    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('taskDescription').value;
    let priority = document.getElementById('taskPriority').value;
    let date = document.getElementById('taskDate').value;
    let task = {
        title,
        description,
        priority,
        date,
        completed: true
    }
    
    // Sending Data to Database
    createTask(task);
})
const createTask = async (task) => {
    const result = await axios.post("http://localhost:3000/tasks", task);    
    if(result.status === 200 || result.status === 201){
        Swal.fire({
            title: 'Task Created',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        closeModal();
        getTasks();
    }else{
        Swal.fire({
            title: 'Error In Create Task',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    
}

// Get and Render Tasks
const renderTasks = (tasks) => {
    taskList.innerHTML = '';
    tasks.map(task => {
        taskList.innerHTML += `
            <div class="task-item ${task.completed ? "completed" : ""}">

                <div class="task-info">
                    <h3>${task.title}</h3>

                    <p>${task.description}</p>

                    <div class="task-meta">
                    <span class="priority ${task.priority}">
                        ${task.priority}
                    </span>

                    <span>📅 ${task.date}</span>
                    </div>
                </div>

                <div class="task-actions">
                    <button onclick="toggleTask('${task.id}')">
                    ${task.completed ? "↩ Undo" : "✓ Done"}
                    </button>

                    <button onclick="editTask('${task.id}')">
                    ✏ Edit
                    </button>

                    <button class="delete" onclick="deleteTask('${task.id}')">
                    🗑
                    </button>
                </div>

                </div>
        `
    })
}
const getTasks = async () => {
    const result = await axios.get('http://localhost:3000/tasks');
    const data = result.data;
    renderTasks(data);
}
getTasks();

// Complete Task
const toggleTask = async id => {
    const task = await axios.get(`http://localhost:3000/tasks/${id}`);
    
    const result = await axios.patch(`http://localhost:3000/tasks/${id}`, {
        completed: !task.data.completed
    });

    getTasks();
}

// Delete Task
const deleteTask = async id => {
    if(!confirm("Are You Sure About it?")) return;
    const result = await axios.delete(`http://localhost:3000/tasks/${id}`);
    getTasks();
    alert('Task Deleted!');    
}

// Update Task
const editTask = async id => {
    // Fetch Task
    const result = await axios.get(`http://localhost:3000/tasks/${id}`);
    const task = result.data;

    // Place Data in Fields
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description;
    document.getElementById('editTaskPriority').value = task.priority;
    document.getElementById('editTaskDate').value = task.date;
    document.getElementById('editTaskId').value = task.id;

    document.querySelector("#editTaskModal #modalTitle").textContent = "Edit Task";
    editTaskModal.classList.add("show");
}
let editForm = document.getElementById('editTaskForm');
editForm.addEventListener('submit', async e => {
    e.preventDefault();
    
    let payload = {
        title: document.getElementById('editTaskTitle').value,
        description: document.getElementById('editTaskDescription').value,
        priority: document.getElementById('editTaskPriority').value,
        date: document.getElementById('editTaskDate').value,
    }

    let taskId = document.getElementById('editTaskId').value;
    
    const result = await axios.put(`http://localhost:3000/tasks/${taskId}`, payload);

    if(result.statusText !== "OK"){
        alert("Failed to Update Task!");
        return;
    }

    Swal.fire({
        title: 'Task Updated',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    closeModal();
    getTasks();
})

// Search Form
let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', async e => {
    let searchText = searchInput.value;
    
    const result = await axios.get(API);
    const tasks = result.data;
    const searchedTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if(searchedTasks.length < 1){
        taskList.innerText = "Not Found!";
        return;
    }

    taskList.innerHTML = '';
    searchedTasks.map(task => {
        taskList.innerHTML += `
            <div class="task-item ${task.completed ? "completed" : ""}">

                <div class="task-info">
                    <h3>${task.title}</h3>

                    <p>${task.description}</p>

                    <div class="task-meta">
                    <span class="priority ${task.priority}">
                        ${task.priority}
                    </span>

                    <span>📅 ${task.date}</span>
                    </div>
                </div>

                <div class="task-actions">
                    <button onclick="toggleTask('${task.id}')">
                    ${task.completed ? "↩ Undo" : "✓ Done"}
                    </button>

                    <button onclick="editTask('${task.id}')">
                    ✏ Edit
                    </button>

                    <button class="delete" onclick="deleteTask('${task.id}')">
                    🗑
                    </button>
                </div>

                </div>
        `
    })
})