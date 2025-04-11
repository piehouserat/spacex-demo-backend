if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { db } from '../models';
import { cleanDb } from '../helpers/testHelpers';
import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';

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
    ships.map((ship: any) => {
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
  const missionCount = 20;
  const missionNames = Array.from({ length: missionCount }, () =>
    `Mission ${faker.animal.type()} ${faker.datatype.number({ min: 1, max: 100 })}`
  );

  const allShips = await db.Ship.findAll();

  await Promise.all(
    missionNames.map(async (missionName) => {
      // Get a random ship
      const randomShip = allShips[Math.floor(Math.random() * allShips.length)];

      return db.Mission.create({
        name: missionName,
        flight: `Flight-${faker.datatype.number({ min: 1000, max: 9999 })}`,
        shipId: randomShip.id,
      });
    }),
  );

  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
