const express = require('express')
const requirejs = require('requirejs');
// Set up any config you need (you might not need this)
requirejs.config({
    basePath: "."
  });

  
const app = express()
const port = 3000

var AstroEmpire = requirejs('./astro/app.js'),
    AstroEmpireInstance = new AstroEmpire(app);

AstroEmpireInstance.configureExpressRoutes()

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))