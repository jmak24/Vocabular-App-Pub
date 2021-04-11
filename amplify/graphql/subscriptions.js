/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile($owner: String!) {
    onCreateUserProfile(owner: $owner) {
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
      archivedWords
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile($owner: String!) {
    onUpdateUserProfile(owner: $owner) {
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
      archivedWords
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile($owner: String!) {
    onDeleteUserProfile(owner: $owner) {
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
      archivedWords
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
      author {
        id
        owner
        userTag
        email
        phrases {
          nextToken
        }
        bookmarkedWords
        archivedWords
        createdAt
        updatedAt
      }
      isPublic
      createdAt
      type
      updatedAt
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
      author {
        id
        owner
        userTag
        email
        phrases {
          nextToken
        }
        bookmarkedWords
        archivedWords
        createdAt
        updatedAt
      }
      isPublic
      createdAt
      type
      updatedAt
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
      author {
        id
        owner
        userTag
        email
        phrases {
          nextToken
        }
        bookmarkedWords
        archivedWords
        createdAt
        updatedAt
      }
      isPublic
      createdAt
      type
      updatedAt
      owner
    }
  }
`;
