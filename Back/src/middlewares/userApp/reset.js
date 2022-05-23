import Joi from "@hapi/joi";
import ResponseUtil from "../../utils/response";
import errors from "../../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = "debug";

const userAppResetValidator = async (req, res, next) => {
    logger.info("[userAppResetValidator] INIT");

    const data = req.body;

    const schema = Joi.object({
        "email": Joi.string().email().required()
    });

    const {
        error
    } = schema.validate(data);

    logger.info("[userAppResetValidator] FINISH");
    error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

export default userAppResetValidator;