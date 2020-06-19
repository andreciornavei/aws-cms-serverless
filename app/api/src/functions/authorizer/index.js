const jwt = require("jsonwebtoken");

exports.handle = function (event, context, callback) {
  const prefix = "Bearer ";
  const auth = event.authorizationToken;
  const token = auth.substr(0, prefix.length) === prefix ? auth.substr(prefix.length, auth.length) : auth

  try {
    //Check if user token is valid
    const user = jwt.verify(token, process.env.JWT_SECRET);
    //validate acl roles to user access specific functions
    if(event.methodArn.endsWith("/POST/user") && !user.acl.includes("1")){
      //This user must to have code 1 = "User manager" to access this route
      throw new Error("This user has no permission to access this function")
    }
    //Allow next function    
    callback(null, generatePolicy("user", "Allow", event.methodArn, user));
  } catch (error) {
    console.log(error);
    callback(null, generatePolicy("user", "Deny", event.methodArn));
  }
};

// Help function to generate an IAM policy
const generatePolicy = function (principalId, effect, resource, user) {
  const authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  // Optional output with custom properties of the String, Number or Boolean type.
  if (user) {
    authResponse.context = user;
  }

  return authResponse;
};
