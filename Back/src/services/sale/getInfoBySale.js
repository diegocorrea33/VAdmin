import db from '../../database/models/index';
const Sequelize = require('sequelize');


const getInfoBySale = async (body) => {
  if (body.month && body.year) {
    return await db.appSale.findAll({ where: { [Sequelize.Op.and]:[Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), body.month), Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), body.year)] } }).then(async data => {
      let products = await db.appProduct.findAll();
      let routesData = await db.appRoute.findAll({ where: { [Sequelize.Op.and]:[Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), body.month), Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), body.year)] } })

      let totalValueSale = 0;
      let totalValueDeposit = 0;


      data.forEach(elementSale => {
        JSON.parse(elementSale.products).forEach(elementProducts => {
          products.forEach(dataProduct => {
            if (elementProducts.id == dataProduct.id) {
              totalValueSale = totalValueSale + (dataProduct.price * elementProducts.cantidad)
            }
          })
        })
        totalValueDeposit += elementSale.deposit;
      });

      return {
        data: { totalValueSale: totalValueSale, totalValueDeposit: totalValueDeposit, totalNumberSale: data.length, totalNumberRoutes: routesData.length, dataSale: data },
        code: 200,
        message: "Ventas del mes " + body.month
      }
    })
  } else {
    return await db.appSale.findAll().then(async data => {
      //console.log(data)
      let products = await db.appProduct.findAll();
      let routesData = await db.appRoute.findAll();

      let totalValueSale = 0;
      let totalValueDeposit = 0;


      data.forEach(elementSale => {
        JSON.parse(elementSale.products).forEach(elementProducts => {
          products.forEach(dataProduct => {
            if (elementProducts.id == dataProduct.id) {
              totalValueSale = totalValueSale + (dataProduct.price * elementProducts.cantidad)
            }
          })
        })
        totalValueDeposit += elementSale.deposit;
      });

      return {
        data: { totalValueSale: totalValueSale, totalValueDeposit: totalValueDeposit, totalNumberSale: data.length, totalNumberRoutes: routesData.length, dataSale: data },
        code: 200,
        message: "Ventas totales"
      }
    })
  }




}

module.exports = {
  getInfoBySale
}