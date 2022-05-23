import express from "express";

import {
    getAllData,
    getCreateData,
    getOneData,    
    getUpdateData,
    getInfoSale
}
from "../controllers/sale.controller";

const router = express.Router();
router.post('/all',  getAllData);
router.post('/', getCreateData);
router.post("/read",  getOneData);
router.put("/update", getUpdateData);
router.post("/infoSale", getInfoSale);



module.exports = router;



export default router;
