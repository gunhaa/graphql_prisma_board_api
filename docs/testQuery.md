# Test Query

## createUser

```plaintext
mutation CreateUser {
  createUser(input: {
    email: "test@testtest.com"
    password: "testtest321"
  }){
    email
    name
    password
  }
}
```

## createPost

```plaintext
mutation CreatePost {
  createPost(
    input: {
      title: "글 제목"
      content: "글 내용"
      authorId: 1
    }
  ) {
    title
    content
    published
    createdAt
  }
}
```

## createCommmet

```plaintext
mutation CreateComment {
  createComment(input: {
    postId: 1
    content: "댓글 내용"
  }){
    content
    createdAt
    id
    postId
  }
}
```

## getUserWithPostsAndComments

```plaintext
query getUserWithPostsAndComments{
  getUserWithPostsAndComments(input: {
    email: "alice@example.com"
  }) {
    id
    name
    password
    email
    createdAt
    posts {
      id
      authorId
      title
      content
      published
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
}
```

## introspection

```plaintext
query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
      }
    }
  }
}

```
