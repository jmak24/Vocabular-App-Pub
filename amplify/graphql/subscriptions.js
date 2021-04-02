/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePhrase = /* GraphQL */ `
  subscription OnCreatePhrase {
    onCreatePhrase {
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
export const onUpdatePhrase = /* GraphQL */ `
  subscription OnUpdatePhrase {
    onUpdatePhrase {
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
export const onDeletePhrase = /* GraphQL */ `
  subscription OnDeletePhrase {
    onDeletePhrase {
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
