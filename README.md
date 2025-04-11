# :space_invader: spacex

> Level Software Development

## :arrow_forward: Usage

Add the neccesary keys to the .env file. Then run:

```sh
yarn run start
```

### Create the database

To create a database for the project run:

```sh
cd ./infrastructure
bash start.sh
```

## :dizzy: Deployment

When deploying a project, add the following secrets to your repo settings (under secrets actions) and any project dependant secrets to AWS Systems Manager:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

Now remove line 13 from `.github/workflows/deploy-server.yml` and merge your project into the main branch.

AWS Cloudformation will now generate your project.

## :computer: Contributing

Contributions are very welcome, as well as issues created for any updates required.

## Solution notes

Running yarn install using my default node version of 20.x resulted in the following error:

```
error @apollo/federation@0.27.0: The engine "node" is incompatible with this module. Expected version ">=12.13.0 <17.0". Got "20.19.0"
```

I used my node version manager to use the LTS of 16 and set this into an .nvmrc file for convenience.

I have added a `missions` table and related it to the `ships` table via the foreign key `shipId`.

I have updated the `helpers/populate.ts` script to create some missions using `faker` and linked them with random ships.

I have also extended the `ships` table to accomodate the extra data required to display in the frontend such as `home_port`, `year_built` and `type`. I have added a migration script for these changes.

I have added a custom query `shipMissingAttributes` which accepts a string[] of attributes which are validated against available options and returns the total count of null/undefined values. This query also accepts pagination options for consistency with the existing `ships` query although this could have been omitted.