var input = document.querySelector(".input");
var ul = document.querySelector("ul");
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
    // console.log(arr);
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
    update(arr);
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
    console.log(event.target.dataset.id);
    arr = arr.filter(todo => !(todo.id == event.target.dataset.id));
    // console.log(arr);
    todoS(arr);
  }
}

function strkeItem(id) {
  //   let flag = 0;

  var Arr = arr.map(todo => {
    if (todo.id == id) {
      todo.isDone = !todo.isDone;
      update(arr);
      return todo;
    } else {
      update(arr);
      return todo;
    }
  });
  console.log(Arr);
  todoS(Arr);
}

function allF(arr, event) {
  todoS(arr);
}

function activeF(arr, event) {
  var activeArr = arr.filter(todo => todo.isDone == false);
  console.dir(event);
  todoS(activeArr);
}
function completeF(arr, event) {
  var completeArr = arr.filter(todo => todo.isDone == !false);
  todoS(completeArr);
}
function update(arr) {
  var updateLeft = arr.filter(todo => todo.isDone == false).length;
  console.log(updateLeft);
}

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

function footerCreate(arr) {
  var footerDiv = document.querySelector(".footer_div");
  footerDiv.innerHTML = "";
  var footer = document.createElement("footer");
  footer.classList.add("footer");

  var itemLeft = document.createElement("p");
  itemLeft.textContent = "Items left";

  var all = document.createElement("button");
  all.classList.add("all");
  all.textContent = "All";

  var active = document.createElement("button");
  active.classList.add("active");
  active.textContent = "Active";

  var complete = document.createElement("button");
  complete.classList.add("complete");
  complete.textContent = "Completed";

  footerDiv.append(footer);
  footer.append(itemLeft, all, active, complete);

  all.addEventListener("click", () => allF(arr, event));
  active.addEventListener("click", () => activeF(arr, event));
  complete.addEventListener("click", () => completeF(arr, event));
  return footerDiv;
}

ul.addEventListener("click", todoDelete);
input.addEventListener("keyup", handler);
