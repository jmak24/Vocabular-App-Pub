/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userTag
      email
      phrases {
        nextToken
      }
      words
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userTag
        email
        words
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPhrase = /* GraphQL */ `
  query GetPhrase($id: ID!) {
    getPhrase(id: $id) {
      id
      word
      phrase
      numLikes
      likes
      authorId
      authorTag
      isPublic
      createdAt
      type
      updatedAt
    }
  }
`;
export const listPhrases = /* GraphQL */ `
  query ListPhrases(
    $filter: ModelPhraseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhrases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        word
        phrase
        numLikes
        likes
        authorId
        authorTag
        isPublic
        createdAt
        type
        updatedAt
      }
      nextToken
    }
  }
`;
export const phrasesByUser = /* GraphQL */ `
  query PhrasesByUser(
    $authorId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPhraseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    phrasesByUser(
      authorId: $authorId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        word
        phrase
        numLikes
        likes
        authorId
        authorTag
        isPublic
        createdAt
        type
        updatedAt
      }
      nextToken
    }
  }
`;
export const phrasesByDate = /* GraphQL */ `
  query PhrasesByDate(
    $word: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPhraseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    phrasesByDate(
      word: $word
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        word
        phrase
        numLikes
        likes
        authorId
        authorTag
        isPublic
        createdAt
        type
        updatedAt
      }
      nextToken
    }
  }
`;
export const phrasesByLikes = /* GraphQL */ `
  query PhrasesByLikes(
    $type: String
    $numLikes: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPhraseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    phrasesByLikes(
      type: $type
      numLikes: $numLikes
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        word
        phrase
        numLikes
        likes
        authorId
        authorTag
        isPublic
        createdAt
        type
        updatedAt
      }
      nextToken
    }
  }
`;
