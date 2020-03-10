var input = document.querySelector(".input");
var ul = document.querySelector("ul");
var fas = document.querySelector(".icon");

var arr = [];

function handler(event) {
  if (input.value === "") {
  } else if (event.keyCode === 13) {
    var todo = {
      text: event.target.value,
      isDone: false,
      id: Date.now()
    };
    arr.push(todo);
    todoS(arr);
  }
}

function todoS(arr) {
  ul.innerHTML = "";
  arr.forEach(todo => {
    var li = document.createElement("li");
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
    var footer = footerCreate(arr);
    ul.after("");
    ul.after(footer);
  });
  input.value = "";
}

function todoDelete(event) {
  //   console.log(event.target);
  if (event.target.tagName === "SPAN") {
    // console.log("span");
    arr = arr.filter(todo => !(todo.id == event.target.dataset.id));
    // console.log(arr);
    todoS(arr);
  }
}

function strkeItem(id) {
  var Arr = arr.map(todo => {
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
  console.log(arr);
  let Arr = arr.filter(todo => todo.isDone === false);
  console.log(arr);
  todoS(Arr);
}

function completeF() {
  let completeArr = arr.filter(todo => todo.isDone === true);
  console.log(arr);
  todoS(completeArr);
}

function clearCompleted() {
  arr = arr.filter(todo => todo.isDone == false);
  // arr.splice(todo, arr.length);
  console.log(arr);
  todoS(arr);
  // arr.pull(clearArr)

  // todoS(arr);
}

function selectAll() {
  // console.log(arr);
  arr.forEach(elm => {
    if (elm.isDone == false) {
      elm.isDone = true;
    }
  });
  console.log(arr);
  todoS(arr);
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

/* <footer class="footer">
  <div>
    <span>0</span>items left
  </div>
  <div>
    <button class="all">All</button>
    <button class="active">Active</button>
    <button class="completed">Completed</button>
  </div>
  <div class="clear_completed">
    <span>clear completed</span>
  </div>
</footer>; */

// ====================== footer=================

function footerCreate(arr) {
  var footerDiv = document.querySelector(".footer_div");
  footerDiv.innerHTML = "";
  var footer = document.createElement("footer");
  footer.classList.add("footer");

  var itemLeft = document.createElement("p"); // <p>  ... </p>
  // var spanP = document.createElement("span"); // <span> 0 </span>
  // spanP.innerHTML = "0";
  // itemLeft.append(spanP);
  // itemLeft.innerHTML = ; //   <p> <span> 0 </span> items left </p>
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
