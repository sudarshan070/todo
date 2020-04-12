var input = document.querySelector(".input");
var ul = document.querySelector("ul");
var fas = document.querySelector(".icon");

var arr = JSON.parse(localStorage.getItem("item")) || [];

function handler(event) {
  if (input.value === "") {
  } else if (event.keyCode === 13) {
    var todo = {
      text: event.target.value,
      isDone: false,
      id: Date.now(),
    };
    arr.push(todo);
    localStorage.setItem("item", JSON.stringify(arr));
    todoS(arr);
  }
}

function todoS(array) {
  ul.innerHTML = "";
  array.forEach((todo) => {
    var li = document.createElement("li");
    li.setAttribute("data-id", todo.id);
    var check = document.createElement("input");
    check.type = "checkbox";
    check.setAttribute("data-id", todo.id);
    check.checked = todo.isDone;
    var span = document.createElement("span");
    span.innerHTML = "X";
    span.setAttribute("data-id", todo.id);
    var p = document.createElement("p");
    p.innerHTML = todo.text;
    li.append(check, p, span);
    ul.append(li);
    check.addEventListener("click", () => strkeItem(todo.id));
    p.addEventListener("dblclick", editfunction);
    var footer = footerCreate(arr);
    ul.after("");
    ul.after(footer);
  });
  input.value = "";
}

function todoDelete(event) {
  if (event.target.tagName === "SPAN") {
    arr = arr.filter((todo) => !(todo.id == event.target.dataset.id));

    todoS(arr);
    localStorage.setItem("item", JSON.stringify(arr));
  }
}

function strkeItem(id) {
  var Arr = arr.map((todo) => {
    if (todo.id == id) {
      todo.isDone = !todo.isDone;
      return todo;
    } else {
      return todo;
    }
  });
  todoS(Arr);
}

function allF() {
  todoS(arr);
}

function activeF() {
  let Arr = arr.filter((todo) => todo.isDone === false);
  todoS(Arr);
}

function completeF() {
  let completeArr = arr.filter((todo) => todo.isDone === true);
  todoS(completeArr);
}

function clearCompleted() {
  arr = arr.filter((todo) => todo.isDone == false);
  todoS(arr);
}

function selectAll() {
  var truearr = arr.filter((x) => x.isDone);
  if (truearr.length == arr.length || truearr.length == 0) {
    arr.forEach((y) => (y.isDone = !y.isDone));
  } else {
    arr.forEach((elm) => {
      if (elm.isDone === false) {
        elm.isDone = !elm.isDone;
      }
    });
  }
  todoS(arr);
}
function editfunction(event) {
  let p = event.target;
  var editInput = document.createElement("input");
  editInput.classList.add("editInput")
  editInput.value = p.innerHTML;
  let li = event.target.parentNode;
  li.replaceChild(editInput, p);
  editInput.addEventListener("keyup", (e) => {
    if (e.keyCode == 13 && e.target.value != "") {
      p.innerHTML = editInput.value;
      li.replaceChild(p, editInput);
      let updateArr = arr;
      updateArr.map((todo) => {
        if (todo.id == li.dataset.id) {
          console.log(p.innerHTML);
          todo.text = p.innerHTML;
        }
      });
      localStorage.setItem("item", JSON.stringify(updateArr));
      console.log(updateArr);
      todoS(updateArr);
    }
  });
}

// ======================================================================
var all = document.createElement("button");
all.classList.add("all");
all.textContent = "All";

var active = document.createElement("button");
active.classList.add("active");
active.textContent = "Active";

var complete = document.createElement("button");
complete.classList.add("complete");
complete.textContent = "Completed";

var clear_completed = document.createElement("p");
clear_completed.classList.add("clear_completed");
clear_completed.textContent = "clear completed";

// ====================== footer=================

function footerCreate(arr) {
  var footerDiv = document.querySelector(".footer_div");
  footerDiv.innerHTML = "";
  var footer = document.createElement("footer");
  footer.classList.add("footer");
  var itemLeft = document.createElement("p"); 
  itemLeft.textContent = `${arr.length} Items left`;
  footerDiv.append(footer);
  footer.append(itemLeft, all, active, complete, clear_completed);
  return footerDiv;
}

// ========================================================================

fas.addEventListener("click", selectAll);
ul.addEventListener("click", todoDelete);
input.addEventListener("keyup", handler);
clear_completed.addEventListener("click", clearCompleted);
all.addEventListener("click", allF);
active.addEventListener("click", activeF);
complete.addEventListener("click", completeF);
