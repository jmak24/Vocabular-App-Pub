/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!, $withPhrases: Boolean!) {
    getUserProfile(id: $id) {
      id
      owner
      userTag
      email
      phrases @include(if: $withPhrases) {
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
      wordsBookmarked
      wordsArchived
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
        userTag
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
      author {
        id
        userTag
      }
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
        author {
          id
          userTag
        }
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
export const userProfileByEmail = /* GraphQL */ `
  query UserProfileByEmail(
    $email: AWSEmail
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userProfileByEmail(
      email: $email
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        userTag
        email
        phrases {
          nextToken
        }
        wordsBookmarked
        wordsArchived
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
        author {
          id
          userTag
        }
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
        author {
          id
          userTag
        }
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
    # $numLikes: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPhraseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    phrasesByLikes(
      type: $type
      numLikes: { gt: 0 }
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
        author {
          id
          userTag
        }
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
