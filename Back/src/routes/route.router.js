import express from "express";

import {
    getAllData,
    getCreateData,
    getOneData,    
    getUpdateData,
    getRouteByDate,
    getInfo,
    getDeleteRoute
}
from "../controllers/route.controller";

const router = express.Router();
router.post('/all',  getAllData);
router.post('/', getCreateData);
router.post("/read",  getOneData);
router.put("/update", getUpdateData);
router.post('/getRoute',  getRouteByDate);
router.post('/getInfoRoute',  getInfo);
router.delete('/delete',  getDeleteRoute);



module.exports = router;



export default router;
