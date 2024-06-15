// Add Item
function addItem(){
  const ul = document.getElementById("list");
  const input = document.getElementById("input");
  const text = input.value;

  // if no text, need to alert user
  if(text === ""){
    alert("Please add an item");
    return;
  }

  const newItem = document.createElement("li");
  newItem.classList.add("list-item");

  // Create check box
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  // Create span area for text
  const spanText = document.createElement("span");
  spanText.classList.add("item");
  spanText.classList.add("checked");
  spanText.innerText = text;

  // Uncheck it first
  spanText.classList.toggle("checked");

  // Create delete button
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");

  newItem.appendChild(checkbox);
  newItem.appendChild(spanText);
  newItem.appendChild(deleteButton);

  checkItem(newItem);
  deleteItem(newItem);

  input.value = "";
  ul.appendChild(newItem);

}

// CheckItem Auxiliary Function
function checkItem(item){
  const checkbox = item.childNodes.item(0);
  const spanText = item.childNodes.item(1);
  checkbox.addEventListener("change", () =>{
    spanText.classList.toggle("checked");
  });
}

// DeleteItem Auxiliary Function
function deleteItem(item){
  const deleteButton = item.childNodes.item(2);
  deleteButton.addEventListener("click", () => {
    item.remove();
  })
}

const button = document.getElementById("button");
button.addEventListener("click", addItem);

const form = document.getElementById("input-wrapper");
form.addEventListener("submit", (e) =>{
  e.preventDefault();
});

