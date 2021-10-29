const { error } = require('@actions/core');
var unirest = require('unirest');

module.exports = function getToken(){
  return new Promise((resolve,reject)=> unirest('POST', 'https://app.artia.com/graphql')
  .headers({
    'Content-Type': 'application/json'
  })
  .send(JSON.stringify({
    query: `mutation{
    authenticationByEmail(email:"nerdplis@gmail.com", password: "mobralzera") {
        token
  }
}`,
    variables: {}
  }))
  .end(function (res) { 
    if (res.error) {
      return reject(res.error)
    }  
      const resObj = JSON.parse(res.raw_body);
      const token = resObj.data.authenticationByEmail.token;
      console.log(token)
      return resolve(token);  
  }))};
