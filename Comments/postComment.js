var unirest = require('unirest');
var asyncGetToken = require("../Authorization/getToken.js");

const content = "Comentário da api";
const organizationId = 111402;
const accountId = 3757321;
const activityId = 19689573;

//Parametros la do core do action {organizationId, accountId}
//Parametros informados no commit através de t:{activityId} | tudo que estiver dentro do comentário irá para tarefa.
createComment(organizationId,accountId,activityId,content);


async function createComment(organizationId,accountId,activityId,content) {

    var newToken = await asyncGetToken()
    var req = unirest('POST', 'https://app.artia.com/graphql')
    .headers({
      'OrganizationId': organizationId.toString(),
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + newToken
    })
    .send(JSON.stringify({
      query: `mutation{
      createComment(
          accountId: ${accountId}, #obrigatório
          id: ${activityId}, #obrigatório
          object: "activity", #obrigatório
          content: "${content}", #obrigatório | Quando for string dentro de variável com $ usar tbm os ""
          createdBy: "nerdplis@gmail.com", #opcional, pode ser id ou email
      ) {
          id,
          content,
          createdAt,
          createdByApi,  
          author {
              id,
              name,
              email
          },
          registeredBy {
              id,
              name,
              email
          }
          users {
              id,
              name,
              email
          }
  
      }
  }`,
      variables: {}
    }))
    .end(function (res) { 
      if (res.error) throw new Error(res.error); 
      console.log(res.raw_body);
    })
};