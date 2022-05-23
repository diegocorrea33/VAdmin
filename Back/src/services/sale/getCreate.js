import db from '../../database/models/index';


// const getCreate = async (body) => {
//   let failedSales = [];

//   body.ventas.forEach(element => {
//     if (element.idCustomer) {
//       db.appCustomer.findOne({ id: element.idCustomer })
//         .then((data) => {
//           if (data.id == element.idCustomer) {
//             console.log(data)

//             const salesBody = {
//               date: body.date,
//               idUser: body.idUser,
//               idRoute: body.idRoute,
//               referenceSale: element.referenceSale,
//               idCustomer: element.idCustomer,
//               products: JSON.stringify(element.products),
//               deposit: element.deposit,
//               status: element.status
//             }

//             db.appSale
//               .create(salesBody)
//               .then((data) => {
//                 data;
//               })
//               .catch((e) => {
//                 console.log(e);
//               });
//           } else {

//             const salesBody = {
//               date: body.date,
//               idUser: body.idUser,
//               idRoute: body.idRoute,
//               referenceSale: element.referenceSale,
//               idCustomer: element.idCustomer,
//               products: JSON.stringify(element.products),
//               deposit: element.deposit,
//               status: element.status
//             }

//             db.appSale
//               .create(salesBody)
//               .then((data) => {
//                 data;
//               })
//               .catch((e) => {
//                 console.log(e);
//               });

//             failedSales.push(element)
//             console.log(failedSales)
//             console.log("No registra")
//           }
//         })
//         .catch((e) => {
//           console.log(e);
//         })

//     }
//   });

//   return {
//     data: failedSales,
//     code: 200,
//     message: "successful"
//   }

// }

const getCreate = async (body) => {
  let salesData = [];
  let salesDataIndex = 0;
  if (body) {
    await body.ventas.forEach(element => {
      const salesBody = {
        date: body.date,
        idUser: body.idUser,
        idRoute: body.idRoute,
        referenceSale: element.referenceSale,
        idCustomer: element.idCustomer,
        products: JSON.stringify(element.products),
        deposit: element.deposit,
        status: element.status || 0
      }
  
      db.appSale
        .create(salesBody)
        .then((data) => {
          data;
          salesData[salesDataIndex] = data;
          salesDataIndex++;
        })
        .catch((e) => {
          console.log(e);
        });
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      data: salesData,
      code: 200,
      message: "Se han creado ventas satisfactoriamente"
    }
  } else {
    return {
      code: 200,
      success: false,
      data: null
    }
  }
  
        
}

module.exports = {
  getCreate
}