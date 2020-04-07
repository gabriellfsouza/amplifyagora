/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authAmplifyagora95247a7bUserPoolId = process.env.AUTH_AMPLIFYAGORA95247A7B_USERPOOLID
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraGraphQLAPIEndpointOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIENDPOINTOUTPUT
var apiAmplifyagoraMarketTableName = process.env.API_AMPLIFYAGORA_MARKETTABLE_NAME
var apiAmplifyagoraMarketTableArn = process.env.API_AMPLIFYAGORA_MARKETTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraMarketTableName = process.env.API_AMPLIFYAGORA_MARKETTABLE_NAME
var apiAmplifyagoraMarketTableArn = process.env.API_AMPLIFYAGORA_MARKETTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraProductTableName = process.env.API_AMPLIFYAGORA_PRODUCTTABLE_NAME
var apiAmplifyagoraProductTableArn = process.env.API_AMPLIFYAGORA_PRODUCTTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraMarketTableName = process.env.API_AMPLIFYAGORA_MARKETTABLE_NAME
var apiAmplifyagoraMarketTableArn = process.env.API_AMPLIFYAGORA_MARKETTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraProductTableName = process.env.API_AMPLIFYAGORA_PRODUCTTABLE_NAME
var apiAmplifyagoraProductTableArn = process.env.API_AMPLIFYAGORA_PRODUCTTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraUserTableName = process.env.API_AMPLIFYAGORA_USERTABLE_NAME
var apiAmplifyagoraUserTableArn = process.env.API_AMPLIFYAGORA_USERTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraMarketTableName = process.env.API_AMPLIFYAGORA_MARKETTABLE_NAME
var apiAmplifyagoraMarketTableArn = process.env.API_AMPLIFYAGORA_MARKETTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraProductTableName = process.env.API_AMPLIFYAGORA_PRODUCTTABLE_NAME
var apiAmplifyagoraProductTableArn = process.env.API_AMPLIFYAGORA_PRODUCTTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraUserTableName = process.env.API_AMPLIFYAGORA_USERTABLE_NAME
var apiAmplifyagoraUserTableArn = process.env.API_AMPLIFYAGORA_USERTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var apiAmplifyagoraOrderTableName = process.env.API_AMPLIFYAGORA_ORDERTABLE_NAME
var apiAmplifyagoraOrderTableArn = process.env.API_AMPLIFYAGORA_ORDERTABLE_ARN
var apiAmplifyagoraGraphQLAPIIdOutput = process.env.API_AMPLIFYAGORA_GRAPHQLAPIIDOUTPUT
var storageS3c692b989BucketName = process.env.STORAGE_S3C692B989_BUCKETNAME
var storageS3c692b989BucketName = process.env.STORAGE_S3C692B989_BUCKETNAME
var storageS3c692b989BucketName = process.env.STORAGE_S3C692B989_BUCKETNAME
var storageS3c692b989BucketName = process.env.STORAGE_S3C692B989_BUCKETNAME
var storageS3c692b989BucketName = process.env.STORAGE_S3C692B989_BUCKETNAME

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
require('dotenv').config();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

/****************************
* Example post method *
****************************/

app.post('/charge', async(req,res)=>{
  const {token} = req.body;
  const {currency,amount,description} = req.body.charge;
  try {
    const charge = await stripe.charges.create({
      source: token.id,
      amount,
      currency,
      description,
    });
    res.json(charge);
  } catch (error) {
    res.status(500).json({error})
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
