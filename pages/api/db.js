import fs from 'fs';
import path from 'path';

// Define the path to the db.json file
const dbFilePath = path.resolve(process.cwd(), 'db.json');

// Read the contents of the db.json file
const rawData = fs.readFileSync(dbFilePath);
const data = JSON.parse(rawData);

export default function handler(req, res) {
  res.status(200).json(data);
}
