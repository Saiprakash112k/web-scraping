import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import cheerio from 'cheerio';
import models from './../Db/models/index'


const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const fetchDataWithRetry = async (url: string, retries: number = MAX_RETRIES): Promise<string> => {
    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt} failed. Retrying...`);
            await new Promise(res => setTimeout(res, RETRY_DELAY));
        }
    }
    throw lastError;
};



export const submitScrapingTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { url } = req.body
        if (!url) {
            res.status(400).json({ error: 'URL is required' });
            return
        }
        const existingUrl = await models.Product.findOne({
            where:{
                url:url
            }
        })
        if(existingUrl){
            res.status(409).json({
                message:'URL already exist'
            })
            return
        }
        const data = await fetchDataWithRetry(url);
        // const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const productData = {
            name: $('#productTitle').text().trim(),
            productId: '',
            price: parseInt($('.a-price-whole').text().replace(/[^0-9.]/g, '') || '0'),
            imageUrl: $('#imgTagWrapperId img').attr('src'),
            description: $('.po-special_feature .a-size-base.po-break-word').text().trim(),
            brand: $('.po-brand .a-size-base.po-break-word').text().trim() || '',
            rating: ($('#acrCustomerReviewText').text().trim() || '0'),
            stock: $('.availability .a-section.a-spacing-none.a-spacing-top-micro').text().trim() || "Available",
            url,
        };
        productData.productId = uuidv4()
        const result = await models.Product.create(productData)
        res.status(200).json({ data: productData, message: "user productData is successfully Stored" })
        return;
    } catch (err: any) {
        console.log(err)
        res
            .status(500)
            .send({ error: err.message, message: "productData creation failed" });
        return
    }
}

export const getScrapedData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await models.Product.findAll()
        res.status(200).json({ data: result, message: "products data fetched successfully" })
    } catch (err: any) {
        console.log(err)
        res
            .status(500)
            .send({ error: err.message, message: "productDatas fetched failed" });
        return
    }
}

export const getScrapedDataById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const result = await models.Product.findOne({
            where: {
                productId: id
            }
        })
        if (!result) {
            res.status(404).send('Product is not found')
            return
        }
        res.status(200).json({ data: result, message: "product data fetched successfully" })
    } catch (err: any) {
        console.log(err)
        res
            .status(500)
            .send({ error: err.message, message: "productData fetched failed" });
        return
    }
}

export const deleteScrapedDataById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const result = await models.Product.findOne({
            where: {
                productId: id
            }
        })
        if (!result) {
            res.status(404).send('Product is not found')
            return
        }
        await models.Product.destroy({
            where: {
                productId: id
            }
        })
        res.status(200).json({ message: "product data deleted successfully" })
    } catch (err: any) {
        console.log(err)
        res
            .status(500)
            .send({ error: err.message, message: "productData delete failed" });
        return
    }
}