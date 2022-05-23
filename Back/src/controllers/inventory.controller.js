
import {
  getAll
} from '../services/inventory/getAll';
import {
  getOne
} from '../services/inventory/getOne';

import {
  getCreate
} from '../services/inventory/getCreate';

import {
  getUpdate
} from '../services/inventory/getUpdate';

import {
    getReserve
  } from '../services/inventory/getReserve';

import errors from "../utils/codeInternalErrors";
import ResponseUtil from "../utils/response";
import DefaultConstants from "../utils/defaultConstants";

import log4js from "log4js";
const logger = log4js.getLogger();
logger.level = DefaultConstants.logerlevel;




export async function getAllData(req, res, next) {    
  try {
      logger.info("[getAllData] INIT");
      let params = await getAll(req.body);
      ResponseUtil.success(res, params);
  } catch (error) {
      logger.info("[getAllShoppingCart]  ERROR", error);
      ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
}
export async function getCreateData(req, res, next) {
  try {
      await getCreate(req.body, req.files)
          .then(data => {
              res.status(200).json({
                  message: 'Created successfully',
                  data: data,
                  code: 200
              });
          })
          .catch(e => {
              console.log(e);
          });
  } catch (e) {
      res.status(500).json({
          message: 'Something goes wrong',
          data: {},
          error: true
      });
  }
}

export function getOneData(req, res, next) {
  try {
      const {
          id
      } = req.body;
      getOne(req.body).then(data => {
          res.status(200).json({
              message: 'One row',
              data: data
          });
      });
  } catch (e) {
      res.status(500).json({
          message: 'Something goes wrong',
          data: {},
          error: true
      });
  }
}

export async function getUpdateData(req, res, next) {
  try {
      await getUpdate(req.body, req.files)
          .then(data => {
              res.status(200).json({
                  message: 'Updated successfully',
                  data: data,
                  code: 200
              });
          }).catch(e => {
              console.log(e);
          });
  } catch (e) {
      res.status(500).json({
          message: 'Something goes wrong',
          data: {},
          error: true
      });
  }
}

export async function getReserveInventory(req, res, next) {
    try {
        await getReserve(req.body, req.files)
            .then(data => {
                res.status(200).json({
                    message: 'Reserve successfully',
                    data: data,
                    code: 200
                });
            }).catch(e => {
                console.log(e);
            });
    } catch (e) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {},
            error: true
        });
    }
  }
