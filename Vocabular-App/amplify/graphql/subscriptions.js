/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile {
    onCreateUserProfile {
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile {
    onUpdateUserProfile {
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile {
    onDeleteUserProfile {
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
export const onCreatePhrase = /* GraphQL */ `
  subscription OnCreatePhrase {
    onCreatePhrase {
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
      owner
    }
  }
`;
export const onUpdatePhrase = /* GraphQL */ `
  subscription OnUpdatePhrase {
    onUpdatePhrase {
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
      owner
    }
  }
`;
export const onDeletePhrase = /* GraphQL */ `
  subscription OnDeletePhrase {
    onDeletePhrase {
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
      owner
    }
  }
`;
