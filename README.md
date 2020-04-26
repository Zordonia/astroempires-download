# astroempires-download

## NodeJS
Download and install NodeJS https://nodejs.org/en/download/

## Git Bash for Windows
Download and install GitBash for Windows https://gitforwindows.org/

### Install Instructions

- Clone this Repository
- Navigate to this repository in Git Bash
- Run `npm install`
- Run nodemon by either
    - Installing nodemon globally (npm install -g nodemon)
    - Then you can run `nodemon`
    OR
    - Run from node_modules by running `./node_modules/nodemon/bin/nodemon.js`

### Usage

- You can now retrieve either json or Excel or CSV files of the data by navigating in Chrome to the following URL pattern:

localhost:3000/astroempires/antares/:section/:view?type=:type

You can switch out the type parameter to be either csv, xlsx, or json
Valid views are level, economy, fleet, technology, or experience
Valid sections are players, guilds, bases, npc (bases and npc don't have sub-views to display)

You can also download everything by navigating to localhost:3000/astroempires/antares/all?type=xlsx

Examples:
localhost:3000/astroempires/antares/players/levels?type=csv
localhost:3000/astroempires/antares/guilds/levels?type=json
localhost:3000/astroempires/antares/bases?type=xlsx


##### Scheduled Downloads
With the application running, you can schedule downloads by running the following command via something like Task Scheduler with windows via Git Bash:

`curl http://localhost:3000/astroempires/antares/all?type=xlsx -JO`
