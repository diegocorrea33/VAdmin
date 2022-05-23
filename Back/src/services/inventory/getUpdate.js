import db from '../../database/models/index';;

const getUpdate = async (body) => {
  return await db.appInventory
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