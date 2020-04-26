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

#### Rate Limit Delays

Each request adds a delay of 1 second by default to avoid rate limiting. You can tweak this number by adding a query parameter for `delay` like:

```
localhost:3000/astroempires/antares/all?type=xlsx&delay=0.5 # This will delay half a second between each astroempires request
localhost:3000/astroempires/antares/all?type=xlsx&delay=5 # This will delay 5 seconds between each astroempires request
```


##### Scheduled Downloads
With the application running, you can schedule downloads by running the following command via something like Task Scheduler with windows via Git Bash:

`curl http://localhost:3000/astroempires/antares/all?type=xlsx -JO`

#### Killing Errant Node Processes on Windows

In your git bash terminal run `taskkill //F //IM node.exe` to kill existing node processes if you get messages about the port already being used.
