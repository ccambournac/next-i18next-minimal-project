![version](https://img.shields.io/badge/version-0.0.0-red.svg?style=flat-square) ![build](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square) ![node](https://img.shields.io/badge/Node.js-10.16.0-green.svg?colorB=026e00&style=flat-square) ![yarn](https://img.shields.io/badge/Yarn-1.16.0-blue.svg?style=flat-square) ![Webpack](https://img.shields.io/badge/Webpack-4.32.2-blue.svg?colorB=8DD6F9&style=flat-square) ![Babel](https://img.shields.io/badge/Babel-7.4.5-yellow.svg?colorB=f5da55&style=flat-square) ![Next.js](https://img.shields.io/badge/Next.js-8.1.0-black.svg?colorB=000000&style=flat-square)

# Frontstage application
**First-time installation is performed with the following script execution:**
```
$ sh scripts/install.sh
```
**Then, all following commands are to be run from the project directory: `./project`.**

## Installation
**This step is already performed by the installation script above.**
```
$ yarn install
```

## Development
```
$ yarn start
```

## Production
```
$ yarn build
```

## Application's server execution
### Evaluation server (local)
You may want to test your production build locally by simply running application's server with:
```
$ yarn serve
```
### Production server (remote)
In real conditions, it is recommanded to use a Node.js process manager to run the application. For that purpose, the project is pre-configured to use PM2 with: 
```
$ yarn serve:pm2
```
