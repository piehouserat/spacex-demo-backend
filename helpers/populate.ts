if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { db } from '../models';
import { cleanDb } from '../helpers/testHelpers';
import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';
import type { ShipAttributes } from '../models/Ship';

const populate = async () => {
  await cleanDb();
  console.log('Populating database...');

  const ships = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ ships { id name image class active year_built home_port type } }' }),
  })
    .then(res => res.json())
    .then(data => data.data.ships);

  await Promise.all(
    ships.map((ship: ShipAttributes) => {
      return db.Ship.create({
        active: ship.active,
        name: ship.name,
        class: ship.class,
        image: ship.image,
        year_built: ship.year_built,
        home_port: ship.home_port,
        type: ship.type,
      });
    }),
  );

  // Create fake missions
  const missionCount = 60;
  const missions = Array.from({ length: missionCount }, () => {
    return {
      name: `Mission ${faker.animal.type()}-${faker.datatype.number({ min: 1, max: 100 })}`,
      description: faker.lorem.sentence(),
    };
  });

  const allShips = await db.Ship.findAll();

  await Promise.all(
    missions.map(async mission => {
      const randomShip = faker.helpers.arrayElement(allShips);

      return db.Mission.create({
        name: mission.name,
        description: mission.description,
        ShipId: randomShip.id,
      });
    }),
  );

  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
