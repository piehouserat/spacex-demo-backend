import { gql } from 'graphql-tag';

export const Ship = gql`
  type Mission {
    id: ID!
    flight: String
    name: String
  }

  type Ship {
    id: ID!
    name: String
    image: String
    type: String
    active: Boolean!
    class: String
    home_port: String
    year_built: Int
    missions: [Mission]
  }

  type ShipMissingAttributes {
    shipId: ID!
    missingCount: Int!
  }

  input ShipsInput {
    pagination: PaginationInput!
  }

  input ShipMissingAttributesInput {
    attributes: [String!]!
    pagination: PaginationInput!
  }
`;
