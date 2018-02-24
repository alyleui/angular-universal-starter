import { readFileSync } from 'fs';
import * as functions from 'firebase-functions';
import { join,resolve } from 'path';

export const readData = functions.https.onRequest((req, res) => {
  const data = readFileSync(`${process.cwd()}/data.json`, 'utf8');
  console.log(JSON.parse(data));
  res.json(data);
});