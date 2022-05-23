import db from '../../database/models/index';

const getAll = async (body) => {
  return await db.appCustomer.findAll({
    where: body, include: [{ model: db.appLocation, attributes: ['latitude', 'longitude', 'contact', 'title'] }]
  })
    .then(async data => {
      let depositValue = 0;
      let totalValue = 0;
      for (let index = 0; index < data.length; index++) {
        await db.appSale.findAll({ where: { idCustomer: data[index].id } }).then(async dataSale => {
          for (let indexSaleData = 0; indexSaleData < dataSale.length; indexSaleData++) {
            depositValue = dataSale[indexSaleData].deposit + depositValue;

            let products = [];
            products = JSON.parse(dataSale[indexSaleData].products);

            for (let indexProduct = 0; indexProduct < products.length; indexProduct++) {
              await db.appProduct.findAll({ where: { id: products[indexProduct].id } }).then(async dataProduct => {
                for (let indexProductPrices = 0; indexProductPrices < dataProduct.length; indexProductPrices++) {
                  totalValue = (dataProduct[indexProductPrices].price * products[indexProduct].cantidad) + totalValue;
                }
              }).catch(e => { console.log(e) })
            }


          }
        }).catch(e => {
          console.log(e);
        })
        data[index].due = data[index].due + (totalValue - depositValue);
        totalValue = 0;
        depositValue = 0;
      }

      
      return data;
    }).catch(e => {
      console.log(e);
    });
}

module.exports = {
  getAll
}