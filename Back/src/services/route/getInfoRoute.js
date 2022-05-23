import db from '../../database/models/index';

const getInfoRoute = async (body) => {

  return await db.appRoute.findOne({ where: { id: body.id }, include: [{ model: db.appCustomerList }] }).then(async dataRoute => {

    var deposit = 0;
    var totalValueProduct = 0;

    var dataInfoRoute = [];
    var customersIndex = 0;
    let customerList = [];
    // customerList = JSON.parse(dataRoute.idCustomers);
    // customerList.forEach(async element => {
      var dataSale = await db.appSale.findAll({ where: { idRoute: body.id }, include: [{ model: db.appCustomer, attributes: ['id', 'title', 'address'] }] })
      // .then(async (dataSale) => {
        console.log(dataSale);

      dataSale.forEach(async elementSale => {
        console.log(elementSale);

        var products = [];
        var productsIndex = 0;
        if (elementSale.status != 1) deposit += elementSale.deposit;

        if (IsJsonString(elementSale.products)) {

          JSON.parse(elementSale.products).forEach(async elementProduct => {

            var appProduct = await db.appProduct.findOne({ where: { id: elementProduct.id } });
            //console.log(dataProduct)

            // if (elementSale.status == 0) { 
            //   totalValueProduct += await appProduct.price * elementProduct.cantidad; 
            // }
            products[productsIndex] = {
              id: appProduct.id,
              quantity: elementProduct.cantidad,
              price: appProduct.price,
              total: appProduct.price * elementProduct.cantidad,
            }
            productsIndex++;



          })
        }

        dataInfoRoute[customersIndex] = {
          customer: elementSale.appCustomer,
          depositSale: elementSale.deposit,
          statusSale: elementSale.status,
          idSale: elementSale.id,
          products: products,
        }
        customersIndex++;
      })




      // }).catch((e) => {
      //   console.log(e);
      // })
    // });

    let extraExpense = 0;
    await db.appExtraExpense.findAll({ where: { idRoute: body.id } }).then(data => {
      data.forEach(element => {
        extraExpense += element.price;
      });
    }).catch(e => {
      console.log(e);
    })

    await new Promise(resolve => setTimeout(resolve, 1000));
    let abono = 0;
    let totalTotal = 0;
    dataInfoRoute.forEach(element => {
      element.products.forEach(elementProducts => {
        if (element.statusSale != 1)
          totalTotal += elementProducts.total;
      });
      if (element.statusSale == 2) abono += element.depositSale;

    });

    await db.appRoute
      .update({
        totalValue: totalTotal,
        totalDeposit: deposit,
        totalExtraExpense: extraExpense,
        profit: deposit * (100 - dataRoute / 100),
        valueDeliver: totalTotal - (deposit * (dataRoute / 100)),
      },
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
    return await {
      extraExpense: extraExpense,
      deposit: deposit,
      abono: abono,
      totalValueProduct: totalTotal,
      data: dataInfoRoute,
      routeInfo: {
        id: dataRoute.id,
        idCustomers: dataRoute.dataValues.appCustomerLists[0].dataValues.customers,
        inventory: dataRoute.inventory,
        idUser: dataRoute.idUser,
        date: dataRoute.date,
        state: dataRoute.state,
        percentaje: dataRoute.percentaje
      }
    };






    // var deposit = 0;
    // var totalValueProduct = 0;
    // var products = [];
    // var productsIndex = 0;
    // var data = [];
    // var customersIndex = 0;
    // let customerList = [];

    // customerList = JSON.parse(dataRoute.idCustomers);
    // customerList.forEach(element => {
    //   db.appSale.findAll({ where: { idRoute: dataRoute.id, idCustomer: element } })
    //     .then((dataSale) => {
    //       db.appCustomer.findOne({ where: { id: element } }).then((dataCustomer) => {
    //         dataSale.forEach(elementSale => {
    //           console.log(elementSale)
    //           deposit += elementSale.deposit;
    //           if (IsJsonString(elementSale.products)) {
    //             JSON.parse(elementSale.products).forEach(elementProduct => {
    //               console.log(elementProduct)

    //               //console.log(JSON.parse(elementSale.products).length)
    //               db.appProduct.findOne({ where: { id: elementProduct.id } }).then((dataProduct) => {
    //                 console.log(dataProduct)


    //                 totalValueProduct += dataProduct.price * elementProduct.cantidad;
    //                 products[productsIndex] = {
    //                   id: dataProduct.id,
    //                   quantity: elementProduct.cantidad,
    //                   price: dataProduct.price,
    //                   total: dataProduct.price * elementProduct.cantidad,
    //                 }
    //                 productsIndex++;
    //                 // dataProduct.forEach(elementProductDetail => {
    //                 //   totalValueProduct += elementProductDetail.price * elementProduct.cantidad;
    //                 //   products[productsIndex] = {
    //                 //     id: elementProductDetail.id,
    //                 //     quantity: elementProduct.cantidad,
    //                 //     price: elementProductDetail.price,
    //                 //     total: elementProductDetail.price * elementProduct.cantidad,
    //                 //   }
    //                 //   productsIndex++;
    //                 // })

    //               }).catch((e) => { console.log(e) })

    //             })
    //           }

    //           data[customersIndex] = {
    //             customer: dataCustomer,
    //             depositSale: elementSale.deposit,
    //             idSale: elementSale.id,
    //             products: products,
    //           }

    //           customersIndex++;
    //         })
    //       }).catch((e) => {
    //         console.log(e);
    //       })


    //     }).catch((e) => {
    //       console.log(e);
    //     })
    // });

    //await new Promise(resolve => setTimeout(resolve, 1000));


















  }).catch(e => { console.log(e) });
}

module.exports = {
  getInfoRoute
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}