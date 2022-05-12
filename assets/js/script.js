var symbolList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

async function getStocks() {
  let s = await getSymbol()
  for (var i =0; i< 5; i++) {
    let symbol = s[i].symbol;
    let description = s[i].description;
    let price = await getPrice(symbol)
    console.log(price);
    var listItem = document.createElement('li');
    listItem.textContent = description + "      " + price.c
    symbolList.appendChild(listItem);
  }
}

async function getSymbol(){
  var symbolURL = 'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c9sqnaqad3ib0ug2vn2g&limit=10';
  const symbolResponse = (await fetch(symbolURL)).json();
  return symbolResponse
}

async function getPrice(symbol){
  var priceURL = 'https://finnhub.io/api/v1/quote?symbol='+ symbol +'&token=c9sqnaqad3ib0ug2vn2g';
  const priceResponse = (await fetch(priceURL)).json();
  return priceResponse
}

fetchButton.addEventListener('click', getStocks());