// console.log("i ran in browser")
let addTodoButton = document.querySelector(".add-todo");
let todoInput = document.querySelector(".todo-input");
let todoList = document.querySelector(".todo-list-container");

// console.log(todoInput.value);
todoInput.addEventListener("keypress", function (e) {
    // console.log(e);
    if (e.key == "Enter") {
        addTodo();
    }
})
addTodoButton.addEventListener("click", function (e) {
    console.log(e);
    addTodo();
});

function addTodo() {
    let todoInputValue = todoInput.value;
    if (todoInputValue) {
        appendTodo(todoInputValue);
        console.log(todoInputValue);
        todoInput.value = "";///It will empty the todoInput
    }
}


function appendTodo(todo) {
    let todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todo-item");///for adding classList
    //<div class="todo-item"></div>

    let pTag = document.createElement("p");
    pTag.classList.add("todo");
    pTag.textContent = todo;
    //<p class="todo-input">Learn CSS</p>

    let deleteTodoButton = document.createElement("button");
    deleteTodoButton.classList.add("delete-todo");
    deleteTodoButton.textContent = "Delete";
    // <button class="delete-todo">Delete</button>;

    deleteTodoButton.addEventListener("click", deleteTodo);//// Ye EventListener vala fxn automatically deleteTodo fxn ko call kr dega

    todoItemDiv.append(pTag);
    todoItemDiv.append(deleteTodoButton);

    todoList.append(todoItemDiv);

}

function deleteTodo(e) {
    e.target.parentNode.remove();
}