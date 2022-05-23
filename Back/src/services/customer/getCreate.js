import db from '../../database/models/index';


const getCreate = async (body) => {

  const appUser = await db.appUser.findOne({ where: { id: body.idUser } });
  if (appUser) {
    return await db.appLocation.create({ title: body.locationTitle, longitude: body.longitude, latitude: body.latitude, contact: body.contact }).then(data => {
      body.idLocation = data.id
      return db.appCustomer
        .create(body)
        .then((dataCustomer) => {
          return {
            data: dataCustomer,
            message: "Created successfully",
            code: 201
          };
        })
        .catch((e) => {
          console.log(e);
          return {
            data: {
              name: e.name,
              error: e.parent?.message
            },
            message: "Error",
            code: 403
          };
        });

    }).catch(e => {
      return {
        data: {
          name: e.name,
          error: e.parent?.message
        },
        message: "Error",
        code: 403
      };
    })
  } else {
    return {
      data: null,
      message: "User not found",
      code: 403
    };
  }



}

module.exports = {
  getCreate
}