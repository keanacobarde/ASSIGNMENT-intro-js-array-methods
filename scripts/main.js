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
    const index = referenceList.findIndex((work) => work.id == id);
    referenceList[index].inCart = !referenceList[index].inCart; 
    cartTotal(); 
    renderCards(referenceList); 
  }
}

// SEARCH
// .filter()
const search = (event) => {
  const userInput = event.target.value.toLowerCase();
  // console.log(eventLC)
  renderCards(referenceList.filter((work) => work.title.toLowerCase().includes(userInput) || work.author.toLowerCase().includes(userInput) || work.description.toLowerCase().includes(userInput))); 
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
  const cart = referenceList.filter((work) => work.inCart); 
  let total = 0 
  total = cart.reduce((acc, curr) => {
    return acc + curr.price; 
  }, 0);
  console.log(total);   
  document.querySelector("#cartTotal").innerHTML = total;
}

// RESHAPE DATA TO RENDER TO DOM
// .map()
const productList = () => {
  // return [{ title: "SAMPLE TITLE", price: 45.00, type: "SAMPLE TYPE" }]
return referenceList.map((work) => {
  return {
    title: work.title,
    price: work.price,
    type: work.type
  }
})
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
