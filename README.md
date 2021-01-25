
# API CRIPTOCURRENCY CONVERTER

## Cryptocurrency Converter Calculator will convert from the input currency price and the amount of the input currency, a final conversion for the output currency

* ## Bulding the Json must have:
    * ## the input and output currency in string format and should be one of these following Words: BTC, BCC, LTC, ETH, ETC, XRP
    * ## amount should be a number

<br>

## Example of valid Json with parameters:
        {
            "input_currency": "BCC",
            "output_currency": "BTC",
            "amount": 2
        }
        Expected output:
        {
            "amount" : 2,
            "convertion" : 0.158162,
            "input_currency" : "BCC",
            "output_currency" : "BTC"
        }



## Ways to use the criptocurrency calculator service

### First, let's start the server.js file
    $ node app/server.js
        
### 1) From the Linux command line
        
    usage:
        $ curl -s -X GET \
        -H "Content-type: application/json" \
        -H "Accept: application/json" \
        -d '{"input_currency": "BCC", 
            "output_currency": "BTC",
            "amount": 4}' \
        "http://localhost:8080/converter" | json_pp


    output:
        {
            "amount" : 4,
            "convertion" : 0.316324,
            "input_currency" : "BCC",
            "output_currency" : "BTC"
        }

### 2) run the file main.js and enter the values the prompt ask for
        
    Usage: 
        $ node main.js
        This is a criptocurrency converter
        * valid currencies [BTC, BCC, LTC, ETH, ETC, XRP]
        Enter an input currency? BCC
        Enter an output currency? BTC
        Enter the amount of input currency? 3

        ============== CONVERTION =============

        {
        "input_currency": "BCC",
        "output_currency": "BTC",
        "amount": "3",
        "convertion": 0.23724299999999998
        }

        =======================================

        BYE BYE !!!

### 3) From the browser use the following URL

    Usage:

        http://localhost:8080/converter?input_currency=BCC&output_currency=BTC&amount=2
    
    output:

        {
            "input_currency": "BCC",
            "output_currency": "BTC",
            "amount": 2,
            "convertion": 0.158162
        }

### 4) Withoust using the file app/server.js as an API you can use the file server2.js  to use the same criptocurrency converter

    usage:
        $ node sever2.js <input_currency> <output_currency> <amount>

    Example: Run the server2.js in the linix command line with the parameters
        $ node server2.js BCC BTC 2

    output:
        {
            "input_currency": "BCC",
            "output_currency": "BTC",
            "amount": 2,
            "convertion": 0.158162
        }