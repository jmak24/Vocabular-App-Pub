/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        userTag
        email
        wordsBookmarked
        wordsArchived
        createdAt
        updatedAt
        phrases {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      owner
      userTag
      email
      wordsBookmarked
      wordsArchived
      createdAt
      updatedAt
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
        userTag
        phrases {
          nextToken
        }
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
      isPublic
      createdAt
      type
      updatedAt
      author {
        id
        userTag
        phrases {
          nextToken
        }
      }
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
        isPublic
        createdAt
        type
        updatedAt
        author {
          id
          userTag
        }
        owner
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
        isPublic
        createdAt
        type
        updatedAt
        author {
          id
          userTag
        }
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
        isPublic
        createdAt
        type
        updatedAt
        author {
          id
          userTag
        }
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
        isPublic
        createdAt
        type
        updatedAt
        author {
          id
          userTag
        }
        owner
      }
      nextToken
    }
  }
`;
