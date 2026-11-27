

const API = "http://localhost:3000/tasks";

const taskList = document.getElementById("taskList");
const taskModal = document.getElementById("taskModal");
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
}

document.getElementById("closeModal").onclick = closeModal;
document.getElementById("cancelBtn").onclick = closeModal;

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
        alert("Task Created!");
        closeModal();
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskPriority').value = '';
        document.getElementById('taskDate').value = '';
        getTasks();
    }else{
        alert("Error In Creating Task!");
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
    console.log(id);
    
}