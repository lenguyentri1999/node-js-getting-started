var express = require('express');
var braintree = require('braintree');
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "s5t9mc389gbmpmq8",
  publicKey: "fs7qxrnhy2ffp3hd",
  privateKey: "233afe3b87a7e9123f2a45a5a81d9e57"
})
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response){
  response.render('pages/index');
})

app.get('/client_token', function(request, response) {
  gateway.clientToken.generate({}, function(err, res){
    response.send(res.clientToken);
  })
  // response.render('pages/index');
});

// app.post("/checkout", function(request, response){
//   var nonceFromTheClient = request.body.payment_method_nonce;
//   // Use payment method nonce here
// })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
