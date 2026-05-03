// tasks.js - handles login and task management for the Tasks page

// Hardcoded credentials for the demo login system
const VALID_USERNAME = "studentdemo1";
const VALID_PASSWORD = "passdemo1";

// Get references to the three main sections
const loginSection = document.getElementById("loginSection");
const taskSection = document.getElementById("taskSection");
const taskListSection = document.getElementById("taskListSection");

// Get the login form
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