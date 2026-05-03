// tasks.js - handles login and task management for the Tasks page

// Login system

// Hardcoded credentials for the demo login system
const VALID_USERNAME = "studentdemo1";
const VALID_PASSWORD = "passdemo1";

// Get references to the login section
const loginSection = document.getElementById("loginSection");
const loginForm = document.getElementById("loginForm");

// When the login form is submitted, check the username and password
loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); // stop the page from refreshing

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Hide login, show task sections
        loginSection.classList.add("hidden");
        taskSection.classList.remove("hidden");
        taskListSection.classList.remove("hidden");
    } else {
        alert("Incorrect username or password. Hint: Check the README file.");
    }
});

// Task management system

// Store tasks in an array
const tasks = [];

// Get the task form and table area
const taskForm = document.getElementById("taskForm");
const taskListSection = document.getElementById("taskListSection");
const cancelBtn = document.getElementById("cancelBtn");

// When the task form is submitted, save the task
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Read values from the form
    const title = document.getElementById("taskTitle").value;
    const code = document.getElementById("courseCode").value;
    const name = document.getElementById("courseName").value;
    const due = document.getElementById("dueDate").value;
    const desc = document.getElementById("description").value;
    const notes = document.getElementById("notes").value;

    // Build a task object and push it to the array
    const newTask = { title, code, name, due, desc, notes };
    tasks.push(newTask);

    // Add the task to the table
    taskListSection.innerHTML = "<h2>Current Tasks</h2>";
    const table = document.createElement("table");
    const row = document.createElement("tr");
    row.innerHTML = "<td>" + newTask.title + "</td><td>" + newTask.code + "</td><td>" + newTask.due + "</td>";
    table.appendChild(row);
    taskListSection.appendChild(table);

    taskForm.reset();
});

// Cancle adding a task
cancelBtn.addEventListener("click", function() {
    taskSection.classList.add("hidden");
});