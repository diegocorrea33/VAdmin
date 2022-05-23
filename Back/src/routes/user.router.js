import express from "express";

import {
    getAllData,
    getCreateData,
    getOneData,    
    getUpdateData,
    getResetData,
    getLoginData,
    getAddProfit
}
from "../controllers/user.controller";

const router = express.Router();
router.get('/',  getAllData);
router.post('/', getCreateData);
router.post("/read",  getOneData);
router.put("/update", getUpdateData);
router.post('/reset',  getResetData);
router.post('/login', getLoginData);
router.post('/addProfit', getAddProfit);


module.exports = router;



export default router;
