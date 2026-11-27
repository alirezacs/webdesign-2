

const API = "http://localhost:3000/tasks";

const taskList = document.getElementById("taskList");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");

let tasks = [];
let currentFilter = "all";

// Fetch tasks
async function getTasks() {
  try {
    const response = await fetch(API);

    if (!response.ok) throw new Error("Failed to fetch tasks");

    tasks = await response.json();
    renderTasks();
    updateStats();
  } catch (error) {
    taskList.innerHTML =
      `<p class="empty-state">Unable to load tasks. Check JSON Server.</p>`;
    console.error(error);
  }
}

// Render tasks
function renderTasks() {
  const search = document
    .getElementById("searchInput").value.toLowerCase();

  const priority = document.getElementById("filterPriority").value;

  const filtered = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(search);

    const matchesPriority =
      priority === "all" || task.priority === priority;

    const matchesStatus =
      currentFilter === "all" ||
      (currentFilter === "active" && !task.completed) ||
      (currentFilter === "completed" && task.completed);

    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (!filtered.length) {
    taskList.innerHTML =
      `<p class="empty-state">No tasks found.</p>`;
    return;
  }

  taskList.innerHTML = filtered.map(task => `
    <div class="task-item ${task.completed ? "completed" : ""}">

      <div class="task-info">
        <h3>${escapeHTML(task.title)}</h3>

        <p>${escapeHTML(task.description || "")}</p>

        <div class="task-meta">
          <span class="priority ${task.priority}">
            ${escapeHTML(task.priority)}
          </span>

          <span>📅 ${escapeHTML(task.date || "No due date")}</span>
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
  `).join("");
}

// Prevent HTML injection
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// Update statistics
function updateStats() {
  document.getElementById("totalTasks").textContent =
    tasks.length;

  document.getElementById("activeTasks").textContent =
    tasks.filter(task => !task.completed).length;

  document.getElementById("completedTasks").textContent =
    tasks.filter(task => task.completed).length;
}

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

// Add or update task
taskForm.addEventListener("submit", async event => {
  event.preventDefault();

  const id = document.getElementById("taskId").value;

  const task = {
    title: document.getElementById("taskTitle").value.trim(),
    description: document.getElementById("taskDescription").value.trim(),
    priority: document.getElementById("taskPriority").value,
    date: document.getElementById("taskDate").value,
    completed: false
  };

  if (!task.title) return;

  try {
    const response = await fetch(
      id ? `${API}/${encodeURIComponent(id)}` : API,
      {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          id
            ? {
                title: task.title,
                description: task.description,
                priority: task.priority,
                date: task.date
              }
            : task
        )
      }
    );

    if (!response.ok) throw new Error("Save failed");

    closeModal();
    await getTasks();
  } catch (error) {
    alert("Could not save task.");
    console.error(error);
  }
});

// Edit task
function editTask(id) {
  const task = tasks.find(t => String(t.id) === String(id));

  if (!task) return;

  document.getElementById("taskId").value = task.id;
  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDescription").value =
    task.description || "";
  document.getElementById("taskPriority").value = task.priority;
  document.getElementById("taskDate").value = task.date || "";

  document.getElementById("modalTitle").textContent = "Edit Task";

  taskModal.classList.add("show");
}

// Toggle completed
async function toggleTask(id) {
  const task = tasks.find(t => String(t.id) === String(id));

  if (!task) return;

  try {
    const response = await fetch(
      `${API}/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          completed: !task.completed
        })
      }
    );

    if (!response.ok) throw new Error("Update failed");

    await getTasks();
  } catch (error) {
    alert("Could not update task.");
  }
}

// Delete task
async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  try {
    const response = await fetch(
      `${API}/${encodeURIComponent(id)}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Delete failed");

    await getTasks();
  } catch (error) {
    alert("Could not delete task.");
  }
}

// Search
document.getElementById("searchInput")
  .addEventListener("input", renderTasks);

// Filter priority
document.getElementById("filterPriority")
  .addEventListener("change", renderTasks);

// Filter status
document.querySelectorAll(".sidebar nav a").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    document.querySelector(".sidebar nav .active")
      ?.classList.remove("active");

    link.classList.add("active");

    currentFilter = link.dataset.filter;
    renderTasks();
  });
});

// Initial load
getTasks();
