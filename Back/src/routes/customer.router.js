import express from "express";

import {
    getAllData,
    getCreateData,
    getOneData,    
    getUpdateData,
    getDeleteData
}
from "../controllers/customer.controller";

const router = express.Router();
router.post('/all',  getAllData);
router.post('/', getCreateData);
router.post("/read",  getOneData);
router.put("/update", getUpdateData);
router.delete("/delete", getDeleteData);



module.exports = router;



export default router;
