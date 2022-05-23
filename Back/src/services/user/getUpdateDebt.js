//import fs from 'fs';
import db from '../../database/models/index';;

const getUpdateDebt = async (body) => {
  let userData = await db.appUser.findOne({ where: {id: body.id}});
  let data = {
    profit: parseInt(body.profit) + parseInt(userData.profit)
  }
  return await db.appUser
    .update(data,
      {
        where: {
          id: body.id,
        },
      }
    )
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = {
  getUpdateDebt
}