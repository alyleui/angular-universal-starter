// These are important and needed before anything else
// tslint:disable-next-line:no-implicit-dependencies no-import-side-effect
import 'zone.js/dist/zone-node';
// tslint:disable-next-line:no-implicit-dependencies no-import-side-effect
import 'reflect-metadata';
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import { join, resolve } from 'path';
import * as functions from 'firebase-functions';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const app = express();

const DIST_FOLDER = join(process.cwd(), './dist');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle');

const index = require('fs')
.readFileSync((join(DIST_FOLDER, 'index.html')), 'utf8')
.toString();

app.get('**', (req, res) => {
  renderModuleFactory(AppServerModuleNgFactory, {
      url: req.path,
      document: index,
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
  }).then(html => res.status(200).send(html));
});

/** for Firebase Functions */
export const ssr = functions.https.onRequest(app);
export * from './getdata';

// app.listen(3000, () => {
//   console.log('Example app listening on port 3000!');
// });