import db from '../../database/models/index';

const getAll = async (body) => {
  return await db.appStock.findAll({
    where: body
  })
    .then(data => {
      return data;
    }).catch(e => {
      console.log(e);
    });
}

module.exports = {
  getAll
}