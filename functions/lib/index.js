"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// These are important and needed before anything else
// tslint:disable-next-line:no-implicit-dependencies no-import-side-effect
require("zone.js/dist/zone-node");
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');
const module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
const express = require("express");
const path_1 = require("path");
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
const app = express();
const DIST_FOLDER = path_1.join(process.cwd(), './dist');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle');
const index = require('fs')
    .readFileSync((path_1.join(DIST_FOLDER, 'index.html')), 'utf8')
    .toString();
app.get('**', (req, res) => {
    renderModuleFactory(AppServerModuleNgFactory, {
        url: req.path,
        document: index,
        extraProviders: [
            module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
        ]
    }).then(html => res.status(200).send(html));
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map