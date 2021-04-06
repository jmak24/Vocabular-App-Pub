/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
export const createPhrase = /* GraphQL */ `
  mutation CreatePhrase(
    $input: CreatePhraseInput!
    $condition: ModelPhraseConditionInput
  ) {
    createPhrase(input: $input, condition: $condition) {
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
export const updatePhrase = /* GraphQL */ `
  mutation UpdatePhrase(
    $input: UpdatePhraseInput!
    $condition: ModelPhraseConditionInput
  ) {
    updatePhrase(input: $input, condition: $condition) {
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
export const deletePhrase = /* GraphQL */ `
  mutation DeletePhrase(
    $input: DeletePhraseInput!
    $condition: ModelPhraseConditionInput
  ) {
    deletePhrase(input: $input, condition: $condition) {
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
