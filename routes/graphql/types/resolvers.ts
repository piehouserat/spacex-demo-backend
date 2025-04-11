import { gql } from 'graphql-tag';

const queries = gql`
  type Query {
    user(input: UserInput!): User!
    blockApp(input: BlockAppInput!): BlockApp!
    ships(input: ShipsInput!): [Ship!]
    shipMissingAttributes(input: ShipMissingAttributesInput!): [ShipMissingAttributes!]!
  }
`;

const mutations = gql`
  type Mutation {
    addUser: User
  }
`;

export { queries, mutations };
