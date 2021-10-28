var https = require('follow-redirects').https;
var fs = require('fs');
const getToken = require ("../Authorization/getToken.js");

const content = "Comentário da api";
const organizationId = 111402;
const accountId = 3757321;
const activityId = 19689573;



createComment(organizationId,accountId,activityId,content);

  
async function createComment(organizationId,accountid,activityid,content) {

    // const myToken = await getToken;

        var options = {
            'method': 'POST',
            'hostname': 'app.artia.com',
            'path': '/graphql',
            'headers': {
                'OrganizationId': organizationId.toString(),
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMDU4NjgsImV4cCI6MTYzNTQ0NTkyM30.o6P7cNtLrCuFJGGHQ53WJuvA2DrTFNekLObhGJs5TyQ'
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
            console.log(body.toString());
            });
        
            res.on("error", function (error) {
            console.error(error);
            });
        });
        
            var postData = JSON.stringify({
                query: `mutation{
                createComment(
                    accountId: ${accountId},
                    id: ${activityId}, #obrigatório
                    object: "activity", #obrigatório
                    content: "${content}", #obrigatório | Quando for string dentro de variável com $ usar tbm os ""
                    createdBy: "nerdplis@gmail.com", #opcional, pode ser id ou email
                ) {
                    id,
                    content,
                    createdAt,
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
        });
    req.write(postData);

    req.end();
        
}

function myCreateToken() {
    throw new Error('Function not implemented.');
}

