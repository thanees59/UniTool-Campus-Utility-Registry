import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from './config/db.js';
import equipmentRoutes from './routes/equipmentRoutes.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use('/api/equipment', equipmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
