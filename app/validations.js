#!/usr/bin/node

// Validations function will validate for missing input parameters,
// invalid format ot datatype parameters
function validations (JsonParams, isJson) {
  
  let input_currency = JsonParams[0] 
  let output_currency = JsonParams[1]
  let amount = JsonParams[2]
  
  // isJson is True when using the file server.js WHICH IS api
  // other wise will be using the file server2.js as a script
  if (isJson) {
    input_currency = JsonParams.input_currency
    output_currency = JsonParams.output_currency
    amount = JsonParams.amount
  }

  if (input_currency === undefined || input_currency === "") {
    return { "message": "Missing or empty parameter input_currency"}
  }
  if (output_currency === undefined || output_currency === "") {
    return { "message": "Missing or empty parameter output_currency"}
  }
  if (amount === undefined) {
    return { "message": "Missing parameter amount"}
  }

  let alpha = /^[A-Z]+$/
  let allow_currency = ['BTC', 'BCC', 'LTC', 'ETH', 'ETC', 'XRP']

  let response = {"success": false}
  
  //This case is only true when the input parameters come from URL
  
  if (amount === '')
    amount = NaN

  if (typeof amount == 'string')
    amount = Number(amount)
  
  if (!alpha.test(input_currency))
    response["message"] =  "input_currency should be only upercase chars"
  
  else if (!alpha.test(output_currency))
   response["message"] =  "output_currency should be only upercase chars"
    
  else if (!allow_currency.includes(input_currency))
    response["message"] =  "input_currency must be BTC, BCC, LTC, ETH, ETC or XRP"
  
  else if (!allow_currency.includes(output_currency))
    response["message"] =  "output_currency must be BTC, BCC, LTC, ETH, ETC or XRP"

  else if (input_currency === output_currency) {
    return {
      "input_curr": input_currency, 
      "output_curr": output_currency,
      "amount": amount,
      "convertion":  amount,
    }
  }

  else if (isNaN(amount)) {
    response["message"] = "amount should be a number"
  }
  
  else {
    response["success"] = true,
    response["input_curr"] = input_currency, 
    response["output_curr"] = output_currency,
    response["amount"] = amount
  }

  return response

}
module.exports = validations