import db from '../../database/models/index';;

const getReserve = async (body) => {

  let inventory = [];
  let inventoryIndex = 0;

  let inventoryBody = {};

  return await db.appProduct.findAll()
    .then(data => {
      for (let indexData = 0; indexData < data.length; indexData++) {
        for (let indexBody = 0; indexBody < body.products.length; indexBody++) {
          if (body.products[indexBody].id == data[indexData].id) {
            if (data[indexData].available >= body.products[indexBody].count) {
              inventory[inventoryIndex] = {
                id: body.products[indexBody].id,
                count: body.products[indexBody].count
              }
              inventoryIndex++

            } else {
              console.log("No se logró reservar el producto " + body.products[indexBody].id)
              return "No se logró reservar el producto " + body.products[indexBody].id
              
            }
          }

        }
      }

      for (let index = 0; index < inventory.length; index++) {
        db.appProduct.findOne({ where: { id: inventory[index].id } })
          .then(dataProduct => {
            db.appProduct.update({
              available: dataProduct.available -= inventory[index].count,
              assigned: dataProduct.assigned += inventory[index].count
            }, { where: { id: dataProduct.id } })
          }).catch(e => { console.log(e) })


      }

      inventoryBody.title = ""
      inventoryBody.products = JSON.stringify(inventory);

      console.log(inventory)

      db.appInventory
        .create(inventoryBody)
        .then((data) => {
          return data;
        })
        .catch((e) => {
          console.log(e);
        });
      //      return data;
    }).catch(e => {
      console.log(e);
    })


}

module.exports = {
  getReserve
}