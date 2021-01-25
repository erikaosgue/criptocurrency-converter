
const validations = require('./app/validations')
const makeRequestBinance = require('./app/makeRequest');


function criptoCurrencyConverter () {

  let params = process.argv.slice(2)

  // call validations function to check the parameters
  let result = validations(params, false)


  //If the result from validations is sucessfull try 
  // a request to the Binance API to find:
  // the price of the currency, base on the symbol
  if (result.success == true) {
    let symbol = result.input_curr + result.output_curr
    
    // responsefunc will be call from the axios request in the
    // makeRequestBinance, and will recieve the parameter price 
    // if it exists, returns a json with:
    //   * the input and output currency, amount and convertion
    // otherwise that type of convertion will be invalid
    let responseFunc = (price) => {

      // if price is undefined, means the symbol is invalid
      // from the Binance API
      if (price == undefined) {
        console.log(JSON.stringify(
          {
            "success": false, 
            "message": "try with a different input or output currency"
          }, null, 2))
      }

      // valid symbol will return the Json with the final convertion 
      else {
      let convertion = price * result.amount
      console.log(JSON.stringify(
        {
          "input_currency": result.input_curr, 
          "output_currency": result.output_curr, 
          "amount": result.amount,
          "convertion": convertion
        }, null, 2))
      }
    }
    // makeRequestBinace will make an axios request to Binance API
    makeRequestBinance(responseFunc, symbol)

  }

  // if there is something wrong with the input parameters:
  // missing, or invalid
  // We return a json with a message that describes the problem
  // (the was created in the validations file)
  else {
    console.log(JSON.stringify(result, null, 2))
  }
}

criptoCurrencyConverter()