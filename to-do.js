const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = [];
let editTodoIndex = null;

// Function to add or edit a todo
const handleTodo = () => {
    const inputText = inputBox.value.trim();

    if (!inputText) {
        alert("You must write something in your to do");
        return;
    }

    if (editTodoIndex !== null) {
        todos[editTodoIndex] = inputText;  // Update the existing todo in the array
        renderTodos();  // Re-render the list
        resetInput();
    } else {
        todos.push(inputText);  // Add new todo to the array
        addTodoToDOM(inputText);
        resetInput();
    }
};

// Function to create and add a todo element to the DOM
const addTodoToDOM = (text) => {
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.innerText = text;
    li.appendChild(p);

    const editBtn = createButton("Edit", "editBtn", handleEdit);
    const deleteBtn = createButton("Remove", "deleteBtn", handleDelete);

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
};

// Helper function to create a button
const createButton = (text, className, clickHandler) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.classList.add("btn", className);
    btn.addEventListener("click", clickHandler);
    return btn;
};

// Function to reset input and state
const resetInput = () => {
    inputBox.value = "";
    addBtn.value = "Add";
    editTodoIndex = null;
};

// Handler to edit a todo
const handleEdit = (e) => {
    const itemText = e.target.parentElement.firstElementChild.innerText;
    inputBox.value = itemText;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodoIndex = Array.from(todoList.children).indexOf(e.target.parentElement);
};

// Handler to delete a todo
const handleDelete = (e) => {
    const todoElement = e.target.parentElement;
    const todoIndex = Array.from(todoList.children).indexOf(todoElement);
    todoElement.remove();
    todos.splice(todoIndex, 1);  // Remove the todo from the array
};

// Function to render all todos in the DOM from the todos array
const renderTodos = () => {
    todoList.innerHTML = "";  // Clear existing list
    todos.forEach(addTodoToDOM);  // Add all todos from the array to the DOM
};

// Event listeners
addBtn.addEventListener('click', handleTodo);
