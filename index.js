//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/index.html");
});



app.post("/",function(req, res)
{
  var crypto = req.body.Crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var options ={
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs:{
      from : crypto,
      to : fiat,
      amount: amount
    }
  };

  request(options,function (error, response, body)
        {
          var data = JSON.parse(body);
          var price = data.price;
          var timestamp = data.time;

          res.write("<h1>current time and date is "+timestamp+".</h1>");
          res.write("<h1>Price of "+amount+" "+crypto+" in "+fiat+" is "+price+" </h1>");
          res.send();
        }
      );
  }
);

app.listen(3000,function()
{
  console.log("server running on 3000");
});
