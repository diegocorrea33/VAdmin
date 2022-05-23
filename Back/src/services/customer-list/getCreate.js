import db from '../../database/models/index';


const getCreate = async (body) => {
  
  return await db.appCustomerList
    .create(body)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = {
  getCreate
}