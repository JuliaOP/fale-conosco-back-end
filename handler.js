const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const Ajv = require("ajv");
var uuid = require('uuid');
const app = express();
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/users/:userId", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      res.json(Item);
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});


app.post("/users", async function (req, res) {
  const userDataSchema = {
    type: "object",
    properties: {
      address: {
        type: "object",
        properties: {
          zip: {type: "string"},
          street: {type: "string"},
          complement: {type: "string"},
          neighborhood: {type: "string"},
          city: {type: "string"},
          state: {type: "string"},
          number: {type: "string"},
        }
      },
      name: {type: "string"},
      credential: {type: "string"},
      email: {type: "string"},
      phone: {type: "string"},
    },
    if: {properties: {email: {type: "null"}}},
    then: {required: ["phone", "name"]},
    else: {required: ["email", "name"]},
    additionalProperties: false,
  }
  const ajv = new Ajv()
  const validator = ajv.compile(userDataSchema)
  const valid = validator(req.body)

  if (!valid) {
    return res.status(400).json({ error: validator.errors });
  }
  try {
    const userData = {
      userId: uuid.v4(),
      ...req.body
    }
    const params = {
      TableName: USERS_TABLE,
      Item: userData
    };
    await dynamoDbClient.put(params).promise();
    return res.status(201).json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not create user"});
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
