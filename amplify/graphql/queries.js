/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      owner
      userHandle
      email
      phrases {
        items {
          id
          word
          phrase
          numLikes
          likes
          authorId
          authorHandle
          isPublic
          createdAt
          type
          updatedAt
          owner
        }
        nextToken
      }
      words
      createdAt
      updatedAt
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        userHandle
        email
        phrases {
          nextToken
        }
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
      authorHandle
      isPublic
      createdAt
      type
      updatedAt
      owner
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
        authorHandle
        isPublic
        createdAt
        type
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const userProfileByOwner = /* GraphQL */ `
  query UserProfileByOwner(
    $owner: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userProfileByOwner(
      owner: $owner
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        userHandle
        email
        phrases {
          nextToken
        }
        words
        createdAt
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
        authorHandle
        isPublic
        createdAt
        type
        updatedAt
        owner
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
        authorHandle
        isPublic
        createdAt
        type
        updatedAt
        owner
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
        authorHandle
        isPublic
        createdAt
        type
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
