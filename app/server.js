const express = require('express')
const bodyParser = require('body-parser');
const validations = require('./validations')
const app = express()
const makeRequestBinance = require('./makeRequest');

app.use(bodyParser.json());             

const port = process.env.PORT || 8080  // establecemos nuestro puerto


// Unique endpoint converter
app.get('/converter', function(req, res) {
  
  let params = req.body

  if (Object.keys(params).length === 0) {
    params = req.query
  }
  // call validations function to check the parameters
  let result = validations(params, true)


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
        res.json(
          {
            "success": false, 
            "message": "try with a different input or output currency"
          })
      }

      // valid symbol will return the Json with the final convertion 
      else {
      let convertion = price * result.amount
      res.json(
        {
          "input_currency": result.input_curr, 
          "output_currency": result.output_curr, 
          "amount": result.amount,
          "convertion": convertion
        })
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
    res.json(result)
  }
    
})

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)