import { readFileSync } from 'fs';
import * as functions from 'firebase-functions';

export const readData = functions.https.onRequest((req, res) => {
  const data = readFileSync('../data.json');
  res.json(data);
});