import db from '../../database/models/index';

const unique = async (body) => {

  return await db.appUser.findOne({
    where: {
      email: body.email
    }
  }).then(data => { return data }).catch(e => {
    console.log(e);
  });
}

module.exports = {
  unique
}