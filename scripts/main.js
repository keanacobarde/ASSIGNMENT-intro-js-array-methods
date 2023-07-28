import { card } from "../components/card.js";
import { tableRow } from "../components/table.js";
import { referenceList } from "../data/reference.js";
import { renderToDom } from "../utils/renderToDom.js";

// Reusable function to get the cards on the DOM
// .forEach()
const renderCards = (array) => {
let refStuff = ''; 
array.forEach((item) => { 
  refStuff += card(item);
})
renderToDom("#cards", refStuff);
}
// renderCards(referenceList); 

// UPDATE/ADD ITEMS TO CART
// .findIndex() & (.includes() - string method)
const toggleCart = (event) => {
  if (event.target.id.includes("fav-btn")) {
    let preSplit = event.target.id; 
    const [ , id] = preSplit.split('--'); 
    referenceList.findIndex((work) => work.id == id);
  }
///The only thing missing is a cart entity to push the specific object to that you're adding to the cart. 
}

// SEARCH
// .filter()
const search = (event) => {
  const eventLC = event.target.value.toLowerCase();
  console.log(eventLC)
  renderCards(referenceList.filter((work) => work.title.toLowerCase() == eventLC)); 
}

// BUTTON FILTER
// .filter() & .reduce() &.sort() - chaining
const buttonFilter = (event) => {
  if(event.target.id.includes('free')) {
    // console.log('FREE')
    const freeArray = referenceList.filter((work) => work.price == 0.00);
    renderCards(freeArray); 
  }
  if(event.target.id.includes('cartFilter')) {
    console.log('cartFilter')
    const inCartArray = referenceList.filter((work) => work.inCart);
    renderCards(inCartArray); 
  }
  if(event.target.id.includes('books')) {
    // console.log('books!')
    const bookArray = referenceList.filter((work) => work.type == "Book")
    renderCards(bookArray); 
  }
  if(event.target.id.includes('clearFilter')) {
    // console.log('clearFilter')
    renderCards(referenceList); 
  }
  if(event.target.id.includes('productList')) {
    let table = `<table class="table table-dark table-striped" style="width: 600px">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Type</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody>
    `;
    
    productList().forEach(item => {
      table += tableRow(item);
    }); 

    table += `</tbody></table>`

    renderToDom('#cards', table);
  }
  
}

// CALCULATE CART TOTAL
// .reduce() & .some()
const cartTotal = () => {
  const total = 0
  document.querySelector("#cartTotal").innerHTML = total.toFixed(2);
}

// RESHAPE DATA TO RENDER TO DOM
// .map()
const productList = () => {
  return [{ title: "SAMPLE TITLE", price: 45.00, type: "SAMPLE TYPE" }]
}


const startApp = () => {
  // PUT ALL CARDS ON THE DOM
  renderCards(referenceList)

  // PUT CART TOTAL ON DOM
  cartTotal();

  // SELECT THE CARD DIV
  document.querySelector('#cards').addEventListener('click', toggleCart);

  // SELECT THE SEARCH INPUT
  document.querySelector('#searchInput').addEventListener('keyup', search)

  // SELECT BUTTON ROW DIV
  document.querySelector('#btnRow').addEventListener('click', buttonFilter);
}
startApp();
