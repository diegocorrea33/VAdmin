import db from '../../database/models/index';
const Sequelize = require('sequelize');

const getAll = async (body) => {
  if (body.dateInitial && body.dateFinal && body.dateInitial != undefined && body.dateFinal != undefined) {
    return await db.appRoute.findAll({
      where: {createdAt: {
        [Sequelize.Op.between]: [body.dateInitial, body.dateFinal]
      }}, include: [{ model: db.appInventory, attributes: ['id', 'title', 'products', 'state']}]
    })
      .then(data => {
        return data;
      }).catch(e => {
        console.log(e);
      });
  } else if (body.dateInitial && body.dateInitial != undefined){
    console.log("fecha inicial")
    return await db.appRoute.findAll({
      where: {createdAt: {
        [Sequelize.Op.gte]: new Date(body.dateInitial)
      }}, include: [{ model: db.appInventory, attributes: ['id', 'title', 'products', 'state']}]
    })
      .then(data => {
        return data;
      }).catch(e => {
        console.log(e);
      });
  } else if (body.dateFinal && body.dateFinal != undefined) {
    console.log("fecha final")
    return await db.appRoute.findAll({
      where: {createdAt: {
        [Sequelize.Op.lte]:  new Date(body.dateFinal)
      }}, include: [{ model: db.appInventory, attributes: ['id', 'title', 'products', 'state']}]
    })
      .then(data => {
        return data;
      }).catch(e => {
        console.log(e);
      });
  } else {
    return await db.appRoute.findAll({
      where: body, include: [{ model: db.appInventory, attributes: ['id', 'title', 'products', 'state']}]
    })
      .then(data => {
        return data;
      }).catch(e => {
        console.log(e);
      });
  }
  
}

module.exports = {
  getAll
}