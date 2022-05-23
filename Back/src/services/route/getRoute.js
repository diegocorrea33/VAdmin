import db from '../../database/models/index';

const getRoute = async (body) => {
  return await db.appRoute.findAll({
    where: { idUser: body.idUser, date: body.date, state: 0 }, include: [{ model: db.appInventory, attributes: ['id', 'title', 'products', 'state'] }, { model: db.appCustomerList }]
  })
    .then(async dataCustomer => {
      let dateData = new Date()
      let product = [];
      let productItem = 0;

      let customer = [];
      let customerItem = 0;

      let depositValue = 0;
      let totalValue = 0;

      let dataGeneral = dataCustomer;
      let dataIndex = 0;
      let jsonProductData;
      for (let index = 0; index < dataGeneral.length; index++) {
        let dateDataRoute = new Date(dataGeneral[index].date)
        //console.log("Fecha 1")
        //console.log(new Date(dateData.valueOf() + dateData.getTimezoneOffset() * 60000).setHours(0, 0, 0, 0))
        //console.log("Fecha 2")
        //console.log(new Date(dateDataRoute.valueOf() + dateDataRoute.getTimezoneOffset() * 60000).setHours(0, 0, 0, 0))
        //await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(new Date(dateData.valueOf() + dateData.getTimezoneOffset() * 60000).getDay())
        //if (new Date(dateData.valueOf() + dateData.getTimezoneOffset() * 60000).setHours(0, 0, 0, 0) == new Date(dateDataRoute.valueOf() + dateDataRoute.getTimezoneOffset() * 60000).setHours(0, 0, 0, 0)) {
        //console.log(dataGeneral[index].inventory)
        let inventoryId = dataGeneral[index].inventory;
        //let jsonProductData = JSON.parse(dataGeneral[index].appInventories[0].products);
        jsonProductData = await db.appInventory.findOne({ where: { id: inventoryId } })
        //console.log(jsonProductData.products[0])
        let jsonDataProductList = JSON.parse(jsonProductData.products);
        for (let indexProduct = 0; indexProduct < jsonDataProductList.length; indexProduct++) {
          db.appProduct.findOne({ where: { id: jsonDataProductList[indexProduct].id } })
            .then(dataProduct => {
              //console.log(product[productItem])

              product[productItem] = dataProduct;
              productItem++;
              dataIndex = index;
            })
            .catch(e => {
              console.log(e)
            })
        }

        if (dataGeneral[index].dataValues.appCustomerLists[0].dataValues.customers !== "") {
          let idCustomer = JSON.parse(dataGeneral[index].dataValues.appCustomerLists[0].dataValues.customers);
          for (let indexCustomer = 0; indexCustomer < idCustomer.length; indexCustomer++) {
            let appCustomerData = await db.appCustomer.findOne({ where: { id: idCustomer[indexCustomer].id }, include: [{ model: db.appLocation, attributes: ['latitude', 'longitude', 'contact', 'title'] }] });
            //console.log(product[productItem])
            console.log(appCustomerData)

            depositValue = 0;
            totalValue = 0;
            // let depositValue = 0;
            // let totalValue = 0;
            //for (let index = 0; index < dataCustomer.length; index++) {
            let appSaleData = await db.appSale.findAll({ where: { idCustomer: appCustomerData.id } });
            for (let indexSaleData = 0; indexSaleData < appSaleData.length; indexSaleData++) {
              depositValue = appSaleData[indexSaleData].deposit + depositValue;

              let products = [];
              products = JSON.parse(appSaleData[indexSaleData].products);

              for (let indexProduct = 0; indexProduct < products.length; indexProduct++) {
                let appProductData = await db.appProduct.findAll({ where: { id: products[indexProduct].id } });
                for (let indexProductPrices = 0; indexProductPrices < appProductData.length; indexProductPrices++) {
                  totalValue = (appProductData[indexProductPrices].price * products[indexProduct].cantidad) + totalValue;

                }

              }


            }
            //console.log(await totalValue);


            console.log(await totalValue);

            console.log(await depositValue);

            appCustomerData.due = appCustomerData.due  + (totalValue - depositValue);
            // totalValue = 0;
            // depositValue = 0;
            // console.log("hi")
            //}

            customer[customerItem] = appCustomerData;
            customerItem++;

          }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        dataGeneral[index].inventory = { products: {}, appCustomerData: [] };
        dataGeneral[index].inventory.products = product;
        dataGeneral[index].inventory.appCustomerData[0] = jsonProductData;
        dataGeneral[index].dataValues.appCustomerLists[0].dataValues.customers = customer;

        //}



      }

      //dataGeneral[dataIndex].inventory.dataCustomer = jsonProductData;

      //console.log(dataGeneral)

      //console.log(dataGeneral.appInventories)

      return await dataGeneral[dataIndex];
    }).catch(e => {
      console.log(e);
    });
}

module.exports = {
  getRoute
}