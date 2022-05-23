import db from '../../database/models/index';


const getCreate = async (body) => {
  let bodyCustomer = body.customer;
  let bodyRoute = body.route;
  return await db.appCustomerList
    .create(bodyCustomer)
    .then((data) => {
      bodyRoute.idCustomers = data.id
      return db.appRoute
        .create(bodyRoute)
        .then((dataRoute) => {
          return db.appCustomerList
            .update({id: dataRoute.id},
              {
                where: {
                  id: data.id,
                },
              }
            )
            .then((data) => {
              return dataRoute;
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });

}

module.exports = {
  getCreate
}