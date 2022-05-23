//import fs from 'fs';
import db from '../../database/models/index';;

//import { mailerResetAsoc } from '../../services/mails/mailresetasoc';
//import { mailerResetWhite } from '../../services/mails/mailresetwhite';

const getReset = async (body, password, newPassword) => {

  var userpass = await db.appUser.update({
    password
  }, {
    where: {
      email: body.email,
      idMarketplace: body.idMarketplace
    }
  }).then(data => {
    return data;
  }).catch(e => {
    console.log(e);
  });


  var market = await  db.appUser.findOne({
    raw: true,
    where: {
      id: body.idMarketplace
    }
  }).then(data => { return data }).catch(e => {
    console.log(e);
  })

  let nameMarket = market.name
  if (market.typeMarketplace == "1") {
   // mailerResetAsoc(password, body.email, nameMarket, newPassword)
  } else {
    //mailerResetWhite(password, body.email, nameMarket, newPassword)
  }

  return userpass
}

module.exports = {
  getReset
}