/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMarket = /* GraphQL */ `
  query GetMarket($id: ID!) {
    getMarket(id: $id) {
      id
      name
      products {
        items {
          id
          description
          marketID
          price
          shipped
          owner
          createdAt
        }
        nextToken
      }
      tags
      owner
      createdAt
    }
  }
`;
export const listMarkets = /* GraphQL */ `
  query ListMarkets(
    $filter: ModelMarketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMarkets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      description
      marketID
      market {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
      }
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        marketID
        market {
          id
          name
          tags
          owner
          createdAt
        }
        file {
          bucket
          region
          key
        }
        price
        shipped
        owner
        createdAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      registered
      orders {
        items {
          id
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const searchMarkets = /* GraphQL */ `
  query SearchMarkets(
    $filter: SearchableMarketFilterInput
    $sort: SearchableMarketSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchMarkets(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
      }
      nextToken
      total
    }
  }
`;
