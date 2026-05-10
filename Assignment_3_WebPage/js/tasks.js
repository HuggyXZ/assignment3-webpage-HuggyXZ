// tasks.js - handles login and task management for the Tasks page

// Login system

// Hardcoded credentials for the demo login system
const VALID_USERNAME = "studentdemo1";
const VALID_PASSWORD = "passdemo1";

// Get references to the login section elements
const loginSection = document.getElementById("loginSection");
const loginForm = document.getElementById("loginForm");

// When the login form is submitted, check the username and password
loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); // stop the page from refreshing

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Save login state to sessionStorage so it survives page navigation
        sessionStorage.setItem("loggedIn", "true");
        showTaskSections();
    } else {
        alert("Incorrect username or password. Hint: Check the README file.");
    }
});

// Shows the task sections and hides the login form
function showTaskSections() {
    loginSection.classList.add("hidden");
    taskSection.classList.remove("hidden");
    searchBar.classList.remove("hidden");
    taskListSection.classList.remove("hidden");
}

// Task management system

// Load saved tasks from localStorage, or start with an empty array
const saved = localStorage.getItem("tasks");
const tasks = saved ? JSON.parse(saved) : [];

// Track which column is being sorted and in which direction
let sortColumn = null;
let sortAscending = true;

// Track the current search query
let searchQuery = "";

// Get references to the task section elements
const taskSection = document.getElementById("taskSection");
const taskListSection = document.getElementById("taskListSection");
const taskForm = document.getElementById("taskForm");
const cancelBtn = document.getElementById("cancelBtn");

// Rebuilds the whole task table from the tasks array
function renderTasks() {
    taskListSection.innerHTML = "<h2>Current Tasks</h2>";

    if (tasks.length === 0) {
        taskListSection.innerHTML += "<p>No tasks yet.</p>";
        return;
    }

    const table = document.createElement("table");
    table.id = "taskTable";

    // Column definitions — label shown and the key in the task object
    const columns = [
        { label: "Title",       key: "title" },
        { label: "Course Code", key: "code"  },
        { label: "Course Name", key: "name"  },
        { label: "Due Date",    key: "due"   },
        { label: "Description", key: "desc"  },
        { label: "Notes",       key: "notes" }
    ];

    // Build header row with clickable sort buttons
    const headerRow = document.createElement("tr");
    columns.forEach(function(col) {
        const th = document.createElement("th");
        // Show an arrow if this column is the active sort column
        const arrow = sortColumn === col.key ? (sortAscending ? " ▲" : " ▼") : "";
        th.textContent = col.label + arrow;
        th.style.cursor = "pointer";
        // When clicked, sort by this column
        th.addEventListener("click", function() {
            if (sortColumn === col.key) {
                sortAscending = !sortAscending; // flip direction
            } else {
                sortColumn = col.key;
                sortAscending = true;
            }
            sortAndRender();
        });
        headerRow.appendChild(th);
    });

    // Add the Actions column header (not sortable)
    const actionsTh = document.createElement("th");
    actionsTh.textContent = "Actions";
    headerRow.appendChild(actionsTh);
    table.appendChild(headerRow);

    // Filter tasks by search query (matches title or course code)
    const filteredTasks = tasks.filter(function(task) {
        if (searchQuery === "") return true;
        return task.title.toLowerCase().includes(searchQuery) ||
               task.code.toLowerCase().includes(searchQuery);
    });

    // Show a message if nothing matches the search
    if (filteredTasks.length === 0) {
        taskListSection.appendChild(table);
        const noResults = document.createElement("p");
        noResults.textContent = "No tasks match your search.";
        taskListSection.appendChild(noResults);
        return;
    }

    // One row per filtered task
    for (let i = 0; i < filteredTasks.length; i++) {
        const task = filteredTasks[i];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.code}</td>
            <td>${task.name}</td>
            <td>${task.due}</td>
            <td>${task.desc}</td>
            <td>${task.notes}</td>
            <td>
                <button class="edit-btn" data-index="${i}">Edit</button>
                <button class="delete-btn" data-index="${i}">Delete</button>
            </td>
        `;
        table.appendChild(row);
    }
    taskListSection.appendChild(table);
}

// Sorts the tasks array then re-renders the table
function sortAndRender() {
    if (sortColumn) {
        tasks.sort(function(a, b) {
            const valA = a[sortColumn].toLowerCase();
            const valB = b[sortColumn].toLowerCase();
            if (valA < valB) return sortAscending ? -1 : 1;
            if (valA > valB) return sortAscending ? 1 : -1;
            return 0;
        });
    }
    renderTasks();
}

// Listen for edit button clicks inside the task list section
taskListSection.addEventListener("click", function(e) {
    // Check if the clicked element is an edit button
    if (e.target.classList.contains("edit-btn")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        const task = tasks[index];

        // Pre-fill the form with the task's current values
        document.getElementById("taskTitle").value  = task.title;
        document.getElementById("courseCode").value = task.code;
        document.getElementById("courseName").value = task.name;
        document.getElementById("dueDate").value    = task.due;
        document.getElementById("description").value = task.desc;
        document.getElementById("notes").value      = task.notes;

        // Remove the old task so the re-submitted form replaces it
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
});

// Listen for delete button clicks inside the task list section
taskListSection.addEventListener("click", function(e) {
    // Check if the clicked element is a delete button
    if (e.target.classList.contains("delete-btn")) {
        const index = parseInt(e.target.getAttribute("data-index"));

        // Ask the user to confirm before deleting
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            tasks.splice(index, 1); // remove 1 task at that position
            localStorage.setItem("tasks", JSON.stringify(tasks)); // update localStorage
            renderTasks(); // rebuild the table
        }
    }
});

// When the task form is submitted, save the task and re-render
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const newTask = {
        title: document.getElementById("taskTitle").value,
        code:  document.getElementById("courseCode").value,
        name:  document.getElementById("courseName").value,
        due:   document.getElementById("dueDate").value,
        desc:  document.getElementById("description").value,
        notes: document.getElementById("notes").value
    };

    // Validate that required fields are not empty - stop and alert if any are missing
    if (newTask.title === "" || newTask.code === "" || newTask.due === "") {
        alert("Please fill in the Task Title, Course Code, and Due Date.");
        return;
    }

    tasks.push(newTask);

    // Save the updated tasks array to localStorage as a JSON string
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskForm.reset();
    renderTasks();
});

// Cancel clears the form fields
cancelBtn.addEventListener("click", function() {
    taskForm.reset();
});

// Filter the displayed tasks as the user types in the search bar
document.getElementById("searchInput").addEventListener("input", function() {
    searchQuery = this.value.toLowerCase();
    renderTasks();
});

// When the page finishes loading, check login state and render tasks already saved in localStorage
document.addEventListener("DOMContentLoaded", function() {
    // If the user was already logged in this session, skip the login form
    if (sessionStorage.getItem("loggedIn") === "true") {
        showTaskSections();
    }
    renderTasks();
});

// Show the current date and time at the bottom of the page
function updateDateTime() {
    const dateTimeText = document.getElementById("currentDateTime");
    const now = new Date();
    dateTimeText.textContent = now.toLocaleString();
}

// Update once when the page loads
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);