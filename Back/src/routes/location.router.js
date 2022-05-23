import express from "express";

import {
    getAllData,
    getCreateData,
    getOneData,    
    getUpdateData
}
from "../controllers/location.controller";

const router = express.Router();
router.get('/',  getAllData);
router.post('/', getCreateData);
router.post("/read",  getOneData);
router.put("/update", getUpdateData);


module.exports = router;



export default router;
