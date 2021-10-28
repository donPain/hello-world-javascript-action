const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const getToken = require ("./Authorization/getToken.js");
const postComment = require("./Comments/postComment.js");

async function genToken(){
  const token = await getToken
  console.log(token)
  return token;
}

function createComment(){
  const content = "Este é um comentário teste";
  const organizationId = 111402;
  const accountId = 3757321;
  const activityId = 19689573;
 // @ts-ignore
 const comment =  postComment.createComment(organizationId, accountId, activityId,content);


}




// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
  
// }

