import express from 'express';
import { submitScrapingTask, getScrapedData,getScrapedDataById,deleteScrapedDataById } from '../../controller/scraper';

const router = express.Router();

// http://localhost:3001/api/webscrape/create
router.post('/create', submitScrapingTask);

// http://localhost:3001/api/webscrape/getAll
router.get('/getAll', getScrapedData);

// http://localhost:3001/api/webscrape/getById/123
router.get('/getById/:id', getScrapedDataById);

// http://localhost:3001/api/webscrape/delete/123
router.delete('/delete/:id', deleteScrapedDataById);

export default router;

