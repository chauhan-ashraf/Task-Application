let users = [];
let tasks = [];
let currentUser = null;

//function to register a new user

function register() {
  const email = document.getElementById("register-email").value;
  //   .value property is used to retrieve the current value of an HTML input element, such as a text field, password field, or any other form control that allows user input.
  const password = document.getElementById("register-password").value;
  if (!email || !password) {
    alert("Please Enter email and password");
    return;
  }
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    alert("User Already exists. Please Log in");
    return;
  }
  users.push({ email, password });
  alert("Registration Successful! Please Log in.");
  toggleForms("login");
}

// Function to log in an existing user
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    currentUser = user.email;
    alert("Login Successful!");
    toggleForms("task");
    loadTasks();
  } else {
    alert("Invalid Email or password");
  }
}

// Function to log out the current user

function logout() {
  currentUser = null;
  toggleForms("login");
}

// Function to create a new task

function createTask() {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;

  if (!title || !description) {
    alert("Please Enter A task title and description");
    return;
  }
  tasks.push({ title, description, user: currentUser });
  loadTasks();
  clearTaskForm();
}

// function to load tasks for the current user
function loadTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  const userTasks = tasks.filter((task) => task.user === currentUser);

  userTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = `✅${task.title}:${task.description}`;
    const deletebtn = document.createElement("Button");
    deletebtn.textContent = "Delete";
    deletebtn.onclick = () => deleteTask(index);
    li.appendChild(deletebtn);
    taskList.appendChild(li);
  });
}
// Function to delete a task
function deleteTask(index) {
  tasks = tasks.filter((task, i) => i !== index || task.user !== currentUser);
  loadTasks();
}
//Function to claer the task form
function clearTaskForm() {
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
}
// Function to toggle between different form
function toggleForms(form) {
  document.getElementById("register-form").style.display =
    form === "register" ? "block" : "none";
  document.getElementById("login-form").style.display =
    form === "login" ? "block" : "none";
  document.getElementById("task-section").style.display =
    form === "task" ? "block" : "none";
}
//Initializng Form
toggleForms("register");
