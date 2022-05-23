
import jwt from 'jsonwebtoken';
import { secret } from '../../config/config'
import db from '../../database/models/index';

const getLogin = async (body) => {
  if (body.email !== "" && body.password !== "" && body.email !== undefined && body.password !== undefined) {
    return await db.appUser.findOne({
      where: {email: body.email, password: body.password}
    }).then(data => {
      if (data) {
        const token = jwt.sign(
          {
            id: data.id,
            email: body.email,
            password: body.password
          },
          secret,
          { expiresIn: '24h' }
        );
        return {
          success: true,
          message: 'Authentication successful!',
          token,
          data: {
            code: "200",
            id: data.id,
            name: data.name,
            email: data.email,
            typeUser: data.typeUser
          }
        }
      } else {
        return {
          code: "201",
          success: false,
          message: 'Authentication failed!'
        }
      }
    }).catch(e => {
      console.log(e);
    });
  } else {
    return {
      code: "201",
      success: false,
      message: 'Authentication failed!'
    }
  }
}

module.exports = {
  getLogin
}