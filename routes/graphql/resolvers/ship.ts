import { QueryShipsArgs } from '../../../common/types/backend';
import { GraphqlContext } from '../../../config';
import { shipController } from '../../../controllers';
import { ShipAttributes } from '../../../models/Ship';

const ships = async (rootValue, { input }: QueryShipsArgs, context: GraphqlContext): Promise<ShipAttributes[]> => {
  return shipController.get(input, context);
};

const shipMissingAttributes = async (rootValue, { input }, context: GraphqlContext) => {
  return shipController.getMissingAttributes(input, context);
};

// const addShip = async (rootValue, _, context: GraphqlContext): Promise<ShipAttributes | null> => {
//   return null;
// };

const query = { ships, shipMissingAttributes };

const mutation = {};

const Ship = { query, mutation };
export { Ship };
