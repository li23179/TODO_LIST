/* Local Storage */
let listState = [];

const STATE_KEY = "TO-DO LIST";

function loadState(){
  const val = localStorage.getItem(STATE_KEY);
  if(val === null) return [];
  else return JSON.parse(val);
}

function saveState(obj){
  localStorage.setItem(STATE_KEY, JSON.stringify(obj));
}

function intiState(){
  const prevState = loadState();
  // render list
  const ul = document.getElementById("list");
  for (const state of prevState){
    const li = createListStruct(state.text, state.checked);
    ul.appendChild(li);
  }
}

/* Functionality of WEB TODO-LIST*/

function createListStruct(inputText, checked){

  // Create li tag
  const li = document.createElement("li");
  li.classList.add("list-item");

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  checkbox.onchange = checkItem;
  checkbox.checked = checked;

  // Create spanText
  const spanText = document.createElement("span");
  spanText.classList.add("item");
  spanText.innerText = inputText;
  if(checkbox.checked){
    spanText.classList.toggle("checked");
  }

  // Create deleteButton
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.onclick = deleteItem;

  // Append all tags
  li.appendChild(checkbox);
  li.appendChild(spanText);
  li.appendChild(deleteButton);

  // save listState
  listState.push({
    text : inputText,
    checked : checkbox.checked
  })
  saveState(listState);


  return li;
}

// Add item to ul
function addItem(){
  const ul = document.getElementById("list");
  const input = document.getElementById("input");

  if(input.text === ""){
    alert("Please enter a task");
    return;
  }

  const text = input.value;
  const li = createListStruct(text, false);

  input.value = "";
  ul.appendChild(li);

}

function deleteItem(){
  const li = this.parentElement;
  const ul = li.parentElement;

  const index = Array.from(ul.children).indexOf(li);

  ul.removeChild(li);

  // Delete item in list state
  listState.splice(index, 1);
  saveState(listState);
}

function checkItem(){
  const checkbox = this;
  const li = checkbox.parentElement;
  const spanText = li.children.item(1);
  spanText.classList.toggle("checked");

  // Check item in list state
  const index = Array.from(li.parentElement.children).indexOf(li);
  listState[index].checked = checkbox.checked;
  saveState(listState);
}

intiState();

// Handling add event
const addButton = document.getElementById("button");
addButton.addEventListener("click", addItem);

// Prevent Refresh Page
const form =document.getElementById("input-wrapper");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
