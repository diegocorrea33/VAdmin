import express from "express";

import {
    getAllData,
    getCreateData,
    getOneData,    
    getReserveInventory,    
    getUpdateData
}
from "../controllers/inventory.controller";

const router = express.Router();
router.get('/',  getAllData);
router.post('/', getCreateData);
router.post("/read",  getOneData);
router.put("/update", getUpdateData);
router.post("/reserve", getReserveInventory);



module.exports = router;



export default router;
