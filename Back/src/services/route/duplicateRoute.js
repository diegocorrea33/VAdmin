import db from '../../database/models/index';

const duplicateRoute = async (body) => {
  console.log("INICIO EL DUPLICADO DE RUTAS");
  let dataRoute = await db.appRoute.findAll({ where: { duplicate: 1, state: 3 } })

  await dataRoute.forEach(async element => {
    let dataElement = await element.dataValues;
    let idRoute = await element.dataValues.id;
    await db.appRoute.update({ duplicate: 0 }, { where: { id: idRoute } })
    dataElement.id = undefined;
    dataElement.inventoryInitial = 0;
    dataElement.state = 0;
    dataElement.totalValue = 0;
    dataElement.totalDeposit = 0;
    dataElement.totalExtraExpense = 0;
    dataElement.profit = 0;
    dataElement.valueDeliver = 0;
    dataElement.createdAt = undefined;
    dataElement.updatedAt = undefined;
    dataElement.previousRoute = idRoute;
    //console.log(dataElement);
    // 
    let dataNewRoute = await db.appRoute.create(dataElement)
    let dataClientList = await db.appCustomerList.findOne({ where: { id: dataElement.idCustomers }})
    dataClientList.dataValues.id = dataNewRoute.id;
    let dataCustomerList = await db.appCustomerList.create(dataClientList.dataValues)
    let dataInventary = await db.appInventory.findOne({ where: { id: dataElement.inventory }})
    dataInventary.dataValues.id = undefined;
    let dataNewInventory = await db.appInventory.create(dataInventary.dataValues)

    await db.appRoute.update({ idCustomers: dataCustomerList.id, inventory: dataNewInventory.id }, { where: { id: dataNewRoute.id } })
 
  });

  console.log("TERMINADO EL DUPLICADO DE RUTAS");

  // let bodyCustomer = body.customer;
  // let bodyRoute = body.route;
  // return await db.appCustomerList
  //   .create(bodyCustomer)
  //   .then((data) => {
  //     bodyRoute.idCustomers = data.id
  //     return db.appRoute
  //       .create(bodyRoute)
  //       .then((dataRoute) => {
  //         return db.appCustomerList
  //           .update({id: dataRoute.id},
  //             {
  //               where: {
  //                 id: data.id,
  //               },
  //             }
  //           )
  //           .then((data) => {
  //             return dataRoute;
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

}

module.exports = {
  duplicateRoute
}