const https = require('follow-redirects').https;
const fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'app.artia.com',
  'path': '/graphql',
  'headers': {
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    const bodyString = body.toString();
    const objJson = JSON.parse(bodyString);
    const token = objJson.data.authenticationByEmail.token;
    console.log(token);
    return token.toString();

    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  query: `mutation{
    authenticationByEmail(email:"nerdplis@gmail.com", password: "mobralzera") {
        token
  }
}`,
  variables: {}
});


req.write(postData);

req.end();