import express from "express";

import {
    getAllData,
    getCreateData,
    getOneData,    
    getUpdateData
}
from "../controllers/extraExpense.controller";

const router = express.Router();
router.post('/all',  getAllData);
router.post('/', getCreateData);
router.post("/read",  getOneData);
router.put("/update", getUpdateData);


module.exports = router;



export default router;
