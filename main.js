

const { concatSeries } = require('async');
const axios = require('axios')

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log(
  `This is a criptocurrency converter\n* valid currencies [BTC, BCC, LTC, ETH, ETC, XRP]`);

  rl.question("Enter an input currency? ", function(inp_curr) {
    rl.question("Enter an output currency? ", function(out_curr) {
      rl.question("Enter the amount of input currency? ", function(amount) {
        clientRequest(inp_curr, out_curr, amount)
        .then(res => {
          let prettyResp = JSON.stringify(res.data, null, 2)
          console.log("\n============== CONVERTION =============\n")
          console.log(prettyResp)
          console.log("\n=======================================")
          rl.close();
        })
        .catch(e => {
          console.log("here", e.response)
        })
    });
  });
});



rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});


async function clientRequest(inp_curr, out_curr, amount) {

  const config = {
    method: 'get',
    url: 'http://localhost:8080/converter',
    data: {
      input_currency: inp_curr,
      output_currency: out_curr,
      amount: amount
    }
  }
  
  return await axios(config)
  
}