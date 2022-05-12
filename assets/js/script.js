var stock_price = document.getElementById("stock_price");
var stock_symbol = document.getElementById("stock_symbol");
var stock_desc = document.getElementById("stock_desc");
var stock_url = document.getElementById("stock_url");

async function getStocks() {
    var priceList = document.createElement('ul');
    var symbolList = document.createElement('ul');
    var urlList = document.createElement('ul');
    var descList = document.createElement('ul');

    const stocks = ["AAPL", "AMZN", "HD"];

    // let s = await getStockSymbol()
    for (var i = 0; i < stocks.length; i++) {
        let symbol = stocks[i];
        let price = await getPrice(symbol)
        let profile = await getWebsiteURL(symbol)

        var pli = document.createElement('li');
        var sli = document.createElement('li');
        var uli = document.createElement('li');
        var dli = document.createElement('li');

        pli.textContent = price.c;
        sli.textContent = symbol;
        dli.textContent = profile.name;
        uli.textContent = profile.weburl;

        priceList.appendChild(pli);
        symbolList.appendChild(sli);
        urlList.appendChild(uli);
        descList.appendChild(dli);
    }
    stock_price.appendChild(priceList);
    stock_symbol.appendChild(symbolList);
    stock_desc.appendChild(descList);
    stock_url.appendChild(urlList);

}

async function getStockSymbol() {
    var symbolURL = 'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c9sqnaqad3ib0ug2vn2g&mic=XNAS&currency=USD';
    const symbolResponse = (await fetch(symbolURL)).json();
    return symbolResponse
}

async function getPrice(symbol) {
    var priceURL = 'https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=c9sqnaqad3ib0ug2vn2g';
    const priceResponse = (await fetch(priceURL)).json();
    return priceResponse
}

async function getWebsiteURL(symbol) {
    var profileURL = 'https://finnhub.io/api/v1/stock/profile2?symbol=' + symbol + '&token=c9sqnaqad3ib0ug2vn2g';
    const profileResponse = (await fetch(profileURL)).json();
    return profileResponse
}

getStocks();
