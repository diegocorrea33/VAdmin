
import { getOne } from "../services/user/getOne";
import { getAll } from "../services/user/getAll";
import { getCreate } from "../services/user/getCreate";
import { getUpdate } from "../services/user/getUpdate";
import { getLogin } from '../services/user/getLogin';
import {  unique } from '../services/user/unique';
import {  getReset } from '../services/user/getReset';
import {  getUpdateDebt } from '../services/user/getUpdateDebt';



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
        let unico = await unique(req.body).then(data => {
            return data;
          
            }).catch(error => {
                logger.info("[Error unique]  ERROR", error);
                ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
            });
        if (!unico) {
            logger.info("[getCreateData] INIT");
            let params = await getCreate(req.body);
            ResponseUtil.success(res, params);
          } else {
              logger.info("[getCreateData] userExists");
              ResponseUtil.userExists(res, errors.CODE_NO_CONTENT, errors.USER_EXISTS_MESSAGE);
          }
  } catch (error) {
      logger.info("[getAllData]  ERROR", error);
      ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
}

export async function getOneData(req, res, next) {
  try {
    logger.info("[getOneData] INIT");
    let params = await getOne(req.body);
    ResponseUtil.success(res, params);
  } catch (error) {
    logger.info("[getOneData]  ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
}


export async function getUpdateData(req, res, next) {
  try {
    logger.info("[getUpdateData] INIT");
    let params = await getUpdate(req.body, req.files);
    ResponseUtil.success(res, params);
  } catch (error) {
    logger.info("[getUpdateData]  ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
}

export async function getLoginData(req, res, next) {
  try {
      
      await getLogin(req.body)
          .then(data => {
              if (data)
                  res.status(200).json({
                      code:200,
                      message: data.message,
                      token: data.token ? data.token : '',
                      type: data.data
                  });
              else
                  res.status(401).json({
                     code:201,
                      message: data.message,
                      token: false
                  });
          }).catch(e => {
              console.log('error', e);
          });
  } catch (e) {
      console.log(e);
      res.status(500).json({
          message: 'Something goes wrong',
          data: {},
          error: true
      });
  }
}



export async function getResetData(req, res, next) {
  try {     
      unique(req.body).then(data => {
          if (data) {
                      let newPassword
                      function makeid(length) {
                          var result = '';
                          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                          var charactersLength = characters.length;
                          for (var i = 0; i < length; i++) {
                              result += characters.charAt(Math.floor(Math.random() * charactersLength));
                          }
                          return result;
                      }
                      
                      let dataUser = req.body
                       
                      if (dataUser.newPassword){
                          newPassword = dataUser.newPassword                      
                      }else{
                          newPassword = makeid(5) 
                      }
                      
                      let password = sha256(newPassword)
                      getReset(req.body, password, newPassword).then(data => {
                          res.status(200).json({
                              message: 'Email Send',
                              data: data,
                              status: true

                          });
                      });
           }  else {
                  res.status(401).json({
                      message: 'user not exists',
                      data: {},
                      error: true
                  });
              }
      }).catch(e => {
          res.status(500).json({
                      message: 'Something goes wrong1',
                      data: {},
                      error: true
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

export async function getAddProfit(req, res, next) {
  try {
    logger.info("[getUpdateData] INIT");
    let params = await getUpdateDebt(req.body);
    ResponseUtil.success(res, params);
  } catch (error) {
    logger.info("[getUpdateData]  ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
}