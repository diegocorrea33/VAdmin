import db from '../../database/models/index';;

const getUpdate = async (body) => {
  if (body.state == "1") {
    let dataRoute = await db.appRoute.findOne({ where: { id: body.id } })
    if (dataRoute && dataRoute.dataValues.inventoryInitial == 0) {
      let dataInventory = await db.appInventory.findOne({ where: { id: dataRoute.inventory }})
      let dataInventoryInitial = await db.appInventoryInitial.create(dataInventory.dataValues)
      body.inventoryInitial = dataInventoryInitial.id
    }
  }
  return await db.appRoute
    .update(body,
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
  getUpdate
}