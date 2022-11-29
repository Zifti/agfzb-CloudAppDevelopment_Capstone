function main(params) {
    return new Promise(function (resolve, reject) {
      const { CloudantV1 } = require("@ibm-cloud/cloudant");
      const { IamAuthenticator } = require("ibm-cloud-sdk-core");
      const authenticator = new IamAuthenticator({
        apikey: "Api : 26zPoaL4av0eZSQZInsOqdu0Rb8in2ME2TZb87477ekp", 
      });
      const cloudant = CloudantV1.newInstance({
        authenticator: authenticator,
      });
      cloudant.setServiceUrl("https://82693c77-14e2-4a57-b27a-f2e11634bd9b-bluemix.cloudantnosqldb.appdomain.cloud"); 
      dealership = parseInt(params.dealerId);
      // return reviews with this dealer id
      cloudant
        .postFind({
          db: "reviews",
          selector: {
            dealership: parseInt(params.dealerId),
          },
        })
        .then((result) => {
          let code = 200;
          if (result.result.docs.length == 0) {
            code = 404;
          }
          resolve({
            statusCode: code,
            headers: { "Content-Type": "application/json" },
            body: result.result.docs,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  // example invocation
  let result = main({ dealerId: 15 });
  result.then((reviews) => console.log(reviews));