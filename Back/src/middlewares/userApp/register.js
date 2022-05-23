import Joi from "@hapi/joi";
import ResponseUtil from "../../utils/response";
import errors from "../../utils/codeInternalErrors";
import log4js from "log4js";
import phoneValidator from 'joi-phone-validator'

const logger = log4js.getLogger();
logger.level = "debug";

const userAppValidator = async (req, res, next) => {
    logger.info("[userAppValidator] INIT");
    const data = req.body;
    const schema = Joi.object({
        "name": Joi.string().max(45, 'utf8').required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().max(90, 'utf8').required(),
        "phone": Joi.string().max(15, 'utf8').required()
    });
    const {
        error
    } = schema.validate(data);


    logger.info("[userAppValidator] FINISH");
    error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

export default userAppValidator;