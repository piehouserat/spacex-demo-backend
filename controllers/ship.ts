import { PaginationInput } from '../common/types/backend';
import { AuthScope } from '../config';
import { db } from '../models';
import { Mission } from '../models/mission';
import { ShipAttributes } from '../models/ship';

const VALID_SHIP_ATTRIBUTES = ['class', 'name', 'image', 'year_built', 'home_port', 'type'] as const;
type ValidShipAttribute = typeof VALID_SHIP_ATTRIBUTES[number];

const get = async ({ pagination }: { pagination: PaginationInput }, authScope: AuthScope): Promise<ShipAttributes[]> => {
  const ships = await db.Ship.findAll({
    include: [{ model: Mission, as: 'missions' }],
    limit: pagination.limit,
    offset: pagination.offset,
  });

  return ships;
};

const getMissingAttributes = async (
  { attributes, pagination }: { attributes: string[]; pagination: PaginationInput },
  authScope: AuthScope,
): Promise<Array<{ shipId: string; missingCount: number }>> => {
  // Filter out invalid attributes
  const validAttributes = attributes.filter((attr): attr is ValidShipAttribute =>
    VALID_SHIP_ATTRIBUTES.includes(attr as ValidShipAttribute)
  );

  const ships = await db.Ship.findAll({
    limit: pagination.limit,
    offset: pagination.offset,
  });

  return ships.map(ship => {
    const missingCount = validAttributes.reduce((count, attribute) => {
      // Check if the attribute exists and is null/undefined
      if (ship.getDataValue(attribute) === null || ship.getDataValue(attribute) === undefined) {
        return count + 1;
      }
      return count;
    }, 0);

    return {
      shipId: ship.id,
      missingCount,
    };
  });
};

const shipController = {
  get,
  getMissingAttributes,
};
export { shipController };
