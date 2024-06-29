import express from "express";
import webScrap from './route/webScarp'
const router = express.Router();

router.use('/webscrape',webScrap)

export default router