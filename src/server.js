import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import adRoutes from './routes/adRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/ads', adRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
