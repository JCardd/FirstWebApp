//we only need to find the elements once, so it's better to
//put it at the top as opposed to putting it in the function
//(finds the element each time the function is called)
const totalPriceElement = document.getElementById("totalPrice");
const parentListElement = document.getElementById("list");

let totalPrice = 0;
let cart = [];

//this will represent each item inside our cart
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

//draw the UI based on the total price and 
//whatever is inside the cart
function refreshUI() {
  totalPriceElement.innerText = `Total Price: $${totalPrice} | Total # of items: ${cart.length}`;
  parentListElement.innerHTML = "";//clears out the items in the list
  console.log(cart);
  
  cart.forEach((item, index) => {
    const listElement = document.createElement("li");
    const textNode = document.createTextNode(`${item.name} - $${item.price} `);
    listElement.appendChild(textNode);
    parentListElement.appendChild(listElement);
    listElement.classList.add("list-group-item", "d-flex", "justify-content-between");

    //deleting items
    const deleteButton = document.createElement("button");
    const deleteTextNode = document.createTextNode("delete");
    deleteButton.appendChild(deleteTextNode);
    deleteButton.classList.add("btn", "btn-danger");
    listElement.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      cart.splice(index, 1)
      totalPrice -= item.price;
      refreshUI();
    });
  })


}


function addItem(form) {
  //adding items
  const itemName = form.itemName.value;
  const itemPrice = form.itemPrice.value;

  totalPrice += parseInt(itemPrice);
  const item = new Item(itemName, parseInt(itemPrice));
  cart.push(item);

  //call this function b/c the state of our application has changed
  refreshUI();
  return false;

}