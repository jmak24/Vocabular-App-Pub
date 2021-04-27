/* Amplify Params - DO NOT EDIT
	API_VOCABULARAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_VOCABULARAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const getUserProfile = gql`
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      owner
      userTag
      email
      phrases {
        items {
          id
          word
          phrase
          numLikes
          likes
          authorId
          isPublic
          createdAt
          type
          updatedAt
          owner
        }
        nextToken
      }
      bookmarkedWords
      wordsArchived
      createdAt
      updatedAt
    }
  }
`;

exports.handler = async (event) => {
  const { userId, words, archived } = event;
  console.log(userId, words, archived);
  console.log(process.env);
  const API_URL =
    "https://6vs6gtf64jdfbplvdl7wfqts2m.appsync-api.us-east-1.amazonaws.com/graphql";
  const graphqlData = await axios({
    url: process.env.API_URL,
    method: "get",
    headers: {
      "x-api-key": process.env.API_vocabularAPI_GRAPHQLAPIKEYOUTPUT,
    },
    data: {
      query: print(getUserProfile),
      variables: {
        input: {
          id: userId,
        },
      },
    },
  });

  console.log("graphqlData:", graphqlData);
  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify("Hello from Lambda!"),
    // graphqlData: JSON.stringify(graphqlData),
  };
  return response;
};
