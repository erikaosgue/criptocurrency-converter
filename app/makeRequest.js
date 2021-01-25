const axios = require('axios')


// makeRequestBinace recieves a function and the symbol parameters,
// makes a request to the Binance API using the symbol parameter.
// The response (the price) from axios will be pass to the 
// responseFunc as a parameter
function makeRequestBinance(responseFunc, symbol) {

    const config = {
        method: 'get',
        url: 'https://api.binance.com/api/v3/ticker/price?' + 'symbol=' + symbol,
    }

    return axios(config)
            .then( res => {
              responseFunc(res.data.price)
            })
            .catch( e => {
            responseFunc(e.data)
            })
}

module.exports  = makeRequestBinance