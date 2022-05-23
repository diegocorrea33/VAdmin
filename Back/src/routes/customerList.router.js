import express from "express";

import {
    getAllData,
    getCreateData,
    getOneData,    
    getReserveInventory,    
    getUpdateData
}
from "../controllers/customer-list.controller";

const router = express.Router();
router.get('/',  getAllData);
router.post('/', getCreateData);
router.post("/read",  getOneData);
router.put("/update", getUpdateData);
//router.post("/reserve", getReserveInventory);



module.exports = router;



export default router;
